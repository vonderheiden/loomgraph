import React, { useState } from 'react';
import { useBannerState } from '../context/BannerContext';
import SpeakerCountSelector from './form/SpeakerCountSelector';
import WebinarDetailsForm from './form/WebinarDetailsForm';
import SpeakerSection from './form/SpeakerSection';
import DateTimeForm from './form/DateTimeForm';
import ColorPicker from './form/ColorPicker';
import BackgroundSelector from './form/BackgroundSelector';

const FormPanel: React.FC = () => {
  const { state, updateSpeaker } = useBannerState();
  const [expandedSpeaker, setExpandedSpeaker] = useState<number>(0); // Track which speaker is expanded

  return (
    <div className="w-full lg:w-2/5 bg-white border-r border-gray-200">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Create Your Webinar Banner</h1>
        <p className="text-sm text-gray-600">Fill in the details below</p>
      </div>

      {/* Scrollable form */}
      <div className="overflow-y-auto p-6" style={{ height: 'calc(100vh - 80px)' }}>
        <div className="max-w-2xl mx-auto space-y-4">
          <SpeakerCountSelector />
          <WebinarDetailsForm />
          
          {/* Dynamic Speaker Sections with auto-collapse */}
          {state.speakers.slice(0, state.speakerCount).map((speaker, index) => (
            <SpeakerSection
              key={index}
              speaker={speaker}
              speakerIndex={index}
              onUpdate={(updates) => updateSpeaker(index, updates)}
              isExpanded={expandedSpeaker === index}
              onToggle={() => setExpandedSpeaker(expandedSpeaker === index ? -1 : index)}
            />
          ))}

          <DateTimeForm />
          <ColorPicker />
          <BackgroundSelector />
        </div>
      </div>
    </div>
  );
};

export default FormPanel;
