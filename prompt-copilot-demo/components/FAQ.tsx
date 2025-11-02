'use client';

import ExpandableSection from './ui/ExpandableSection';
import { demoContent } from '@/data/demo-content';

export default function FAQ() {
  return (
    <ExpandableSection title="FAQ">
      <div className="space-y-4">
        {demoContent.faq.map((item, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <h3 className="font-mono font-semibold mb-2">{item.question}</h3>
            <p className="text-gray-600 text-sm">{item.answer}</p>
          </div>
        ))}
      </div>
    </ExpandableSection>
  );
}

