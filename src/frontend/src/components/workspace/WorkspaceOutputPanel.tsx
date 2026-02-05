import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Download, Save, Loader2, ImageIcon } from 'lucide-react';
import { useSaveProject } from '../../hooks/useQueries';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { toast } from 'sonner';

interface WorkspaceOutputPanelProps {
  outputImageUrl: string | null;
  isProcessing: boolean;
  toolId: string;
  toolName: string;
  config: Record<string, any>;
  selectedPreset: string;
  inputFile: File | null;
}

export default function WorkspaceOutputPanel({
  outputImageUrl,
  isProcessing,
  toolId,
  toolName,
  config,
  selectedPreset,
  inputFile,
}: WorkspaceOutputPanelProps) {
  const { identity } = useInternetIdentity();
  const saveProject = useSaveProject();

  const handleDownload = () => {
    if (!outputImageUrl) return;

    const link = document.createElement('a');
    link.href = outputImageUrl;
    link.download = `${toolId}-${Date.now()}.png`;
    link.click();
    toast.success('Image downloaded!');
  };

  const handleSave = async () => {
    if (!identity) {
      toast.error('Please log in to save projects');
      return;
    }

    try {
      const projectName = `${toolName} - ${new Date().toLocaleDateString()}`;
      await saveProject.mutateAsync({
        projectName,
        toolType: toolId,
        preset: selectedPreset,
        configuration: JSON.stringify(config),
        inputAssets: inputFile ? [{ assetId: inputFile.name, assetType: 'image', description: 'Input image' }] : [],
        outputAssets: outputImageUrl ? [{ assetId: 'output', assetType: 'image', description: 'Generated output' }] : [],
      });
      toast.success('Project saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save project');
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Output</CardTitle>
          {outputImageUrl && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              {identity && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSave}
                  disabled={saveProject.isPending}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saveProject.isPending ? 'Saving...' : 'Save'}
                </Button>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden relative">
          {isProcessing ? (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Loader2 className="h-12 w-12 animate-spin" />
              <p className="text-sm">Processing...</p>
            </div>
          ) : outputImageUrl ? (
            <>
              <img
                src={outputImageUrl}
                alt="Output result"
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                Local processing preview
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <ImageIcon className="h-12 w-12" />
              <p className="text-sm">Output will appear here</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
