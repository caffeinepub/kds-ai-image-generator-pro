import { getToolConfig } from '../../lib/tools/toolConfigs';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { RotateCcw } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

interface ToolConfigPanelProps {
  toolId: string;
  selectedPreset: string;
  config: Record<string, any>;
  onPresetChange: (presetId: string) => void;
  onConfigChange: (key: string, value: any) => void;
  onReset: () => void;
}

export default function ToolConfigPanel({
  toolId,
  selectedPreset,
  config,
  onPresetChange,
  onConfigChange,
  onReset,
}: ToolConfigPanelProps) {
  const toolConfig = getToolConfig(toolId);

  if (!toolConfig) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Configuration</CardTitle>
          <Button variant="ghost" size="icon" onClick={onReset} title="Reset to default">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Presets */}
        <div className="space-y-2">
          <Label>Preset</Label>
          <Select value={selectedPreset} onValueChange={onPresetChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {toolConfig.presets.map((preset) => (
                <SelectItem key={preset.id} value={preset.id}>
                  <div className="flex flex-col">
                    <span className="font-medium">{preset.name}</span>
                    <span className="text-xs text-muted-foreground">{preset.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Advanced Settings */}
        <Accordion type="single" collapsible defaultValue="advanced">
          <AccordionItem value="advanced">
            <AccordionTrigger>Advanced Settings</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                {toolConfig.settings.map((setting) => (
                  <div key={setting.id} className="space-y-2">
                    <Label htmlFor={setting.id}>{setting.label}</Label>
                    
                    {setting.type === 'slider' && (
                      <div className="space-y-2">
                        <Slider
                          id={setting.id}
                          value={[config[setting.id] ?? setting.defaultValue]}
                          onValueChange={([value]) => onConfigChange(setting.id, value)}
                          min={setting.min}
                          max={setting.max}
                          step={setting.step}
                        />
                        <div className="text-xs text-muted-foreground text-right">
                          {config[setting.id] ?? setting.defaultValue}
                        </div>
                      </div>
                    )}
                    
                    {setting.type === 'select' && (
                      <Select
                        value={config[setting.id] ?? setting.defaultValue}
                        onValueChange={(value) => onConfigChange(setting.id, value)}
                      >
                        <SelectTrigger id={setting.id}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {setting.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    
                    {setting.type === 'toggle' && (
                      <div className="flex items-center gap-2">
                        <Switch
                          id={setting.id}
                          checked={config[setting.id] ?? setting.defaultValue}
                          onCheckedChange={(checked) => onConfigChange(setting.id, checked)}
                        />
                      </div>
                    )}
                    
                    {setting.type === 'text' && (
                      <Input
                        id={setting.id}
                        value={config[setting.id] ?? setting.defaultValue}
                        onChange={(e) => onConfigChange(setting.id, e.target.value)}
                      />
                    )}
                    
                    {setting.type === 'color' && (
                      <Input
                        id={setting.id}
                        type="color"
                        value={config[setting.id] ?? setting.defaultValue}
                        onChange={(e) => onConfigChange(setting.id, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
