export async function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    
    img.src = url;
  });
}

export function createCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

export function getCanvasBlob(canvas: HTMLCanvasElement, type = 'image/png', quality = 0.95): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create blob'));
        }
      },
      type,
      quality
    );
  });
}

export function canvasToBlobUrl(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL('image/png');
}

export function applyFilter(
  ctx: CanvasRenderingContext2D,
  filter: string
): void {
  ctx.filter = filter;
}

export function resetFilter(ctx: CanvasRenderingContext2D): void {
  ctx.filter = 'none';
}

export function drawImageCentered(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number
): void {
  const scale = Math.min(canvasWidth / img.width, canvasHeight / img.height);
  const x = (canvasWidth - img.width * scale) / 2;
  const y = (canvasHeight - img.height * scale) / 2;
  
  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}

export function applyGradient(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  color1: string,
  color2: string
): void {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

export function applyVignette(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  intensity: number = 0.5
): void {
  const gradient = ctx.createRadialGradient(
    width / 2,
    height / 2,
    0,
    width / 2,
    height / 2,
    Math.max(width, height) / 2
  );
  
  gradient.addColorStop(0, `rgba(0, 0, 0, 0)`);
  gradient.addColorStop(1, `rgba(0, 0, 0, ${intensity})`);
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

export function adjustBrightness(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  amount: number
): void {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, Math.max(0, data[i] + amount));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + amount));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + amount));
  }
  
  ctx.putImageData(imageData, 0, 0);
}

export function adjustSaturation(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  amount: number
): void {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const gray = 0.2989 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    data[i] = Math.min(255, Math.max(0, gray + (data[i] - gray) * amount));
    data[i + 1] = Math.min(255, Math.max(0, gray + (data[i + 1] - gray) * amount));
    data[i + 2] = Math.min(255, Math.max(0, gray + (data[i + 2] - gray) * amount));
  }
  
  ctx.putImageData(imageData, 0, 0);
}
