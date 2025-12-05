import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { CaseStudy } from "@/models/case-study.model";
import { cn } from "@/utils/toolbox";
import ComponentLayout from "@/components/ui/atoms/component-layout";
import Image from "next/image";
import Link from "next/link";

export type CaseStudiesThreeColumnWithImageProps = {
	title: string;
	subtitle: string;
	caseStudies: Array<CaseStudy>;
};

export default function CaseStudiesThreeColumnWithImage(
	props: CaseStudiesThreeColumnWithImageProps,
) {
	return (
		<ComponentLayout gradientVariant="floatingGradient">
			<div className="pb-20 pt-9 lg:pb-[104px] lg:pt-[120px] space-y-10 lg:space-y-20">
				<div className="mx-auto space-y-4 max-w-4xl">
					<h2 className="w-fit text-[44px] leading-[1.1875] font-extrabold text-left lg:text-center tracking-tight  bg-clip-text text-secondary-500 lg:mx-auto">
						{props.title}
					</h2>
					<p className="text-base leading-7 text-slate-400 font-light text-left lg:text-center">
						{props.subtitle}
					</p>
				</div>
				<div className="mt-11">
					<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
						{props.caseStudies?.map((caseStudy, index) => (
							<Link key={index} href={`/case-studies/${caseStudy.slug}`}>
								<div
									className={cn(
										"border border-slate-800 rounded-3xl w-full h-full flex flex-col items-start gap-x-10 gap-y-6 sm:gap-y-8 p-6 sm:p-8 bg-slate-900",
									)}
								>
									<div className="w-full">
										<Image
											className="object-cover w-full h-60 rounded-xl"
											src={caseStudy.image.url}
											width={caseStudy.image.width}
											height={caseStudy.image.height}
											alt={
												caseStudy.image.alternateText || caseStudy.image.name
											}
										/>
									</div>
									<div className="flex flex-col justify-between w-full h-full">
										<div className="space-y-4">
											<h3 className="text-lg leading-6 font-semibold w-fit  bg-clip-text text-primary-500 \ line-clamp-2">
												{caseStudy.title}
											</h3>
											<p className="text-sm leading-6 text-slate-400 font-light">
												{caseStudy.description}
											</p>
										</div>
										<div className="flex flex-row items-center gap-2 mt-4 ml-auto">
											<p className="text-sm font-normal text-slate-50">
												{caseStudy.cta}
											</p>
											<ArrowRightIcon
												className="w-4 h-4 text-sky-500"
												strokeWidth={2}
											/>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</ComponentLayout>
	);
}
