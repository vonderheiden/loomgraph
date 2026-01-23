import { FAQItem as FAQItemType } from '../../types/landing.types';

/**
 * FAQItem Component
 * 
 * Displays a single FAQ question-answer pair with clear visual hierarchy.
 * 
 * Visual Hierarchy:
 * - Question: Larger font (text-lg), bold weight, dark gray color
 * - Answer: Normal font (text-base), regular weight, medium gray color
 * 
 * The visual distinction helps users quickly scan questions and find
 * the information they need.
 * 
 * Accessibility:
 * - Uses semantic article element for content grouping
 * - Question is marked as heading (h3) for proper document outline
 * 
 * @param question - The FAQ question text
 * @param answer - The FAQ answer text
 * 
 * Requirements: 9.6
 */
export function FAQItem({ question, answer }: FAQItemType) {
  return (
    <article className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      {/* Question - Prominent styling */}
      <h3 className="text-lg font-bold text-gray-900 mb-3">
        {question}
      </h3>
      
      {/* Answer - Subdued styling */}
      <p className="text-base text-gray-600 leading-relaxed">
        {answer}
      </p>
    </article>
  );
}
