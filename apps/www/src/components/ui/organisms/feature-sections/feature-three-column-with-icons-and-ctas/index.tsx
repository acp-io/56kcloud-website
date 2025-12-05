import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { CTAProps } from "@/models/cta.model";
import { Feature } from "@/models/feature.model";
import Button from "@/components/ui/atoms/button";
import ComponentLayout from "@/components/ui/atoms/component-layout";
import Icon from "@/components/ui/atoms/icon";
import Link from "next/link";

export type FeatureThreeColumnWithIconsAndCTAsProps = {
	title: string;
	subtitle: string;
	features: Array<Feature<"icon">>;
	ctas: Array<CTAProps>;
};

export default function FeatureThreeColumnWithIconsAndCTAs(
	props: FeatureThreeColumnWithIconsAndCTAsProps,
) {
	return (
		<ComponentLayout gradientVariant="floatingGradient">
			<div className="pb-20 pt-9 lg:pb-[104px] lg:pt-[120px] space-y-10 lg:space-y-20">
				<div className="mx-auto text-center space-y-4 max-w-4xl">
					<h2 className="w-fit mx-auto text-[44px] leading-[48px] font-extrabold tracking-tight  bg-clip-text text-secondary-500 lg:leading-[58px]">
						{props.title}
					</h2>
					<p className="text-base leading-7 text-slate-400 font-light">
						{props.subtitle}
					</p>
				</div>
				<div className="mt-11">
					<div className="grid grid-cols-1 gap-12 lg:gap-6 lg:grid-cols-3">
						{props.features?.map((feature, index) => (
							<div key={index} className="flex flex-col lg:p-6 space-y-3">
								<div className="flex items-center gap-x-3">
									<div className="flex items-start h-full translate-y-[2px]">
										<Icon {...feature.icon} className="w-6 h-6 text-sky-500" />
									</div>
									<h3 className="text-xl w-fit font-semibold tracking-tight  bg-clip-text text-secondary-500">
										{feature.title}
									</h3>
								</div>
								<p className="text-base leading-7 font-light text-slate-400">
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</div>
				{props.ctas && props.ctas.length > 0 && (
					<div className="flex items-center justify-center !mt-12 gap-x-5">
						{props.ctas.map((cta, index) => (
							<Button
								key={index}
								asChild
								size="large"
								tone={cta.tone}
								shape="circle"
								className="text-slate-950 bg-slate-50/85 px-6 hover:bg-current hover:text-current"
								trailing={
									<ArrowRightIcon
										className="w-4 h-4 text-sky-500"
										strokeWidth={2}
									/>
								}
							>
								<Link href={cta.link}>{cta.title}</Link>
							</Button>
						))}
					</div>
				)}
			</div>
		</ComponentLayout>
	);
}
