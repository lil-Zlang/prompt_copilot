'use client';

import ExpandableSection from './ui/ExpandableSection';
import { demoContent } from '@/data/demo-content';

export default function Examples() {
  return (
    <ExpandableSection title="Examples">
      <div className="space-y-6">
        {demoContent.examples.map((example, index) => (
          <div key={index} className="border border-gray-200 p-4">
            <div className="mb-2">
              <span className="text-xs font-mono text-gray-600 bg-gray-100 px-2 py-1">
                {example.improvement}
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-mono text-gray-600 mb-2">Original</h4>
                <div className="p-3 bg-gray-50 border border-gray-200 font-mono text-sm">
                  {example.original}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-mono text-gray-600 mb-2">Refined</h4>
                <div className="p-3 bg-gray-50 border border-gray-200 font-mono text-sm whitespace-pre-wrap">
                  {example.refined}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ExpandableSection>
  );
}

