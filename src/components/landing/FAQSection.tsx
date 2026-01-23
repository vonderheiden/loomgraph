import { CONTENT } from '../../constants/landingContent';
import { FAQItem } from './FAQItem';

/**
 * FAQSection Component
 * 
 * Displays frequently asked questions to address common concerns
 * and help visitors make informed decisions.
 * 
 * Features three key questions:
 * 1. Is this better than Canva?
 * 2. Can I use my own brand colors?
 * 3. What file types are supported?
 * 
 * Layout:
 * - Single column layout with spacing between items
 * - Each FAQ item has clear visual hierarchy (bold question, regular answer)
 * 
 * Requirements: 9.1, 9.2, 9.3, 9.4, 9.5
 */
export function FAQSection() {
  return (
    <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]" aria-labelledby="faq-title">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 id="faq-title" className="text-3xl sm:text-4xl font-bold text-gray-900">
            {CONTENT.faq.title}
          </h2>
        </div>
        
        {/* FAQ Items */}
        <div className="space-y-6">
          {CONTENT.faq.items.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
