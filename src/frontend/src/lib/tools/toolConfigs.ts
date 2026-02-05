export interface PresetConfig {
  id: string;
  name: string;
  description: string;
  values: Record<string, any>;
}

export interface SettingDefinition {
  id: string;
  label: string;
  type: 'slider' | 'select' | 'toggle' | 'text' | 'color';
  defaultValue: any;
  min?: number;
  max?: number;
  step?: number;
  options?: Array<{ value: string; label: string }>;
}

export interface ToolConfig {
  presets: PresetConfig[];
  settings: SettingDefinition[];
  defaultPreset: string;
}

export const TOOL_CONFIGS: Record<string, ToolConfig> = {
  'logo-maker': {
    defaultPreset: 'modern-minimal',
    presets: [
      {
        id: 'modern-minimal',
        name: 'Modern Minimal',
        description: 'Clean, contemporary design with simple shapes',
        values: { style: 'minimal', complexity: 30, colorScheme: 'monochrome', fontSize: 48, spacing: 20, shape: 'circle', gradient: false, shadow: false },
      },
      {
        id: 'bold-geometric',
        name: 'Bold Geometric',
        description: 'Strong geometric shapes with vibrant colors',
        values: { style: 'geometric', complexity: 70, colorScheme: 'vibrant', fontSize: 56, spacing: 15, shape: 'square', gradient: true, shadow: true },
      },
      {
        id: 'elegant-script',
        name: 'Elegant Script',
        description: 'Sophisticated typography with flowing elements',
        values: { style: 'script', complexity: 50, colorScheme: 'elegant', fontSize: 52, spacing: 25, shape: 'custom', gradient: false, shadow: false },
      },
      {
        id: 'tech-futuristic',
        name: 'Tech Futuristic',
        description: 'Modern tech aesthetic with digital elements',
        values: { style: 'tech', complexity: 80, colorScheme: 'neon', fontSize: 44, spacing: 10, shape: 'hexagon', gradient: true, shadow: true },
      },
      {
        id: 'vintage-retro',
        name: 'Vintage Retro',
        description: 'Classic retro style with nostalgic appeal',
        values: { style: 'retro', complexity: 60, colorScheme: 'vintage', fontSize: 50, spacing: 18, shape: 'badge', gradient: false, shadow: true },
      },
    ],
    settings: [
      { id: 'style', label: 'Logo Style', type: 'select', defaultValue: 'minimal', options: [
        { value: 'minimal', label: 'Minimal' },
        { value: 'geometric', label: 'Geometric' },
        { value: 'script', label: 'Script' },
        { value: 'tech', label: 'Tech' },
        { value: 'retro', label: 'Retro' },
      ]},
      { id: 'complexity', label: 'Design Complexity', type: 'slider', defaultValue: 50, min: 0, max: 100, step: 5 },
      { id: 'colorScheme', label: 'Color Scheme', type: 'select', defaultValue: 'monochrome', options: [
        { value: 'monochrome', label: 'Monochrome' },
        { value: 'vibrant', label: 'Vibrant' },
        { value: 'elegant', label: 'Elegant' },
        { value: 'neon', label: 'Neon' },
        { value: 'vintage', label: 'Vintage' },
      ]},
      { id: 'fontSize', label: 'Text Size', type: 'slider', defaultValue: 48, min: 24, max: 72, step: 2 },
      { id: 'spacing', label: 'Element Spacing', type: 'slider', defaultValue: 20, min: 0, max: 50, step: 5 },
      { id: 'shape', label: 'Primary Shape', type: 'select', defaultValue: 'circle', options: [
        { value: 'circle', label: 'Circle' },
        { value: 'square', label: 'Square' },
        { value: 'hexagon', label: 'Hexagon' },
        { value: 'badge', label: 'Badge' },
        { value: 'custom', label: 'Custom' },
      ]},
      { id: 'gradient', label: 'Use Gradient', type: 'toggle', defaultValue: false },
      { id: 'shadow', label: 'Add Shadow', type: 'toggle', defaultValue: false },
    ],
  },
  'mockup-creator': {
    defaultPreset: 'phone-mockup',
    presets: [
      {
        id: 'phone-mockup',
        name: 'Phone Mockup',
        description: 'Display on modern smartphone screen',
        values: { device: 'phone', angle: 0, background: 'gradient', reflection: true, shadow: true, scale: 100, rotation: 0, perspective: 50 },
      },
      {
        id: 'laptop-mockup',
        name: 'Laptop Mockup',
        description: 'Professional laptop display',
        values: { device: 'laptop', angle: 15, background: 'solid', reflection: false, shadow: true, scale: 90, rotation: 0, perspective: 60 },
      },
      {
        id: 'tablet-mockup',
        name: 'Tablet Mockup',
        description: 'Tablet device presentation',
        values: { device: 'tablet', angle: 10, background: 'image', reflection: true, shadow: true, scale: 95, rotation: 0, perspective: 45 },
      },
      {
        id: 'billboard-mockup',
        name: 'Billboard Mockup',
        description: 'Large outdoor billboard display',
        values: { device: 'billboard', angle: 5, background: 'scene', reflection: false, shadow: false, scale: 100, rotation: 0, perspective: 70 },
      },
      {
        id: 'product-box',
        name: 'Product Box',
        description: '3D product packaging mockup',
        values: { device: 'box', angle: 25, background: 'studio', reflection: true, shadow: true, scale: 85, rotation: 15, perspective: 80 },
      },
    ],
    settings: [
      { id: 'device', label: 'Device Type', type: 'select', defaultValue: 'phone', options: [
        { value: 'phone', label: 'Phone' },
        { value: 'laptop', label: 'Laptop' },
        { value: 'tablet', label: 'Tablet' },
        { value: 'billboard', label: 'Billboard' },
        { value: 'box', label: 'Product Box' },
      ]},
      { id: 'angle', label: 'View Angle', type: 'slider', defaultValue: 0, min: -45, max: 45, step: 5 },
      { id: 'background', label: 'Background Style', type: 'select', defaultValue: 'gradient', options: [
        { value: 'gradient', label: 'Gradient' },
        { value: 'solid', label: 'Solid Color' },
        { value: 'image', label: 'Image' },
        { value: 'scene', label: 'Scene' },
        { value: 'studio', label: 'Studio' },
      ]},
      { id: 'reflection', label: 'Show Reflection', type: 'toggle', defaultValue: true },
      { id: 'shadow', label: 'Add Shadow', type: 'toggle', defaultValue: true },
      { id: 'scale', label: 'Device Scale', type: 'slider', defaultValue: 100, min: 50, max: 150, step: 5 },
      { id: 'rotation', label: 'Rotation', type: 'slider', defaultValue: 0, min: -180, max: 180, step: 15 },
      { id: 'perspective', label: 'Perspective Depth', type: 'slider', defaultValue: 50, min: 0, max: 100, step: 10 },
    ],
  },
  'mini-world-generator': {
    defaultPreset: 'tilt-shift-city',
    presets: [
      {
        id: 'tilt-shift-city',
        name: 'Tilt-Shift City',
        description: 'Miniature city with toy-like appearance',
        values: { effect: 'tilt-shift', saturation: 150, blur: 80, vignette: true, contrast: 120, brightness: 110, scale: 'tiny', focus: 'center' },
      },
      {
        id: 'miniature-landscape',
        name: 'Miniature Landscape',
        description: 'Tiny world landscape effect',
        values: { effect: 'miniature', saturation: 140, blur: 70, vignette: false, contrast: 110, brightness: 105, scale: 'small', focus: 'top' },
      },
      {
        id: 'toy-world',
        name: 'Toy World',
        description: 'Playful toy-like world',
        values: { effect: 'toy', saturation: 180, blur: 90, vignette: true, contrast: 130, brightness: 115, scale: 'micro', focus: 'center' },
      },
      {
        id: 'diorama-scene',
        name: 'Diorama Scene',
        description: 'Model diorama appearance',
        values: { effect: 'diorama', saturation: 130, blur: 60, vignette: false, contrast: 115, brightness: 100, scale: 'small', focus: 'bottom' },
      },
      {
        id: 'fantasy-miniature',
        name: 'Fantasy Miniature',
        description: 'Magical miniature world',
        values: { effect: 'fantasy', saturation: 160, blur: 75, vignette: true, contrast: 125, brightness: 120, scale: 'tiny', focus: 'center' },
      },
    ],
    settings: [
      { id: 'effect', label: 'Effect Type', type: 'select', defaultValue: 'tilt-shift', options: [
        { value: 'tilt-shift', label: 'Tilt-Shift' },
        { value: 'miniature', label: 'Miniature' },
        { value: 'toy', label: 'Toy' },
        { value: 'diorama', label: 'Diorama' },
        { value: 'fantasy', label: 'Fantasy' },
      ]},
      { id: 'saturation', label: 'Color Saturation', type: 'slider', defaultValue: 150, min: 100, max: 200, step: 10 },
      { id: 'blur', label: 'Blur Intensity', type: 'slider', defaultValue: 80, min: 0, max: 100, step: 5 },
      { id: 'vignette', label: 'Add Vignette', type: 'toggle', defaultValue: true },
      { id: 'contrast', label: 'Contrast', type: 'slider', defaultValue: 120, min: 80, max: 150, step: 5 },
      { id: 'brightness', label: 'Brightness', type: 'slider', defaultValue: 110, min: 80, max: 140, step: 5 },
      { id: 'scale', label: 'World Scale', type: 'select', defaultValue: 'tiny', options: [
        { value: 'micro', label: 'Micro' },
        { value: 'tiny', label: 'Tiny' },
        { value: 'small', label: 'Small' },
      ]},
      { id: 'focus', label: 'Focus Area', type: 'select', defaultValue: 'center', options: [
        { value: 'top', label: 'Top' },
        { value: 'center', label: 'Center' },
        { value: 'bottom', label: 'Bottom' },
      ]},
    ],
  },
  'background-removal': {
    defaultPreset: 'clean-removal',
    presets: [
      {
        id: 'clean-removal',
        name: 'Clean Removal',
        description: 'Simple background removal with transparency',
        values: { mode: 'remove', edge: 'smooth', feather: 2, tolerance: 50, newBackground: 'transparent', blur: 0, color: '#ffffff', pattern: 'none' },
      },
      {
        id: 'white-background',
        name: 'White Background',
        description: 'Replace with clean white background',
        values: { mode: 'replace', edge: 'sharp', feather: 1, tolerance: 60, newBackground: 'solid', blur: 0, color: '#ffffff', pattern: 'none' },
      },
      {
        id: 'gradient-background',
        name: 'Gradient Background',
        description: 'Replace with smooth gradient',
        values: { mode: 'replace', edge: 'smooth', feather: 3, tolerance: 55, newBackground: 'gradient', blur: 0, color: '#4f46e5', pattern: 'none' },
      },
      {
        id: 'blur-background',
        name: 'Blur Background',
        description: 'Keep background but blur it',
        values: { mode: 'blur', edge: 'soft', feather: 4, tolerance: 45, newBackground: 'blur', blur: 80, color: '#000000', pattern: 'none' },
      },
      {
        id: 'studio-background',
        name: 'Studio Background',
        description: 'Professional studio backdrop',
        values: { mode: 'replace', edge: 'smooth', feather: 2, tolerance: 50, newBackground: 'pattern', blur: 0, color: '#1f2937', pattern: 'studio' },
      },
    ],
    settings: [
      { id: 'mode', label: 'Removal Mode', type: 'select', defaultValue: 'remove', options: [
        { value: 'remove', label: 'Remove' },
        { value: 'replace', label: 'Replace' },
        { value: 'blur', label: 'Blur' },
      ]},
      { id: 'edge', label: 'Edge Quality', type: 'select', defaultValue: 'smooth', options: [
        { value: 'sharp', label: 'Sharp' },
        { value: 'smooth', label: 'Smooth' },
        { value: 'soft', label: 'Soft' },
      ]},
      { id: 'feather', label: 'Edge Feather', type: 'slider', defaultValue: 2, min: 0, max: 10, step: 1 },
      { id: 'tolerance', label: 'Detection Tolerance', type: 'slider', defaultValue: 50, min: 0, max: 100, step: 5 },
      { id: 'newBackground', label: 'New Background', type: 'select', defaultValue: 'transparent', options: [
        { value: 'transparent', label: 'Transparent' },
        { value: 'solid', label: 'Solid Color' },
        { value: 'gradient', label: 'Gradient' },
        { value: 'blur', label: 'Blurred' },
        { value: 'pattern', label: 'Pattern' },
      ]},
      { id: 'blur', label: 'Background Blur', type: 'slider', defaultValue: 0, min: 0, max: 100, step: 5 },
      { id: 'color', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'pattern', label: 'Pattern Style', type: 'select', defaultValue: 'none', options: [
        { value: 'none', label: 'None' },
        { value: 'studio', label: 'Studio' },
        { value: 'texture', label: 'Texture' },
      ]},
    ],
  },
  'ai-retouch': {
    defaultPreset: 'natural-enhancement',
    presets: [
      {
        id: 'natural-enhancement',
        name: 'Natural Enhancement',
        description: 'Subtle improvements maintaining natural look',
        values: { smoothing: 30, blemishRemoval: 70, eyeEnhancement: 40, teethWhitening: 20, skinTone: 10, sharpness: 15, glow: 20, warmth: 5 },
      },
      {
        id: 'glamour-retouch',
        name: 'Glamour Retouch',
        description: 'Professional glamour photography style',
        values: { smoothing: 60, blemishRemoval: 90, eyeEnhancement: 70, teethWhitening: 50, skinTone: 30, sharpness: 25, glow: 50, warmth: 15 },
      },
      {
        id: 'magazine-quality',
        name: 'Magazine Quality',
        description: 'High-end magazine editorial look',
        values: { smoothing: 50, blemishRemoval: 85, eyeEnhancement: 60, teethWhitening: 40, skinTone: 25, sharpness: 30, glow: 40, warmth: 10 },
      },
      {
        id: 'subtle-touch',
        name: 'Subtle Touch',
        description: 'Minimal retouching for authentic feel',
        values: { smoothing: 20, blemishRemoval: 50, eyeEnhancement: 30, teethWhitening: 15, skinTone: 5, sharpness: 10, glow: 15, warmth: 0 },
      },
      {
        id: 'beauty-portrait',
        name: 'Beauty Portrait',
        description: 'Enhanced beauty portrait style',
        values: { smoothing: 70, blemishRemoval: 95, eyeEnhancement: 80, teethWhitening: 60, skinTone: 40, sharpness: 20, glow: 60, warmth: 20 },
      },
    ],
    settings: [
      { id: 'smoothing', label: 'Skin Smoothing', type: 'slider', defaultValue: 30, min: 0, max: 100, step: 5 },
      { id: 'blemishRemoval', label: 'Blemish Removal', type: 'slider', defaultValue: 70, min: 0, max: 100, step: 5 },
      { id: 'eyeEnhancement', label: 'Eye Enhancement', type: 'slider', defaultValue: 40, min: 0, max: 100, step: 5 },
      { id: 'teethWhitening', label: 'Teeth Whitening', type: 'slider', defaultValue: 20, min: 0, max: 100, step: 5 },
      { id: 'skinTone', label: 'Skin Tone Even', type: 'slider', defaultValue: 10, min: 0, max: 100, step: 5 },
      { id: 'sharpness', label: 'Detail Sharpness', type: 'slider', defaultValue: 15, min: 0, max: 100, step: 5 },
      { id: 'glow', label: 'Skin Glow', type: 'slider', defaultValue: 20, min: 0, max: 100, step: 5 },
      { id: 'warmth', label: 'Warmth', type: 'slider', defaultValue: 5, min: -50, max: 50, step: 5 },
    ],
  },
};

