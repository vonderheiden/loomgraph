import { BannerProvider } from './context/BannerContext';
import FormPanel from './components/FormPanel';
import PreviewPanel from './components/preview/PreviewPanel';

function App() {
  return (
    <BannerProvider>
      <div className="min-h-screen bg-bento-bg">
        {/* Two-column layout: 40% form, 60% preview */}
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Left Column: Form (40%) */}
          <FormPanel />

          {/* Right Column: Preview (60%) */}
          <PreviewPanel />
        </div>
      </div>
    </BannerProvider>
  );
}

export default App;
