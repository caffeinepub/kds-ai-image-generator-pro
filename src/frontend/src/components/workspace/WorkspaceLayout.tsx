import WorkspaceInputPanel from './WorkspaceInputPanel';
import WorkspacePreviewPanel from './WorkspacePreviewPanel';
import WorkspaceOutputPanel from './WorkspaceOutputPanel';
import type { ToolInputMode } from '../../lib/tools/toolRegistry';

interface WorkspaceLayoutProps {
  inputMode: ToolInputMode;
  inputFile: File | null;
  outputImageUrl: string | null;
  isProcessing: boolean;
  onInputFileChange: (file: File | null) => void;
  onProcess: () => void;
  toolId: string;
  toolName: string;
  config: Record<string, any>;
  selectedPreset: string;
}

export default function WorkspaceLayout({
  inputMode,
  inputFile,
  outputImageUrl,
  isProcessing,
  onInputFileChange,
  onProcess,
  toolId,
  toolName,
  config,
  selectedPreset,
}: WorkspaceLayoutProps) {
  return (
    <div className="space-y-4">
      <WorkspaceInputPanel
        inputMode={inputMode}
        inputFile={inputFile}
        onInputFileChange={onInputFileChange}
        onProcess={onProcess}
        isProcessing={isProcessing}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WorkspacePreviewPanel inputFile={inputFile} inputMode={inputMode} />
        <WorkspaceOutputPanel
          outputImageUrl={outputImageUrl}
          isProcessing={isProcessing}
          toolId={toolId}
          toolName={toolName}
          config={config}
          selectedPreset={selectedPreset}
          inputFile={inputFile}
        />
      </div>
    </div>
  );
}
