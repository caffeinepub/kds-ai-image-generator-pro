import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import AppShell from './components/layout/AppShell';
import DashboardPage from './pages/DashboardPage';
import ToolsCatalogPage from './pages/ToolsCatalogPage';
import MyProjectsPage from './pages/MyProjectsPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import LogoMakerPage from './pages/tools/LogoMakerPage';
import MockupCreatorPage from './pages/tools/MockupCreatorPage';
import MiniWorldGeneratorPage from './pages/tools/MiniWorldGeneratorPage';
import BarbershopStylistPage from './pages/tools/BarbershopStylistPage';
import OutpaintingPage from './pages/tools/OutpaintingPage';
import POVHandCreatorPage from './pages/tools/POVHandCreatorPage';
import BackgroundRemovalPage from './pages/tools/BackgroundRemovalPage';
import AIRetouchPage from './pages/tools/AIRetouchPage';
import ProductPhotographerPage from './pages/tools/ProductPhotographerPage';
import SketchPencilArtPage from './pages/tools/SketchPencilArtPage';
import WeddingPreweddingEditorPage from './pages/tools/WeddingPreweddingEditorPage';
import IDPhotoBoothPage from './pages/tools/IDPhotoBoothPage';
import ArchitecturalDesignVisualizerPage from './pages/tools/ArchitecturalDesignVisualizerPage';
import MaternityPhotoEditorPage from './pages/tools/MaternityPhotoEditorPage';
import BigHeadCaricatureGeneratorPage from './pages/tools/BigHeadCaricatureGeneratorPage';
import InfographicPosterCreatorPage from './pages/tools/InfographicPosterCreatorPage';
import PhotoRestorationPage from './pages/tools/PhotoRestorationPage';
import FashionModelGeneratorPage from './pages/tools/FashionModelGeneratorPage';
import BannerDesignPage from './pages/tools/BannerDesignPage';
import BabyKidsPhotoEditorPage from './pages/tools/BabyKidsPhotoEditorPage';
import ReligiousEventPhotoEditorPage from './pages/tools/ReligiousEventPhotoEditorPage';
import GraduationPhotoEditorPage from './pages/tools/GraduationPhotoEditorPage';
import AgeTransformationFilterPage from './pages/tools/AgeTransformationFilterPage';
import MagicEraserPage from './pages/tools/MagicEraserPage';
import CollageMakerPage from './pages/tools/CollageMakerPage';
import FilterUsiaAgeFilterPage from './pages/tools/FilterUsiaAgeFilterPage';
import { Toaster } from './components/ui/sonner';

const rootRoute = createRootRoute({
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DashboardPage,
});

const toolsCatalogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools',
  component: ToolsCatalogPage,
});

const myProjectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/my-projects',
  component: MyProjectsPage,
});

const projectDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/my-projects/$projectId',
  component: ProjectDetailsPage,
});

const logoMakerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/logo-maker',
  component: LogoMakerPage,
});

const mockupCreatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/mockup-creator',
  component: MockupCreatorPage,
});

const miniWorldGeneratorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/mini-world-generator',
  component: MiniWorldGeneratorPage,
});

const barbershopStylistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/barbershop-stylist',
  component: BarbershopStylistPage,
});

const outpaintingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/outpainting',
  component: OutpaintingPage,
});

const povHandCreatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/pov-hand-creator',
  component: POVHandCreatorPage,
});

const backgroundRemovalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/background-removal',
  component: BackgroundRemovalPage,
});

const aiRetouchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/ai-retouch',
  component: AIRetouchPage,
});

const productPhotographerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/product-photographer',
  component: ProductPhotographerPage,
});

const sketchPencilArtRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/sketch-pencil-art',
  component: SketchPencilArtPage,
});

const weddingPreweddingEditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/wedding-prewedding-editor',
  component: WeddingPreweddingEditorPage,
});

const idPhotoBoothRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/id-photo-booth',
  component: IDPhotoBoothPage,
});

const architecturalDesignVisualizerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/architectural-design-visualizer',
  component: ArchitecturalDesignVisualizerPage,
});

const maternityPhotoEditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/maternity-photo-editor',
  component: MaternityPhotoEditorPage,
});

const bigHeadCaricatureGeneratorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/big-head-caricature-generator',
  component: BigHeadCaricatureGeneratorPage,
});

const infographicPosterCreatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/infographic-poster-creator',
  component: InfographicPosterCreatorPage,
});

const photoRestorationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/photo-restoration',
  component: PhotoRestorationPage,
});

const fashionModelGeneratorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/fashion-model-generator',
  component: FashionModelGeneratorPage,
});

const bannerDesignRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/banner-design',
  component: BannerDesignPage,
});

const babyKidsPhotoEditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/baby-kids-photo-editor',
  component: BabyKidsPhotoEditorPage,
});

const religiousEventPhotoEditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/religious-event-photo-editor',
  component: ReligiousEventPhotoEditorPage,
});

const graduationPhotoEditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/graduation-photo-editor',
  component: GraduationPhotoEditorPage,
});

const ageTransformationFilterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/age-transformation-filter',
  component: AgeTransformationFilterPage,
});

const magicEraserRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/magic-eraser',
  component: MagicEraserPage,
});

const collageMakerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/collage-maker',
  component: CollageMakerPage,
});

const filterUsiaAgeFilterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/filter-usia-age-filter',
  component: FilterUsiaAgeFilterPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  toolsCatalogRoute,
  myProjectsRoute,
  projectDetailsRoute,
  logoMakerRoute,
  mockupCreatorRoute,
  miniWorldGeneratorRoute,
  barbershopStylistRoute,
  outpaintingRoute,
  povHandCreatorRoute,
  backgroundRemovalRoute,
  aiRetouchRoute,
  productPhotographerRoute,
  sketchPencilArtRoute,
  weddingPreweddingEditorRoute,
  idPhotoBoothRoute,
  architecturalDesignVisualizerRoute,
  maternityPhotoEditorRoute,
  bigHeadCaricatureGeneratorRoute,
  infographicPosterCreatorRoute,
  photoRestorationRoute,
  fashionModelGeneratorRoute,
  bannerDesignRoute,
  babyKidsPhotoEditorRoute,
  religiousEventPhotoEditorRoute,
  graduationPhotoEditorRoute,
  ageTransformationFilterRoute,
  magicEraserRoute,
  collageMakerRoute,
  filterUsiaAgeFilterRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
