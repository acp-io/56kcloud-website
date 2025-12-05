import { ImageProps } from "@/models/image.model";
import ComponentLayout from "@/components/ui/atoms/component-layout";
import Image from "next/image";

export type FeatureWithLargeImageProps = {
	title: string;
	description: string;
	image: ImageProps;
};

export default function FeatureWithLargeImage(
	props: FeatureWithLargeImageProps,
) {
	return (
		<ComponentLayout gradientVariant="floatingGradient">
			<div className="py-20 lg:pb-[104px] lg:pt-[120px] space-y-11 lg:space-y-20">
				<div className="mx-auto space-y-4 max-w-4xl">
					<h2 className="w-fit text-[44px] leading-[1.1875] font-extrabold text-left lg:text-center tracking-tight  bg-clip-text text-secondary-500 lg:mx-auto">
						{props.title}
					</h2>
					<p className="text-base leading-7 text-slate-400 font-light text-left lg:text-center">
						{props.description}
					</p>
				</div>
				<div className="flex justify-center">
					<Image
						className="object-contain w-auto h-auto"
						src={props.image.url}
						width={props.image.width}
						height={props.image.height}
						alt={props.image.alternateText || props.image.name}
					/>
				</div>
			</div>
		</ComponentLayout>
	);
}
