import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Feature } from "@/models/feature.model";
import { cn } from "@/lib/utils";
import CardWithIcon from "@/components/ui/molecules/cards/with-icon";
import ComponentLayout from "@/components/ui/atoms/component-layout";

export type Tier = {
	surtitle: string;
	title: string;
	description?: string;
	items?: { text: string }[];
	featured?: boolean;
};

export type PricingThreeColumnProps = {
	title: string;
	subtitle: string;
	tiers: Array<Tier>;
	benefits: Array<Feature<"icon">>;
};

export default function PricingThreeColumn(props: PricingThreeColumnProps) {
	return (
		<ComponentLayout gradientVariant="floatingGradient" id="pricing-section">
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
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
						{props.tiers.map((tier, index) => (
							<div
								key={index}
								className={cn(
									tier.featured === true
										? "border-sky-500"
										: "border-slate-800",
									"bg-slate-900 border rounded-3xl p-8 ring-1 ring-slate-800 lg:p-10",
								)}
							>
								<span className="w-fit text-base font-semibold  bg-clip-text text-primary-500">
									{tier.surtitle}
								</span>
								<div className="mt-4 flex items-baseline gap-x-2">
									<h3 className="w-fit text-4xl leading-[42px] font-extrabold  tracking-tight bg-clip-text text-secondary-500">
										{tier.title}
									</h3>
								</div>
								<p className="mt-6 text-base text-slate-400 font-light">
									{tier.description}
								</p>
								<ul
									role="list"
									className="mt-8 space-y-3 text-sm text-slate-400 font-light sm:mt-10"
								>
									{tier.items?.map((item, index) => (
										<li key={index} className="flex gap-x-3">
											<CheckCircleIcon
												aria-hidden="true"
												className="h-6 w-5 flex-none text-sky-500"
											/>
											{item.text}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
					<div className="mt-11 space-y-8 lg:mt-20 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
						{props.benefits.map((feature, index) => (
							<CardWithIcon key={index} {...feature} />
						))}
					</div>
				</div>
			</div>
		</ComponentLayout>
	);
}
