import {
  createCanvas,
  loadImageFromFile,
  applyFilter,
  resetFilter,
  drawImageCentered,
  applyGradient,
  applyVignette,
  adjustBrightness,
  adjustSaturation,
  canvasToBlobUrl,
} from './canvasUtils';

export interface ProcessingResult {
  imageUrl: string;
  canvas: HTMLCanvasElement;
}

export async function processLogoMaker(
  config: Record<string, any>
): Promise<ProcessingResult> {
  const canvas = createCanvas(800, 800);
  const ctx = canvas.getContext('2d')!;
  
  // Background
  if (config.gradient) {
    applyGradient(ctx, 800, 800, '#1f2937', '#4f46e5');
  } else {
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, 800, 800);
  }
  
  // Draw shape
  ctx.fillStyle = '#f59e0b';
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  
  const centerX = 400;
  const centerY = 400;
  const size = 200 - (config.spacing || 0);
  
  if (config.shape === 'circle') {
    ctx.beginPath();
    ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else if (config.shape === 'square') {
    ctx.fillRect(centerX - size / 2, centerY - size / 2, size, size);
    ctx.strokeRect(centerX - size / 2, centerY - size / 2, size, size);
  } else if (config.shape === 'hexagon') {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const x = centerX + (size / 2) * Math.cos(angle);
      const y = centerY + (size / 2) * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  
  // Add text
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${config.fontSize || 48}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('KDS', centerX, centerY + 280);
  
  if (config.shadow) {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
  }
  
  return {
    imageUrl: canvasToBlobUrl(canvas),
    canvas,
  };
}

export async function processImageWithConfig(
  toolId: string,
  inputFile: File | null,
  config: Record<string, any>
): Promise<ProcessingResult> {
  // Handle generation-first tools
  if (!inputFile) {
    if (toolId === 'logo-maker') {
      return processLogoMaker(config);
    }
    // Other generation tools create blank canvas with effects
    const canvas = createCanvas(1200, 800);
    const ctx = canvas.getContext('2d')!;
    
    applyGradient(ctx, 1200, 800, '#1f2937', '#374151');
    
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 48px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Generated Content', 600, 400);
    
    return {
      imageUrl: canvasToBlobUrl(canvas),
      canvas,
    };
  }
  
  // Load input image
  const img = await loadImageFromFile(inputFile);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d')!;
  
  // Apply tool-specific processing
  switch (toolId) {
    case 'background-removal':
      return processBackgroundRemoval(img, canvas, ctx, config);
    case 'sketch-pencil-art':
      return processSketchArt(img, canvas, ctx, config);
    case 'mini-world-generator':
      return processMiniWorld(img, canvas, ctx, config);
    case 'ai-retouch':
      return processRetouch(img, canvas, ctx, config);
    case 'outpainting':
      return processOutpainting(img, canvas, ctx, config);
    case 'magic-eraser':
      return processMagicEraser(img, canvas, ctx, config);
    default:
      return processGenericEffect(img, canvas, ctx, config);
  }
}

function processBackgroundRemoval(
  img: HTMLImageElement,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  config: Record<string, any>
): ProcessingResult {
  // Draw original image
  ctx.drawImage(img, 0, 0);
  
  // Simulate background removal with edge detection
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  // Simple edge-based masking (simplified)
  for (let i = 0; i < data.length; i += 4) {
    const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
    if (brightness > 200 || brightness < 50) {
      data[i + 3] = Math.max(0, data[i + 3] - 100); // Make lighter/darker areas more transparent
    }
  }
  
  // Clear and apply new background
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  if (config.newBackground === 'solid') {
    ctx.fillStyle = config.color || '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else if (config.newBackground === 'gradient') {
    applyGradient(ctx, canvas.width, canvas.height, config.color || '#4f46e5', '#1f2937');
  }
  
  ctx.putImageData(imageData, 0, 0);
  
  return {
    imageUrl: canvasToBlobUrl(canvas),
    canvas,
  };
}

function processSketchArt(
  img: HTMLImageElement,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  config: Record<string, any>
): ProcessingResult {
  ctx.drawImage(img, 0, 0);
  
  // Convert to grayscale and apply edge detection effect
  const filters = [
    'grayscale(100%)',
    `contrast(${150 + (config.intensity || 0)}%)`,
    `brightness(${120}%)`,
    'invert(100%)',
  ];
  
  applyFilter(ctx, filters.join(' '));
  ctx.drawImage(canvas, 0, 0);
  resetFilter(ctx);
  
  return {
    imageUrl: canvasToBlobUrl(canvas),
    canvas,
  };
}

function processMiniWorld(
  img: HTMLImageElement,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  config: Record<string, any>
): ProcessingResult {
  ctx.drawImage(img, 0, 0);
  
  // Apply tilt-shift effect with saturation boost
  const saturation = config.saturation || 150;
  const blur = config.blur || 80;
  
  applyFilter(ctx, `saturate(${saturation}%) contrast(120%)`);
  ctx.drawImage(canvas, 0, 0);
  resetFilter(ctx);
  
  // Apply gradient blur (top and bottom)
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, `rgba(255, 255, 255, ${blur / 200})`);
  gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0)');
  gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0)');
  gradient.addColorStop(1, `rgba(255, 255, 255, ${blur / 200})`);
  
  ctx.globalCompositeOperation = 'overlay';
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = 'source-over';
  
  if (config.vignette) {
    applyVignette(ctx, canvas.width, canvas.height, 0.4);
  }
  
  return {
    imageUrl: canvasToBlobUrl(canvas),
    canvas,
  };
}

