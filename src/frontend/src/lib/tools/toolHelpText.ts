export const TOOL_HELP_TEXT: Record<string, string> = {
  'logo-maker': 'Create professional logos by selecting a style preset and customizing design elements. Start from a blank canvas and adjust complexity, colors, shapes, and typography. The tool uses local processing to generate logo compositions with your chosen parameters.',
  'mockup-creator': 'Place your designs on realistic device and product mockups. Upload your design image, select a device type, and adjust viewing angles and backgrounds. The tool composites your design onto mockup templates using canvas transformations.',
  'mini-world-generator': 'Transform photos into miniature world scenes with tilt-shift effects. Upload a photo and apply blur gradients, enhanced saturation, and focus areas to create a toy-like appearance. The effect simulates shallow depth of field.',
  'barbershop-stylist': 'Try different hairstyles and facial hair on portrait photos. Upload a face photo and select style presets to see variations. The tool applies image filters and overlays to simulate different hair styles.',
  'outpainting': 'Extend images beyond their original boundaries. Upload an image and the tool will expand the canvas, using edge detection and pattern filling to create extended areas that blend with the original.',
  'pov-hand-creator': 'Add first-person perspective hands to your scenes. Upload a background image or start blank, then composite hand overlays with adjustable positioning and perspective to create POV shots.',
  'background-removal': 'Remove or replace image backgrounds. Upload a photo and the tool detects edges to separate foreground from background. Choose to make transparent, replace with solid colors, gradients, or blur the background.',
  'ai-retouch': 'Enhance portraits with professional retouching. Upload a portrait and adjust skin smoothing, blemish removal, eye enhancement, and other beauty parameters. The tool applies local filters to improve photo quality.',
  'product-photographer': 'Create professional product photos with studio lighting effects. Upload product images and apply lighting adjustments, shadows, and backgrounds to simulate professional photography setups.',
  'sketch-pencil-art': 'Convert photos into pencil sketch and artistic drawings. Upload any photo and the tool applies edge detection, grayscale conversion, and texture overlays to create sketch-like effects.',
  'wedding-prewedding-editor': 'Enhance wedding and prewedding photos with romantic effects. Upload wedding photos and apply soft focus, color grading, and lighting adjustments for a dreamy, romantic aesthetic.',
  'id-photo-booth': 'Create compliant ID photos for official documents. Upload a portrait, and the tool crops, centers, and adjusts the image to meet standard ID photo requirements with proper background and sizing.',
  'architectural-design-visualizer': 'Visualize architectural designs and interior concepts. Upload sketches or photos and apply rendering effects, lighting, and material textures to create realistic architectural visualizations.',
  'maternity-photo-editor': 'Enhance maternity photography with beautiful effects. Upload maternity photos and apply soft lighting, glow effects, and color adjustments designed for pregnancy photography.',
  'big-head-caricature-generator': 'Create fun caricatures with exaggerated features. Upload a portrait and the tool applies distortion effects to enlarge the head and exaggerate facial features for a playful caricature look.',
  'infographic-poster-creator': 'Design engaging infographics and posters. Start from a blank canvas or upload elements, then arrange text, shapes, and graphics using preset layouts and color schemes.',
  'photo-restoration': 'Restore old and damaged photos. Upload aged or damaged photos and the tool applies noise reduction, scratch removal, color correction, and sharpening to improve photo quality.',
  'fashion-model-generator': 'Generate fashion model poses and clothing visualizations. Start from blank or upload fashion items, then composite them with model templates and adjust poses and styling.',
  'banner-design': 'Create eye-catching banners for web and social media. Start from a blank canvas and use preset layouts, add text, graphics, and backgrounds to design professional banners.',
  'baby-kids-photo-editor': 'Enhance photos of babies and children with playful effects. Upload kids photos and apply soft filters, color enhancements, and playful overlays designed for children photography.',
  'religious-event-photo-editor': 'Enhance photos from religious ceremonies and events. Upload event photos and apply respectful color grading, lighting adjustments, and effects suitable for religious occasions.',
  'graduation-photo-editor': 'Perfect graduation photos with professional touches. Upload graduation photos and apply enhancements like background cleanup, color correction, and formal portrait adjustments.',
  'age-transformation-filter': 'See how you look at different ages. Upload a portrait and the tool applies aging or de-aging effects by adjusting skin texture, wrinkles, and facial features.',
  'magic-eraser': 'Remove unwanted objects from photos seamlessly. Upload a photo, mark areas to remove, and the tool fills those areas using surrounding pixels and pattern matching for seamless removal.',
  'collage-maker': 'Create beautiful photo collages with multiple layouts. Upload multiple photos and arrange them using preset grid layouts, with adjustable spacing, borders, and backgrounds.',
  'filter-usia-age-filter': 'Apply age filters to see younger or older versions. Upload a portrait and select age ranges to see how you might look at different life stages using facial feature adjustments.',
};

export function getToolHelpText(toolId: string): string {
  return TOOL_HELP_TEXT[toolId] || 'This tool provides image processing capabilities using local browser-based operations.';
}
