import React from 'react';
import { useBannerState } from '../context/BannerContext';
import SpeakerCountSelector from './form/SpeakerCountSelector';
import WebinarDetailsForm from './form/WebinarDetailsForm';
import SpeakerSection from './form/SpeakerSection';
import DateTimeForm from './form/DateTimeForm';
import ColorPicker from './form/ColorPicker';

const FormPanel: React.FC = () => {
  const { state, updateSpeaker } = useBannerState();

  return (
    <div className="w-full lg:w-1/2 p-6 overflow-y-auto">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your Webinar Banner
          </h1>
          <p className="text-gray-600">
            Fill in the details below and watch your banner come to life in real-time.
          </p>
        </div>

        <SpeakerCountSelector />
        <WebinarDetailsForm />
        
        {/* Dynamic Speaker Sections */}
        {state.speakers.slice(0, state.speakerCount).map((speaker, index) => (
          <SpeakerSection
            key={index}
            speaker={speaker}
            speakerIndex={index}
            onUpdate={(updates) => updateSpeaker(index, updates)}
          />
        ))}

        <DateTimeForm />
        <ColorPicker />
      </div>
    </div>
  );
};

export default FormPanel;
