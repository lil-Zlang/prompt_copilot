'use client';

import ExpandableSection from './ui/ExpandableSection';
import { demoContent } from '@/data/demo-content';

export default function ExtensionDownload() {
  const { extensionDownload } = demoContent;

  return (
    <ExpandableSection title="Install Extension for Production Use" defaultExpanded={false}>
      <div className="space-y-6">
        <div className="border border-gray-200 p-6 bg-gray-50">
          <h3 className="font-mono font-semibold mb-2">{extensionDownload.title}</h3>
          <p className="text-gray-700 mb-4">{extensionDownload.description}</p>
          
          <div className="flex flex-wrap gap-3 mb-6">
            <a
              href="https://github.com/lil-Zlang/prompt_copilot/raw/master/prompt-copilot-distribution/prompt-copilot.zip"
              download="prompt-copilot.zip"
              className="px-6 py-3 bg-black text-white font-mono hover:bg-gray-800 transition-colors border border-black inline-block"
            >
              Download Extension (ZIP)
            </a>
            <a
              href={extensionDownload.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-black font-mono hover:bg-gray-50 transition-colors border border-black inline-block"
            >
              View on GitHub
            </a>
            <a
              href={extensionDownload.guideLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-black font-mono hover:bg-gray-50 transition-colors border border-black inline-block"
            >
              Developer Guide
            </a>
          </div>
          
          <div className="text-sm text-gray-600 mb-4">
            <strong>Note:</strong> The extension zip file is also available in the repository at <code className="bg-gray-200 px-1">prompt-copilot.zip</code> or <code className="bg-gray-200 px-1">prompt-copilot-distribution/prompt-copilot.zip</code>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-mono font-semibold">Installation Steps:</h4>
          {extensionDownload.steps.map((item) => (
            <div key={item.step} className="border-l-4 border-black pl-4 py-2">
              <div className="flex items-start gap-3">
                <span className="font-mono font-bold text-lg bg-black text-white w-8 h-8 flex items-center justify-center flex-shrink-0">
                  {item.step}
                </span>
                <div className="flex-1">
                  <h5 className="font-mono font-semibold mb-1">{item.title}</h5>
                  <p className="text-gray-700 text-sm mb-1">{item.description}</p>
                  <p className="text-gray-600 text-xs">{item.details}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-gray-200 p-4 bg-blue-50">
          <h4 className="font-mono font-semibold mb-2">Why Install the Extension?</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>Use your own API key (BYOK - Bring Your Own Key)</li>
            <li>Work on any website you visit</li>
            <li>No need to visit this demo site</li>
            <li>Complete privacy - your API key stays local</li>
            <li>Full control over your usage and costs</li>
          </ul>
        </div>

        <div className="border border-gray-200 p-4">
          <h4 className="font-mono font-semibold mb-2">Quick Reference</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong className="font-mono">Keyboard Shortcut:</strong>
              <p className="text-gray-600">Cmd+Shift+L (Mac) or Ctrl+Shift+L (Windows)</p>
            </div>
            <div>
              <strong className="font-mono">Extension Icon:</strong>
              <p className="text-gray-600">Prompt Co-Pilot</p>
            </div>
            <div>
              <strong className="font-mono">Get API Key:</strong>
              <p className="text-gray-600">
                <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  platform.openai.com/api-keys
                </a>
              </p>
            </div>
            <div>
              <strong className="font-mono">File Size:</strong>
              <p className="text-gray-600">127KB (prompt-copilot.zip)</p>
            </div>
          </div>
        </div>
      </div>
    </ExpandableSection>
  );
}

