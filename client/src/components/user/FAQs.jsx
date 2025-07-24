import { PlusIcon } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const faq = [
  {
    question: "How can I donate to Saylani Welfare?",
    answer:
      "You can donate online through our official website using various payment methods, or visit any Saylani branch near you.",
  },
  {
    question: "What services does Saylani provide?",
    answer:
      "Saylani offers free food distribution, medical care, education programs, vocational training, and emergency relief services across Pakistan and abroad.",
  },
  {
    question: "Can I volunteer with Saylani?",
    answer:
      "Yes, we welcome volunteers! Please fill out the volunteer form on our website or visit your nearest Saylani center to get started.",
  },
  {
    question:
      "How can I enroll in Saylani's IT or vocational training programs?",
    answer:
      "You can apply through the official Saylani Mass IT Training Program website or visit our training center for enrollment details.",
  },
  {
    question: "Where does Saylani operate?",
    answer:
      "Saylani operates throughout Pakistan and in several international regions. Our services are expanding continuously to reach more people in need.",
  },
  {
    question: "How can I contact Saylani Welfare?",
    answer:
      "You can contact us through the contact form on our website, call our helpline, or visit any of our branches. We’re here to assist you.",
  },
];

const FAQs = () => {
  return (
    <div id="faq" className="w-full max-w-screen-xl mx-auto py-8 xs:py-16 px-6">
      <h2 className="md:text-center text-gray-800 text-3xl xs:text-4xl md:text-5xl !leading-[1.15] font-bold tracking-tighter">
        Frequently Asked Questions
      </h2>
      <p className="mt-1.5 md:text-center xs:text-lg text-muted-foreground">
        Quick answers to common questions about our products and services.
      </p>

      <div className="min-h-[550px] md:min-h-[320px] xl:min-h-[300px]">
        <Accordion
          type="single"
          collapsible
          className="mt-8 space-y-4 md:columns-2 gap-4"
        >
          {faq.map(({ question, answer }, index) => (
            <AccordionItem
              key={question}
              value={`question-${index}`}
              className="bg-accent py-1 px-4 rounded-xl border-none !mt-0 !mb-4 break-inside-avoid"
            >
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger
                  className={cn(
                    "flex flex-1 items-center justify-between py-4 font-semibold tracking-tight transition-all hover:underline [&[data-state=open]>svg]:rotate-45",
                    "text-start text-lg"
                  )}
                >
                  {question}
                  <PlusIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="text-[15px]">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQs;
