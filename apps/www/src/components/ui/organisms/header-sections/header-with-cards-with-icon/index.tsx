import { CardWithIconProps } from "@/models/card.model";
import CardWithIcon from "@/components/ui/molecules/cards/with-icon";

export type HeaderWithCardsWithIconProps = {
	title: string;
	subtitle: string;
	cards: Array<CardWithIconProps>;
};

export default function HeaderWithCardsWithIcon(
	props: HeaderWithCardsWithIconProps,
) {
	return (
		<div className="relative py-24 overflow-hidden isolate sm:py-32">
			<div className="px-6 pt-20 mx-auto lg:pt-52 max-w-7xl">
				<div className="flex flex-col justify-between lg:flex-row gap-x-16">
					<div className="w-full lg:w-2/6">
						<h2
							className="w-fit text-[44px] leading-[52px] font-extrabold tracking-tight  \
              bg-clip-text text-secondary-500"
						>
							{props.title}
						</h2>
					</div>
					<div className="w-full mt-10 lg:mt-0 lg:pl-8 lg:border-l lg:w-4/6 lg:border-slate-800">
						<p className="text-lg font-light text-slate-400">
							{props.subtitle}
						</p>
						<div className="flex flex-col mt-20 gap-y-10">
							{props.cards.map((card) => (
								<CardWithIcon key={card.title} {...card} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
