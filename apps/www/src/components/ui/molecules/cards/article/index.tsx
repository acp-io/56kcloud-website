import { Article } from "@/models/article.model";
import { Suspense } from "react";
import { cn, formatDate } from "@/utils/toolbox";
import { motion } from "framer-motion";
import ArticleCover from "../cover";
import Avatar from "@/components/ui/atoms/avatar";
import Link from "next/link";
import TagList from "../../tag-list";

export type ArticleCardProps = {
	article: Article;
	className?: string;
	fixedHeight?: boolean;
};

export default function ArticleCard({
	article,
	fixedHeight,
}: ArticleCardProps) {
	const publishedOn = formatDate(article.publishedOn);
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
			className={cn(fixedHeight ? "flex-1" : "")}
		>
			<Link
				href={`/blog/${article.slug}`}
				className={cn(
					"relative flex flex-col overflow-hidden cursor-pointer border border-slate-800 rounded-3xl w-full h-full \
          gap-x-10 gap-y-6 p-6 sm:p-8",
					fixedHeight ? "h-[576px]" : "",
				)}
			>
				<ArticleCover image={article.image} fixedHeight={fixedHeight} />
				<div className="flex flex-col flex-1">
					<div className="flex items-center space-x-4">
						<div className="flex flex-1 h-10 overflow-x-auto">
							<Suspense>
								<TagList tags={article.tags} />
							</Suspense>
						</div>
					</div>
					<div className="mt-5 space-y-3">
						<h3
							className="text-lg leading-6 font-semibold w-fit  bg-clip-text text-primary-500 \
              line-clamp-2"
						>
							{article.title}
						</h3>
						<p
							className={cn(
								"text-sm font-light leading-6 text-slate-400 line-clamp-4",
								fixedHeight && "h-24",
							)}
						>
							{article.description}
						</p>
					</div>
					<div className="flex flex-wrap items-center mt-8 text-sm gap-x-3 text-slate-400">
						<Avatar image={article.author.avatar} size="md" />
						<div className="flex flex-col text-base">
							<span className="text-sm leading-6 font-medium text-slate-50">
								{article.author.name}
							</span>
							<div className="text-sm leading-6 flex font-light gap-x-2">
								<span>
									{publishedOn} – {article.readTime} minute
									{article.readTime > 1 ? "s" : ""} read
								</span>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</motion.div>
	);
}
