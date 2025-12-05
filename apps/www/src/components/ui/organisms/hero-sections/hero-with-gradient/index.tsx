import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { CTAProps } from "@/models/cta.model";
import { cn } from "@/utils/toolbox";
import { replaceBrTagWithNewline } from "@/utils/toolbox";
import Button from "@/components/ui/atoms/button";
import ComponentLayout from "@/components/ui/atoms/component-layout";
import Link from "next/link";

export type HeroWithGradientProps = {
	surtitle?: string;
	title: string;
	subtitle: string;
	cta?: CTAProps;
};

export default function HeroWithGradient(props: HeroWithGradientProps) {
	const title = replaceBrTagWithNewline(props.title);
	const subtitle = replaceBrTagWithNewline(props.subtitle);

	const shouldOpenInNewTab = (href: string) => {
		return href.startsWith("http://") || href.startsWith("https://");
	};

	return (
		<ComponentLayout gradientVariant="heroGradient" className="bg-brand-600">
			<div className="pb-8 pt-52 lg:pb-20 lg:pt-60">
				<div className={cn(props.surtitle ? "space-y-8" : "")}>
					{props.surtitle && (
						<div className="flex justify-center w-full">
							<span className="text-base font-semibold  bg-clip-text text-white">
								{props.surtitle}
							</span>
						</div>
					)}
					<h2 className="w-fit max-w-5xl mx-auto text-center text-5xl leading-[1.1875] font-extrabold tracking-tight text-white lg:text-[58px]">
						{title}
					</h2>
				</div>
				<div className="max-w-3xl mx-auto text-lg font-light text-center mt-7 text-white">
					<p>{subtitle}</p>
				</div>
				{props.cta && (
					<div className="flex items-center justify-center mt-10">
						<Button
							asChild
							size="large"
							tone={props.cta.tone}
							shape="circle"
							className="text-brand-600 bg-white px-6 hover:bg-primary-100 hover:text-brand-600"
							trailing={
								<ArrowRightIcon
									className="w-4 h-4 text-brand-600"
									strokeWidth={2}
								/>
							}
						>
							<Link
								href={props.cta.link}
								target={
									shouldOpenInNewTab(props.cta.link) ? "_blank" : undefined
								}
								rel={
									shouldOpenInNewTab(props.cta.link)
										? "noopener noreferrer"
										: undefined
								}
							>
								{props.cta.title}
							</Link>
						</Button>
					</div>
				)}
			</div>
		</ComponentLayout>
	);
}
