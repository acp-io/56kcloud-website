import { Feature } from "@/models/feature.model";
import { cn } from "@/utils/toolbox";
import Icon from "@/components/ui/atoms/icon";

export type FeatureThreeColumnWithLargeIconsProps = {
	title: string;
	subtitle: string;
	titleAlignment?: "left" | "center";
	features: Array<Feature<"icon">>;
};

export default function FeatureThreeColumnWithLargeIcons({
	title,
	subtitle,
	features,
	titleAlignment = "center",
}: FeatureThreeColumnWithLargeIconsProps) {
	return (
		<div className="py-20 lg:py-[104px]">
			<div className="px-6 mx-auto max-w-7xl lg:px-8">
				<div
					className={cn(
						titleAlignment === "center" ? "justify-center" : "justify-start",
						"flex w-full",
					)}
				>
					<div
						className={cn(
							titleAlignment === "center" ? "text-center" : "text-left",
							"max-w-2xl mr-auto lg:max-w-3xl lg:mx-0",
						)}
					>
						<h2
							className="w-fit mx-auto text-center text-3xl sm:text-4xl leading-[1.1875] font-extrabold tracking-tight  bg-clip-text
              text-secondary-500"
						>
							{title}
						</h2>
						<p className="mt-8 text-[20px] leading-8 text-slate-400 font-light">
							{subtitle}
						</p>
					</div>
				</div>
				<div className="mt-11">
					<div className="grid grid-cols-1 gap-x-6 gap-y-6 lg:grid-cols-3">
						{features?.map((feature, index) => (
							<div
								key={index}
								className="flex flex-col p-6 border border-slate-800 rounded-xl"
							>
								<a href={feature.link}>
									<div className="text-lg font-normal text-white">
										<div className="flex items-center justify-center w-8 h-8 mb-6 rounded-lg">
											<Icon
												{...feature.icon}
												className="w-auto h-8 fill-sky-300"
											/>
										</div>
										{feature.title}
									</div>
									<div className="flex flex-col flex-auto mt-1 text-base font-light leading-[26px] text-slate-400">
										<p className="flex-auto">{feature.description}</p>
									</div>
								</a>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
