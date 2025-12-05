export type HeroSimpleCenterProps = {
	title: string;
	subtitle: string;
};

export default function HeroSimpleCenter(props: HeroSimpleCenterProps) {
	return (
		<div className="overflow-hidden pt-14">
			<div
				className="absolute inset-x-0 flex justify-center overflow-hidden top-4 -z-10 transform-gpu blur-3xl"
				aria-hidden="true"
			>
				<div
					className="aspect-[1108/632] w-[69.25rem] flex-none bg-primary-500 opacity-25"
					style={{
						clipPath:
							"polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% \
                 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% \
                 51.7%)",
					}}
				/>
			</div>
			<div className="px-6 pt-14 lg:px-8">
				<div className="max-w-2xl pt-24 mx-auto text-center sm:pt-40">
					<h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
						{props.title}
					</h2>
					<p className="mt-6 text-lg leading-8 text-gray-300">
						{props.subtitle}
					</p>
				</div>
			</div>
		</div>
	);
}
