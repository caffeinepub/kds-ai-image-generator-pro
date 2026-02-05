import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ImageIcon } from 'lucide-react';
import type { ToolInputMode } from '../../lib/tools/toolRegistry';

interface WorkspacePreviewPanelProps {
  inputFile: File | null;
  inputMode: ToolInputMode;
}

export default function WorkspacePreviewPanel({ inputFile, inputMode }: WorkspacePreviewPanelProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (inputFile) {
      const url = URL.createObjectURL(inputFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [inputFile]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Input preview"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <ImageIcon className="h-12 w-12" />
              <p className="text-sm">
                {inputMode === 'edit' ? 'Upload an image to preview' : 'No input image'}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
