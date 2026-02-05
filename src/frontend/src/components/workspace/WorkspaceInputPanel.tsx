import { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Upload, Play, Loader2 } from 'lucide-react';
import type { ToolInputMode } from '../../lib/tools/toolRegistry';

interface WorkspaceInputPanelProps {
  inputMode: ToolInputMode;
  inputFile: File | null;
  onInputFileChange: (file: File | null) => void;
  onProcess: () => void;
  isProcessing: boolean;
}

export default function WorkspaceInputPanel({
  inputMode,
  inputFile,
  onInputFileChange,
  onProcess,
  isProcessing,
}: WorkspaceInputPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onInputFileChange(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const isRequired = inputMode === 'edit';
  const canStartBlank = inputMode === 'generation' || inputMode === 'hybrid';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Input</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={handleUploadClick}
            className="flex-1 gap-2"
          >
            <Upload className="h-4 w-4" />
            {inputFile ? 'Change Image' : 'Upload Image'}
            {isRequired && <span className="text-destructive">*</span>}
          </Button>
          
          <Button
            onClick={onProcess}
            disabled={isProcessing || (isRequired && !inputFile)}
            className="flex-1 gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                {canStartBlank && !inputFile ? 'Generate' : 'Apply'}
              </>
            )}
          </Button>
        </div>

        {inputFile && (
          <div className="text-sm text-muted-foreground">
            Selected: {inputFile.name}
          </div>
        )}

        {isRequired && !inputFile && (
          <p className="text-sm text-destructive">
            This tool requires an image upload to proceed.
          </p>
        )}

        {canStartBlank && !inputFile && (
          <p className="text-sm text-muted-foreground">
            You can start from a blank canvas or upload an image.
          </p>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </CardContent>
    </Card>
  );
}
