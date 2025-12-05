import { Value } from "@/models/value.model";
import { cn } from "@/utils/toolbox";
import ComponentLayout from "@/components/ui/atoms/component-layout";
import Image from "next/image";

export type ValueTwoColumnProps = {
	title: string;
	subtitle: string;
	values: Value[];
};

export default function ValueTwoColumn(props: ValueTwoColumnProps) {
	return (
		<ComponentLayout>
			<div className="pb-20 pt-9 lg:pb-[104px] lg:pt-[120px]">
				<div className="mx-auto text-center space-y-4 max-w-4xl">
					<h2
						className="w-fit text-[44px] leading-[1.1875] font-extrabold tracking-tight  bg-clip-text \
            text-secondary-500 lg:mx-auto"
					>
						{props.title}
					</h2>
					<p className="text-base leading-7 text-slate-400 font-light text-left lg:text-center">
						{props.subtitle}
					</p>
				</div>
				<div className="grid grid-cols-1 mt-10 gap-y-8 md:gap-8 md:grid-cols-12 md:grid-rows-2 w-full md:mt-20">
					{props.values.map((value, index) => (
						<div
							key={value.name}
							className={cn(
								"relative w-full col-span-1 md:col-span-6 lg:col-span-4",
								index === 3 ? "lg:col-start-3" : "",
								index === 4 ? "lg:col-start-7" : "",
							)}
						>
							<div className="absolute inset-0 flex flex-col items-center justify-center gap-y-2 px-4 z-10">
								<h3
									className="text-2xl leading-7 font-semibold text-center w-fit  bg-clip-text \
                  text-primary-500"
								>
									{value.name}
								</h3>
								<p className="text-center text-base leading-7 text-slate-50 font-light">
									{value.description}
								</p>
							</div>
							<div className="relative w-full">
								<Image
									className="w-full h-auto object-cover"
									src={value.background.url}
									width={value.background.width}
									height={value.background.height}
									alt={value.background.alternateText || value.background.name}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</ComponentLayout>
	);
}