// Generate configs for remaining tools with similar patterns
const generateToolConfig = (toolId: string, presetTheme: string): ToolConfig => {
  const basePresets: PresetConfig[] = [
    {
      id: `${toolId}-preset-1`,
      name: `${presetTheme} Classic`,
      description: `Traditional ${presetTheme} style`,
      values: { intensity: 50, style: 'classic', quality: 80, enhancement: 40, color: 100, detail: 60, effect: 'standard', mode: 'balanced' },
    },
    {
      id: `${toolId}-preset-2`,
      name: `${presetTheme} Modern`,
      description: `Contemporary ${presetTheme} approach`,
      values: { intensity: 70, style: 'modern', quality: 90, enhancement: 60, color: 120, detail: 70, effect: 'enhanced', mode: 'creative' },
    },
    {
      id: `${toolId}-preset-3`,
      name: `${presetTheme} Artistic`,
      description: `Artistic ${presetTheme} interpretation`,
      values: { intensity: 80, style: 'artistic', quality: 85, enhancement: 70, color: 140, detail: 80, effect: 'artistic', mode: 'expressive' },
    },
    {
      id: `${toolId}-preset-4`,
      name: `${presetTheme} Subtle`,
      description: `Gentle ${presetTheme} effect`,
      values: { intensity: 30, style: 'subtle', quality: 75, enhancement: 30, color: 90, detail: 50, effect: 'light', mode: 'natural' },
    },
    {
      id: `${toolId}-preset-5`,
      name: `${presetTheme} Dramatic`,
      description: `Bold ${presetTheme} impact`,
      values: { intensity: 90, style: 'dramatic', quality: 95, enhancement: 85, color: 150, detail: 90, effect: 'intense', mode: 'bold' },
    },
  ];

  const baseSettings: SettingDefinition[] = [
    { id: 'intensity', label: 'Effect Intensity', type: 'slider', defaultValue: 50, min: 0, max: 100, step: 5 },
    { id: 'style', label: 'Style Type', type: 'select', defaultValue: 'classic', options: [
      { value: 'classic', label: 'Classic' },
      { value: 'modern', label: 'Modern' },
      { value: 'artistic', label: 'Artistic' },
      { value: 'subtle', label: 'Subtle' },
      { value: 'dramatic', label: 'Dramatic' },
    ]},
    { id: 'quality', label: 'Output Quality', type: 'slider', defaultValue: 80, min: 50, max: 100, step: 5 },
    { id: 'enhancement', label: 'Enhancement Level', type: 'slider', defaultValue: 40, min: 0, max: 100, step: 5 },
    { id: 'color', label: 'Color Intensity', type: 'slider', defaultValue: 100, min: 50, max: 200, step: 10 },
    { id: 'detail', label: 'Detail Preservation', type: 'slider', defaultValue: 60, min: 0, max: 100, step: 5 },
    { id: 'effect', label: 'Effect Mode', type: 'select', defaultValue: 'standard', options: [
      { value: 'light', label: 'Light' },
      { value: 'standard', label: 'Standard' },
      { value: 'enhanced', label: 'Enhanced' },
      { value: 'artistic', label: 'Artistic' },
      { value: 'intense', label: 'Intense' },
    ]},
    { id: 'mode', label: 'Processing Mode', type: 'select', defaultValue: 'balanced', options: [
      { value: 'natural', label: 'Natural' },
      { value: 'balanced', label: 'Balanced' },
      { value: 'creative', label: 'Creative' },
      { value: 'expressive', label: 'Expressive' },
      { value: 'bold', label: 'Bold' },
    ]},
  ];

  return {
    defaultPreset: `${toolId}-preset-1`,
    presets: basePresets,
    settings: baseSettings,
  };
};

