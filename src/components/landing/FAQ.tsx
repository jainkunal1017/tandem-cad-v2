
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does Tandem capture my CAD work?",
    answer: "Tandem adds a lightweight \"Watch Layer\" inside your CAD session. It listens for sketches, mates, feature edits, parameters, and file actions, then streams that data to our cloud. No macros to click, no exports to manage design normally, Tandem logs everything in the background."
  },
  {
    question: "How does Tandem integrate with my existing CAD software?",
    answer: "Tandem integrates with popular CAD software through lightweight plugins that run in the background to capture design decisions without disrupting your workflow."
  },
  {
    question: "Is my design data secure in Tandem?",
    answer: "Yes, Tandem uses enterprise-grade security with end-to-end encryption and role-based access controls to ensure your design data remains secure and confidential."
  },
  {
    question: "Do I need to change my design process to use Tandem?",
    answer: "No, Tandem is designed to adapt to your existing workflow rather than forcing you to change it. It works silently in the background to capture your design intent."
  },
  {
    question: "How does Tandem help with regulatory compliance?",
    answer: "Tandem automatically generates audit trails and design history files that meet regulatory requirements, making preparation for audits and submissions significantly faster."
  },
  {
    question: "Can suppliers access our Tandem data without a CAD license?",
    answer: "Yes, you can share read-only, human-readable design intent summaries with suppliers and collaborators without requiring them to have CAD licenses or specialized software."
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
        <p className="text-xl text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
          Everything you need to know about Tandem.
        </p>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-medium text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
