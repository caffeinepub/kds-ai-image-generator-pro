import { Link } from '@tanstack/react-router';
import { TOOLS, TOOL_CATEGORIES } from '../../lib/tools/toolRegistry';
import { Button } from '../ui/button';
import { 
  Sparkles, Box, Globe, Scissors, Maximize2, Hand, Eraser, Wand2, 
  Camera, Pencil, Heart, IdCard, Building2, Baby, Smile, BarChart3, 
  ImagePlus, User, Layout, Sparkle, Church, GraduationCap, Clock, 
  Trash2, Grid3x3, Timer 
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Sparkles, Box, Globe, Scissors, Maximize2, Hand, Eraser, Wand2,
  Camera, Pencil, Heart, IdCard, Building2, Baby, Smile, BarChart3,
  ImagePlus, User, Layout, Sparkle, Church, GraduationCap, Clock,
  Trash2, Grid3x3, Timer,
};

interface ToolNavProps {
  onNavigate?: () => void;
}

export default function ToolNav({ onNavigate }: ToolNavProps) {
  return (
    <div className="space-y-6">
      {TOOL_CATEGORIES.map((category) => {
        const categoryTools = TOOLS.filter((tool) => tool.category === category);
        
        return (
          <div key={category}>
            <h3 className="mb-2 px-2 text-sm font-semibold text-muted-foreground">
              {category}
            </h3>
            <div className="space-y-1">
              {categoryTools.map((tool) => {
                const Icon = iconMap[tool.icon] || Sparkles;
                
                return (
                  <Link
                    key={tool.id}
                    to={tool.path}
                    onClick={onNavigate}
                    className="block"
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 h-auto py-2"
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="text-left text-sm">{tool.name}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
