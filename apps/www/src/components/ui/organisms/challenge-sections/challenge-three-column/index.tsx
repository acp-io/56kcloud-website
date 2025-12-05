"use client";

import { CTAProps } from "@/models/cta.model";
import { Dictionary } from "@/models/dictionary.model";
import { TrendingDown, TrendingUp } from "lucide-react";
import ComponentLayout from "@/components/ui/atoms/component-layout";

type ChallengeItem = {
	title: string;
	description: string;
	stat: string;
	solution: {
		title: string;
		description: string;
		stat: string;
	};
};

export type ChallengeThreeColumnProps = {
	dictionary: Dictionary;
	title: string;
	subtitle: string;
	challenges: ChallengeItem[];
	cta: CTAProps;
	cards: ChallengeItem[];
};

export default function ChallengeThreeColumn(props: ChallengeThreeColumnProps) {
	return (
		<ComponentLayout gradientVariant="floatingGradient">
			<div className="pb-20 pt-9 lg:pb-[104px] lg:pt-[120px] space-y-11 lg:space-y-20">
				<div className="mx-auto text-center space-y-4 max-w-4xl">
					<h2 className="w-fit mx-auto text-[44px] leading-[48px] font-extrabold tracking-tight  bg-clip-text text-secondary-500 lg:leading-[58px]">
						{props.title}
					</h2>
					<p className="text-base leading-7 text-slate-400 font-light">
						{props.subtitle}
					</p>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-20 lg:gap-28 mb-16">
					{props.challenges.map((challenge, index) => (
						<div key={index} className="lg:px-0 lg:py-0 relative">
							{index < props.challenges.length - 1 && (
								<>
									<div
										className="hidden lg:block absolute top-0 -right-14 w-0.5 h-full"
										style={{
											background:
												"linear-gradient(to bottom, rgba(51, 65, 85, 0) 0%, rgba(51, 65, 85, 1) 25%, rgba(51, 65, 85, 1) 75%, rgba(51, 65, 85, 0) 100%)",
										}}
									/>
									<div
										className="lg:hidden absolute -bottom-10 left-0 right-0 h-0.5"
										style={{
											background:
												"linear-gradient(to right, rgba(51, 65, 85, 0) 0%, rgba(51, 65, 85, 1) 25%, rgba(51, 65, 85, 1) 75%, rgba(51, 65, 85, 0) 100%)",
										}}
									/>
								</>
							)}
							<h3 className="text-2xl leading-7 font-semibold w-fit  bg-clip-text text-primary-500">
								{challenge.title}
							</h3>
							<div className="flex flex-col space-y-6 mt-4">
								<p className="text-base leading-7 font-light text-slate-400">
									{challenge.description}
								</p>
								<div className="flex flex-row space-x-4">
									<TrendingDown
										className="flex-none text-sky-500 w-5 h-5 translate-y-1"
										strokeWidth={2}
									/>
									<span className="text-base leading-7 font-light text-sky-500">
										{challenge.stat}
									</span>
								</div>
							</div>
							<div className="flex flex-col space-y-2 mt-8">
								<h4 className="text-xl w-fit font-semibold tracking-tight  bg-clip-text text-secondary-500">
									{challenge.solution.title}
								</h4>
								<div className="flex flex-col space-y-4">
									<p className="text-base leading-7 font-light text-slate-400">
										{challenge.solution.description}
									</p>
									<div className="flex flex-row space-x-4">
										<TrendingUp
											className="flex-none text-sky-500 w-5 h-5 translate-y-1"
											strokeWidth={2}
										/>
										<span className="text-base leading-7 font-light text-sky-500">
											{challenge.solution.stat}
										</span>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</ComponentLayout>
	);
}
