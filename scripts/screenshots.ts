/**
 * Screenshot Generation Script
 *
 * This script takes screenshots of all pages in the webapp.
 *
 * Usage:
 *   1. Make sure the webapp is running (npm run dev:www)
 *   2. Set environment variables (STRAPI_API_URL, STRAPI_API_TOKEN) if you want dynamic pages
 *   3. Run: npm run screenshots
 *
 * Environment variables:
 *   - BASE_URL: Base URL of the webapp (default: http://localhost:3000)
 *   - STRAPI_API_URL: Strapi API URL (required for dynamic pages)
 *   - STRAPI_API_TOKEN: Strapi API token (optional, for authenticated requests)
 *
 * Screenshots are saved to the /screenshots directory.
 */

import { type Page, chromium } from "playwright";
import { config } from "dotenv";
import { existsSync } from "fs";
import { join, resolve } from "path";
import { locales } from "../apps/www/configs/shared";
import { mkdir } from "fs/promises";

// Load environment variables
config({ path: resolve(process.cwd(), "apps/www/.env.local") });
config({ path: resolve(process.cwd(), "apps/www/.env") });

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const SCREENSHOTS_DIR = join(process.cwd(), "screenshots");
const VIEWPORT_WIDTH = 1920;
const VIEWPORT_HEIGHT = 1080;

interface PageInfo {
	path: string;
	locale: string;
	name: string;
}

async function ensureDir(dir: string) {
	if (!existsSync(dir)) {
		await mkdir(dir, { recursive: true });
	}
}

interface CollectionItem {
	locale: string;
	slug: string;
}

async function takeScreenshot(
	page: Page,
	pageInfo: PageInfo,
	outputPath: string,
): Promise<void> {
	const url = `${BASE_URL}${pageInfo.path}`;
	console.log(`Screenshotting: ${url}`);

	try {
		await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });

		// Wait a bit for any animations or lazy loading
		await page.waitForTimeout(1000);

		// Scroll to bottom to trigger lazy loading
		await page.evaluate(() => {
			window.scrollTo(0, document.body.scrollHeight);
		});
		await page.waitForTimeout(500);

		// Scroll back to top
		await page.evaluate(() => {
			window.scrollTo(0, 0);
		});
		await page.waitForTimeout(500);

		await page.screenshot({
			path: outputPath,
			fullPage: true,
		});
		console.log(`✓ Saved: ${outputPath}`);
	} catch (error) {
		console.error(`✗ Failed to screenshot ${url}:`, error);
	}
}

async function getPages(): Promise<PageInfo[]> {
	const sitemapUrl = "http://localhost:3000/sitemap.xml";
	const res = await fetch(sitemapUrl);

	if (!res.ok) {
		throw new Error(`Failed to fetch sitemap: ${res.status} ${res.statusText}`);
	}

	const xml = await res.text();

	const locRegex = /<loc>(.*?)<\/loc>/g;
	const matches = xml.matchAll(locRegex);

	const pages: PageInfo[] = [];
	for (const match of matches) {
		const loc = match[1];
		const name =
			loc
				.replace(/^https?:\/\/[^/]+\//, "")
				.replace(/\/$/, "")
				.replace(/\//g, "_") || "home";
		const path = loc.replace(/^https?:\/\/[^/]+/, "");
		pages.push({
			name: name,
			path: path,
			locale: path.split("/")[1],
		});
	}

	return pages
		.filter((page) => page.locale === "en")
		.filter((page) => !page.path.startsWith("/en/blog/"));
}

async function main() {
	console.log("Starting screenshot generation...");
	console.log(`Base URL: ${BASE_URL}`);
	console.log(`Screenshots directory: ${SCREENSHOTS_DIR}`);

	// Ensure screenshots directory exists
	await ensureDir(SCREENSHOTS_DIR);

	// Get all pages
	console.log("\nDiscovering pages...");
	const pages = await getPages();

	console.log(`Found ${pages.length} pages to screenshot`);

	// Launch browser
	console.log("\nLaunching browser...");
	const browser = await chromium.launch({
		headless: true,
	});

	const page = await browser.newPage();
	await page.setViewportSize({
		width: VIEWPORT_WIDTH,
		height: VIEWPORT_HEIGHT,
	});

	// Take screenshots
	console.log("\nTaking screenshots...\n");
	for (const pageInfo of pages) {
		const filename = `${pageInfo.name}.png`;
		const outputPath = join(SCREENSHOTS_DIR, filename);
		await takeScreenshot(page, pageInfo, outputPath);
	}

	await browser.close();

	console.log(`\n✓ Screenshot generation complete!`);
	console.log(`  Screenshots saved to: ${SCREENSHOTS_DIR}`);
}

main().catch((error) => {
	console.error("Error:", error);
	process.exit(1);
});
