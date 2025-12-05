"use client";

import { Dictionary } from "@/models/dictionary.model";
import { LocationObject } from "@/models/location.model";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/molecules/tabs";
import Calendar, { CalendarOptions } from "./calendar";
import ComponentLayout from "@/components/ui/atoms/component-layout";
import ContactGradient from "@/components/ui/svgs/gradients/contact-gradient";
import Message from "./message";

export type ContactProps = {
	dictionary: Dictionary;
	title: string;
	subtitle: string;
	locations: Array<LocationObject>;
	withMessage?: boolean;
	calendar?: CalendarOptions;
};

export default function Contact(props: ContactProps) {
	return (
		<ComponentLayout id="contact-section">
			<div className="py-20 pt-9 lg:pt-[104px] lg:pb-24">
				<div className="relative rounded-3xl overflow-hidden border border-slate-800 lg:rounded-[48px]">
					<div className="px-4 py-12 space-y-12 lg:space-y-0 lg:space-x-12 sm:px-6 lg:px-20 lg:py-16 flex flex-col lg:flex-row">
						<div className="space-y-4 max-w-4xl flex-1">
							<h2
								className="w-fit text-[44px] leading-[1.1875] font-extrabold tracking-tight  \
                bg-clip-text text-secondary-500 text-center lg:text-left mx-auto lg:mx-0"
							>
								{props.title}
							</h2>
							<p className="text-base leading-7 text-slate-400 font-light text-center lg:text-left">
								{props.subtitle}
							</p>
						</div>
						{props.withMessage && props.calendar ? (
							<Tabs
								defaultValue="message"
								className="lg:max-w-xl w-full overflow-hidden h-[777px]"
							>
								<TabsList className="w-full ">
									<TabsTrigger value="message">Message</TabsTrigger>
									<TabsTrigger value="calendar">Calendar</TabsTrigger>
								</TabsList>
								<TabsContent
									value="message"
									className="data-[state=active]:block hidden overflow-y-auto !flex-initial"
									forceMount
								>
									<Message />
								</TabsContent>
								<TabsContent
									value="calendar"
									forceMount
									className="data-[state=active]:block hidden !flex-initial"
								>
									<Calendar calendar={props.calendar} />
								</TabsContent>
							</Tabs>
						) : props.calendar ? (
							<Calendar
								className="lg:max-w-xl w-full overflow-hidden h-[700px]"
								calendar={props.calendar}
							/>
						) : props.withMessage ? (
							<Message className="lg:max-w-xl w-full overflow-y-auto h-[777px]" />
						) : null}
					</div>
				</div>
			</div>
		</ComponentLayout>
	);
}
