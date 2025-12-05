import { CardWithIconProps } from "@/models/card.model";
import Icon from "@/components/ui/atoms/icon";

export default function CardWithIcon({
	title,
	icon,
	description,
}: CardWithIconProps) {
	return (
		<div className="flex flex-row items-start gap-x-5">
			<div className="flex items-start h-full translate-y-[6px]">
				<Icon
					{...icon}
					className="flex-none text-sky-500 w-7 h-7"
					aria-hidden="true"
				/>
			</div>
			<div className="flex flex-col h-full justify-start space-y-[2px]">
				<h3 className="font-medium text-[18px] leading-10 w-fit  bg-clip-text text-primary-500">
					{title}
				</h3>
				<p className="text-base font-light leading-7 text-slate-400">
					{description}
				</p>
			</div>
		</div>
	);
}