// Add configs for all remaining tools
const remainingTools = [
  'product-photographer',
  'sketch-pencil-art',
  'wedding-prewedding-editor',
  'id-photo-booth',
  'architectural-design-visualizer',
  'maternity-photo-editor',
  'big-head-caricature-generator',
  'infographic-poster-creator',
  'photo-restoration',
  'fashion-model-generator',
  'banner-design',
  'baby-kids-photo-editor',
  'religious-event-photo-editor',
  'graduation-photo-editor',
  'age-transformation-filter',
  'magic-eraser',
  'collage-maker',
  'filter-usia-age-filter',
  'barbershop-stylist',
  'outpainting',
  'pov-hand-creator',
];

remainingTools.forEach((toolId) => {
  const themeMap: Record<string, string> = {
    'product-photographer': 'Product',
    'sketch-pencil-art': 'Sketch',
    'wedding-prewedding-editor': 'Wedding',
    'id-photo-booth': 'ID Photo',
    'architectural-design-visualizer': 'Architecture',
    'maternity-photo-editor': 'Maternity',
    'big-head-caricature-generator': 'Caricature',
    'infographic-poster-creator': 'Infographic',
    'photo-restoration': 'Restoration',
    'fashion-model-generator': 'Fashion',
    'banner-design': 'Banner',
    'baby-kids-photo-editor': 'Kids',
    'religious-event-photo-editor': 'Religious',
    'graduation-photo-editor': 'Graduation',
    'age-transformation-filter': 'Age',
    'magic-eraser': 'Eraser',
    'collage-maker': 'Collage',
    'filter-usia-age-filter': 'Age Filter',
    'barbershop-stylist': 'Hairstyle',
    'outpainting': 'Outpaint',
    'pov-hand-creator': 'POV Hand',
  };
  
  TOOL_CONFIGS[toolId] = generateToolConfig(toolId, themeMap[toolId] || 'Effect');
});

export function getToolConfig(toolId: string): ToolConfig | undefined {
  return TOOL_CONFIGS[toolId];
}

export function getDefaultValues(toolId: string): Record<string, any> {
  const config = getToolConfig(toolId);
  if (!config) return {};
  
  const defaultPreset = config.presets.find((p) => p.id === config.defaultPreset);
  return defaultPreset?.values || {};
}
