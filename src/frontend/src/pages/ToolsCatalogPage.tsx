import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { TOOLS, TOOL_CATEGORIES } from '../lib/tools/toolRegistry';
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

export default function ToolsCatalogPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">All Tools</h1>
        <p className="text-muted-foreground">
          Browse our complete collection of {TOOLS.length} professional image tools
        </p>
      </div>

      {TOOL_CATEGORIES.map((category) => {
        const categoryTools = TOOLS.filter((t) => t.category === category);
        
        return (
          <section key={category}>
            <h2 className="text-2xl font-bold mb-4">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryTools.map((tool) => {
                const Icon = iconMap[tool.icon] || Sparkles;
                
                return (
                  <Link key={tool.id} to={tool.path}>
                    <Card className="h-full hover:border-accent transition-colors cursor-pointer">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-accent/10">
                              <Icon className="h-5 w-5 text-accent" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{tool.name}</CardTitle>
                            </div>
                          </div>
                        </div>
                        <CardDescription className="mt-2">{tool.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Badge variant="secondary" className="text-xs">
                          {tool.inputMode === 'generation' && 'Generation'}
                          {tool.inputMode === 'edit' && 'Image Edit'}
                          {tool.inputMode === 'hybrid' && 'Hybrid'}
                        </Badge>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
