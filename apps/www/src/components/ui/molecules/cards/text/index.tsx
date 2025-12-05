import { CardProps } from "@/models/card.model";

export default function TextCard({ title, description }: CardProps) {
	return (
		<div className="space-y-2">
			<div className="flex flex-row items-center gap-x-3">
				<h3 className="text-2xl leading-7 font-semibold w-fit  bg-clip-text text-primary-500">
					{title}
				</h3>
			</div>
			<p className="text-base leading-[26px] text-slate-400 font-light">
				{description}
			</p>
		</div>
	);
}
