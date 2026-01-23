import { BannerProvider } from './context/BannerContext';
import FormPanel from './components/FormPanel';
import PreviewPanel from './components/preview/PreviewPanel';

function App() {
  return (
    <BannerProvider>
      <div className="min-h-screen bg-bento-bg">
        {/* Two-column Bento layout */}
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Left Column: Form */}
          <FormPanel />

          {/* Right Column: Preview */}
          <PreviewPanel />
        </div>
      </div>
    </BannerProvider>
  );
}

export default App;
