import { getToolHelpText } from '../../lib/tools/toolHelpText';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Info } from 'lucide-react';

interface HowItWorksProps {
  toolId: string;
}

export default function HowItWorks({ toolId }: HowItWorksProps) {
  const helpText = getToolHelpText(toolId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Info className="h-5 w-5" />
          How it works
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">{helpText}</p>
      </CardContent>
    </Card>
  );
}
