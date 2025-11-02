'use client';

import ExpandableSection from './ui/ExpandableSection';
import { demoContent } from '@/data/demo-content';

export default function Features() {
  return (
    <ExpandableSection title="Features">
      <div className="grid md:grid-cols-2 gap-6">
        {demoContent.features.map((feature, index) => (
          <div key={index} className="border border-gray-200 p-4 hover:border-black transition-colors">
            <h3 className="font-mono font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </ExpandableSection>
  );
}

