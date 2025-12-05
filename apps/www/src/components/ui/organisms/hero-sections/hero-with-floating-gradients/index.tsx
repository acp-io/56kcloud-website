import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { CTAProps } from "@/models/cta.model";
import { ImageProps } from "@/models/image.model";
import Button from "@/components/ui/atoms/button";
import ComponentLayout from "@/components/ui/atoms/component-layout";
import Link from "next/link";

export type HeroWithFloatingGradientsProps = {
	title: string;
	subtitle: string;
	image: ImageProps;
	cta: CTAProps;
};

export default function HeroWithFloatingGradients(
	props: HeroWithFloatingGradientsProps,
) {
	return (
		<ComponentLayout className="overflow-hidden">
			<div className="pb-8 pt-52 lg:pt-64 lg:pb-20">
				<h1 className="w-fit mx-auto text-center text-5xl leading-[1.1875] font-extrabold tracking-tight  bg-clip-text text-secondary-500 lg:text-7xl lg:leading-[1.2]">
					{props.title}
				</h1>
				<div className="text-lg font-light text-center mt-7 text-slate-400">
					<p>{props.subtitle}</p>
				</div>
				<div className="flex items-center justify-center mt-10">
					<Button
						asChild
						size="large"
						tone={props.cta.tone}
						shape="circle"
						className="text-slate-950 bg-slate-50/85 px-6 hover:bg-current hover:text-current"
						trailing={
							<ArrowRightIcon
								className="w-4 h-4 text-sky-500"
								strokeWidth={2}
							/>
						}
					>
						<Link href={props.cta.link} target="_blank">
							{props.cta.title}
						</Link>
					</Button>
				</div>
			</div>
		</ComponentLayout>
	);
}
