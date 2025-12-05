import { Benefit } from "@/models/benefit.model";
import { CTAProps } from "@/models/cta.model";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { ImageProps } from "@/models/image.model";
import Button from "@/components/ui/atoms/button";
import Image from "next/image";

export type JoinOurTeamProps = {
	title: string;
	subtitle: string;
	benefits: Benefit[];
	cta: CTAProps;
	image: ImageProps;
};

export default function JoinOurTeam(props: JoinOurTeamProps) {
	return (
		<div className="relative my-32 isolate sm:my-40">
			<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
				<div
					className="flex flex-col max-w-2xl gap-16 px-6 py-16 mx-auto bg-white/5 ring-1 ring-white/10 xl:px-20 \
                     sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20"
				>
					<Image
						className="flex-none object-cover w-full shadow-xl h-96 rounded-2xl lg:aspect-square lg:h-auto lg:max-w-sm"
						src={props.image.url}
						alt={props.image.alternateText || props.image.name}
						width={props.image.width}
						height={props.image.height}
					/>
					<div className="flex-auto w-full">
						<h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
							{props.title}
						</h2>
						<p className="mt-6 text-lg leading-8 text-gray-300">
							{props.subtitle}
						</p>
						<ul
							role="list"
							className="grid grid-cols-1 mt-10 text-base leading-7 text-white gap-x-8 gap-y-3 sm:grid-cols-2"
						>
							{props.benefits.map((benefit) => (
								<li key={benefit.name} className="flex gap-x-3">
									<CheckCircleIcon
										className="flex-none w-5 h-7"
										aria-hidden="true"
									/>
									{benefit.name}
								</li>
							))}
						</ul>
						<div className="flex mt-10">
							<Button asChild size="large" variant="link" tone={props.cta.tone}>
								<a href={props.cta.link} target="_blank">
									{props.cta.title} <span aria-hidden="true">&rarr;</span>
								</a>
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div
				className="absolute inset-x-0 flex justify-center overflow-hidden -top-16 -z-10 transform-gpu blur-3xl"
				aria-hidden="true"
			>
				<div
					className="aspect-[1318/752] w-[82.375rem] flex-none bg-primary-500 opacity-25"
					style={{
						clipPath:
							"polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% \
             49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
					}}
				/>
			</div>
		</div>
	);
}