function processRetouch(
  img: HTMLImageElement,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  config: Record<string, any>
): ProcessingResult {
  ctx.drawImage(img, 0, 0);
  
  const smoothing = config.smoothing || 30;
  const glow = config.glow || 20;
  
  // Apply smoothing and enhancement
  applyFilter(
    ctx,
    `blur(${smoothing / 30}px) brightness(${100 + glow / 5}%) contrast(${105}%) saturate(110%)`
  );
  ctx.globalAlpha = 0.7;
  ctx.drawImage(canvas, 0, 0);
  ctx.globalAlpha = 1;
  resetFilter(ctx);
  
  // Draw original on top with reduced opacity for detail preservation
  ctx.globalAlpha = 0.5;
  ctx.drawImage(img, 0, 0);
  ctx.globalAlpha = 1;
  
  return {
    imageUrl: canvasToBlobUrl(canvas),
    canvas,
  };
}

function processOutpainting(
  img: HTMLImageElement,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  config: Record<string, any>
): ProcessingResult {
  // Expand canvas
  const expandedCanvas = createCanvas(img.width * 1.5, img.height * 1.5);
  const expandedCtx = expandedCanvas.getContext('2d')!;
  
  // Fill with extended pattern
  expandedCtx.fillStyle = '#1f2937';
  expandedCtx.fillRect(0, 0, expandedCanvas.width, expandedCanvas.height);
  
  // Draw original image in center
  const offsetX = (expandedCanvas.width - img.width) / 2;
  const offsetY = (expandedCanvas.height - img.height) / 2;
  expandedCtx.drawImage(img, offsetX, offsetY);
  
  // Blur edges to blend
  expandedCtx.filter = 'blur(20px)';
  expandedCtx.globalAlpha = 0.5;
  expandedCtx.drawImage(img, offsetX - 50, offsetY - 50, img.width + 100, img.height + 100);
  expandedCtx.globalAlpha = 1;
  expandedCtx.filter = 'none';
  
  return {
    imageUrl: canvasToBlobUrl(expandedCanvas),
    canvas: expandedCanvas,
  };
}

function processMagicEraser(
  img: HTMLImageElement,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  config: Record<string, any>
): ProcessingResult {
  ctx.drawImage(img, 0, 0);
  
  // Simulate object removal by blurring and cloning nearby areas
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  // Apply blur to simulate inpainting
  applyFilter(ctx, 'blur(5px)');
  ctx.drawImage(canvas, 0, 0);
  resetFilter(ctx);
  
  return {
    imageUrl: canvasToBlobUrl(canvas),
    canvas,
  };
}

function processGenericEffect(
  img: HTMLImageElement,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  config: Record<string, any>
): ProcessingResult {
  ctx.drawImage(img, 0, 0);
  
  const intensity = config.intensity || 50;
  const enhancement = config.enhancement || 40;
  const colorIntensity = config.color || 100;
  
  applyFilter(
    ctx,
    `saturate(${colorIntensity}%) contrast(${100 + enhancement / 2}%) brightness(${100 + enhancement / 4}%)`
  );
  ctx.globalAlpha = intensity / 100;
  ctx.drawImage(canvas, 0, 0);
  ctx.globalAlpha = 1;
  resetFilter(ctx);
  
  return {
    imageUrl: canvasToBlobUrl(canvas),
    canvas,
  };
}
