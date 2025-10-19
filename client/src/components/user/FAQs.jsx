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
    question: "How does HealthMate analyze my medical reports?",
    answer:
      "HealthMate uses Google's powerful Gemini AI model. You simply upload a PDF or image of your report, and Gemini reads it directly—no manual typing needed. It then generates an easy-to-understand summary in both English and Roman Urdu.",
  },
  {
    question: "Is my health data safe and private?",
    answer:
      "Yes, absolutely. We use JWT-based authentication, encrypt user data, and provide signed URLs for file access. Your health information is stored securely and privately. We also include a clear disclaimer that AI is for understanding only, not for medical advice.",
  },
  {
    question: "Can I track my health without lab reports?",
    answer:
      "Yes! HealthMate allows you to manually add vital signs like Blood Pressure, Sugar levels, Weight, and notes. This helps you maintain a complete health timeline even between formal lab tests.",
  },
  {
    question: "What kind of reports can HealthMate read?",
    answer:
      "HealthMate can read various medical documents, including lab reports, prescriptions, X-ray summaries, and ultrasound reports. As long as it's a clear PDF or image, Gemini can process it.",
  },
  {
    question: "Does HealthMate replace my doctor?",
    answer:
      "No. HealthMate is designed to help you understand your health information better, but it is not a substitute for professional medical advice. We always recommend consulting your doctor for diagnosis and treatment. The app even suggests questions to ask your doctor during your visit.",
  },
  {
    question: "Is the app available in Urdu?",
    answer:
      "Yes! HealthMate provides all AI-generated summaries and explanations in both English and Roman Urdu, making it accessible for users who are more comfortable reading Urdu in the Roman script.",
  },
];
const FAQs = () => {
  return (
    <div id="faq" className="w-full max-w-screen-xl mx-auto py-8 xs:py-16 px-6">
      <h2 className="text-center text-gray-800 text-3xl xs:text-4xl md:text-5xl !leading-[1.15] font-bold tracking-tighter">
        Frequently Asked Questions
      </h2>
      <p className="mt-1.5 text-center xs:text-lg text-muted-foreground">
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
