import { cn } from "@/utils/toolbox";
import React from "react";

export type ComponentLayoutProps = {
	children: React.ReactNode;
	className?: string;
	childrenClassName?: string;
	gradientVariant?: "heroGradient" | "floatingGradient";
	id?: string;
};

export default function ComponentLayout(props: ComponentLayoutProps) {
	return (
		<div
			className={cn("flex justify-center w-full relative", props.className)}
			id={props.id}
		>
			<div
				className={cn("max-w-7xl mx-auto w-full px-6", props.childrenClassName)}
			>
				{props.children}
			</div>
		</div>
	);
}
