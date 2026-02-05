import { useState, useEffect } from 'react';
import { getToolConfig, getDefaultValues } from '../../lib/tools/toolConfigs';
import { processImageWithConfig } from '../../lib/image/localToolProcessors';
import ToolConfigPanel from './ToolConfigPanel';
import WorkspaceLayout from '../workspace/WorkspaceLayout';
import HowItWorks from './HowItWorks';
import { toast } from 'sonner';
import type { ToolInputMode } from '../../lib/tools/toolRegistry';

interface ToolStudioProps {
  toolId: string;
  toolName: string;
  inputMode: ToolInputMode;
  initialConfig?: Record<string, any>;
  initialPreset?: string;
}

export default function ToolStudio({
  toolId,
  toolName,
  inputMode,
  initialConfig,
  initialPreset,
}: ToolStudioProps) {
  const toolConfig = getToolConfig(toolId);
  const [selectedPreset, setSelectedPreset] = useState(
    initialPreset || toolConfig?.defaultPreset || ''
  );
  const [config, setConfig] = useState<Record<string, any>>(
    initialConfig || getDefaultValues(toolId)
  );
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [outputImageUrl, setOutputImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (initialConfig) {
      setConfig(initialConfig);
    }
    if (initialPreset) {
      setSelectedPreset(initialPreset);
    }
  }, [initialConfig, initialPreset]);

  const handlePresetChange = (presetId: string) => {
    setSelectedPreset(presetId);
    const preset = toolConfig?.presets.find((p) => p.id === presetId);
    if (preset) {
      setConfig(preset.values);
    }
  };

  const handleConfigChange = (key: string, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    const defaultValues = getDefaultValues(toolId);
    setConfig(defaultValues);
    setSelectedPreset(toolConfig?.defaultPreset || '');
    toast.success('Settings reset to default');
  };

  const handleProcess = async () => {
    if (inputMode === 'edit' && !inputFile) {
      toast.error('Please upload an image first');
      return;
    }

    setIsProcessing(true);
    try {
      const result = await processImageWithConfig(toolId, inputFile, config);
      setOutputImageUrl(result.imageUrl);
      toast.success('Processing complete!');
    } catch (error) {
      console.error('Processing error:', error);
      toast.error('Processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{toolName}</h1>
        <p className="text-muted-foreground">
          {inputMode === 'generation' && 'Start from blank canvas or upload an image'}
          {inputMode === 'edit' && 'Upload an image to begin editing'}
          {inputMode === 'hybrid' && 'Start from blank or upload an image'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <ToolConfigPanel
            toolId={toolId}
            selectedPreset={selectedPreset}
            config={config}
            onPresetChange={handlePresetChange}
            onConfigChange={handleConfigChange}
            onReset={handleReset}
          />
        </div>

        <div className="lg:col-span-3">
          <WorkspaceLayout
            inputMode={inputMode}
            inputFile={inputFile}
            outputImageUrl={outputImageUrl}
            isProcessing={isProcessing}
            onInputFileChange={setInputFile}
            onProcess={handleProcess}
            toolId={toolId}
            toolName={toolName}
            config={config}
            selectedPreset={selectedPreset}
          />
        </div>
      </div>

      <HowItWorks toolId={toolId} />
    </div>
  );
}
