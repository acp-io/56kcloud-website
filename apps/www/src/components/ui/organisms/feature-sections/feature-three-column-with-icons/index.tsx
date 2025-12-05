import { Feature } from "@/models/feature.model";
import { replaceBrTagWithNewline } from "@/utils/toolbox";
import ComponentLayout from "@/components/ui/atoms/component-layout";
import Icon from "@/components/ui/atoms/icon";

export type FeatureThreeColumnWithIconsProps = {
	title: string;
	subtitle?: string;
	features: Array<Feature<"icon">>;
};

export default function FeatureThreeColumnWithIcons(
	props: FeatureThreeColumnWithIconsProps,
) {
	const title = replaceBrTagWithNewline(props.title);
	const subtitle = props.subtitle
		? replaceBrTagWithNewline(props.subtitle)
		: "";

	return (
		<ComponentLayout
			gradientVariant="floatingGradient"
			className="bg-primary-600"
		>
			<div className="pb-20 pt-9 lg:pb-[104px] lg:pt-[120px] space-y-10 lg:space-y-20">
				<div className="mx-auto text-center space-y-4 max-w-4xl">
					<h2 className="w-fit mx-auto text-[44px] leading-[48px] font-extrabold tracking-tight text-white lg:leading-[58px]">
						{title}
					</h2>
					<p className="text-base leading-7 text-white font-light">
						{subtitle}
					</p>
				</div>
				<div className="mt-11">
					<div className="grid grid-cols-1 gap-12 lg:gap-6 lg:grid-cols-3">
						{props.features?.map((feature, index) => (
							<div
								key={index}
								className="relative w-full h-full flex flex-col pt-12 p-6 border border-primary-400 rounded-3xl bg-white sm:pt-12 sm:p-8"
							>
								<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
									<div className="w-14 h-14 rounded-full border-gradient bg-slate-800 flex items-center justify-center">
										<Icon
											{...feature.icon}
											strokeWidth={1.25}
											className="w-7 h-7 text-slate-500"
										/>
									</div>
								</div>
								<div className="space-y-4 text-center">
									<h3 className="text-2xl leading-7 font-semibold text-primary-600">
										{feature.title}
									</h3>
									<p className="text-sm leading-6 text-primary-400 font-light">
										{feature.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</ComponentLayout>
	);
}
