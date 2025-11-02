'use client';

import ExpandableSection from './ui/ExpandableSection';

export default function DemoVideo() {
  return (
    <ExpandableSection title="Demo Video" defaultExpanded={false}>
      <div className="space-y-4">
        <p className="text-gray-700">
          Watch the extension in action with real-world use cases.
        </p>
        <div className="border border-gray-200 p-4">
          <video
            controls
            className="w-full max-w-4xl mx-auto"
            poster=""
          >
            <source src="/demo.mov" type="video/quicktime" />
            <source src="/demo.mov" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="text-sm text-gray-600">
          <p>This video demonstrates:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Installing the extension</li>
            <li>Configuring your API key</li>
            <li>Using prompt refinement on various websites</li>
            <li>Applying multiple improvements</li>
            <li>Real-world use cases</li>
          </ul>
        </div>
      </div>
    </ExpandableSection>
  );
}

