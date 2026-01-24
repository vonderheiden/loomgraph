import React, { useState } from 'react';
import { useBannerState } from '../context/BannerContext';
import FormHeader from './form/FormHeader';
import SpeakerCountSelector from './form/SpeakerCountSelector';
import WebinarDetailsForm from './form/WebinarDetailsForm';
import SpeakerSection from './form/SpeakerSection';
import DateTimeForm from './form/DateTimeForm';
import BrandStyleSection from './form/BrandStyleSection';
import DimensionSelector from './form/DimensionSelector';

const FormPanel: React.FC = () => {
  const { state, updateSpeaker } = useBannerState();
  const [expandedSpeaker, setExpandedSpeaker] = useState<number>(0); // Track which speaker is expanded

  return (
    <div className="w-full lg:w-[35%] bg-white border-r border-bento-border flex flex-col" data-testid="form-panel">
      {/* Sticky header */}
      <FormHeader />

      {/* Scrollable form content */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6" data-testid="form-content">
        <div className="max-w-2xl mx-auto space-y-6">
          <WebinarDetailsForm />
          <DateTimeForm />
          <DimensionSelector />
          <SpeakerCountSelector />
          
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

          <BrandStyleSection />
        </div>
      </div>
    </div>
  );
};

export default FormPanel;
