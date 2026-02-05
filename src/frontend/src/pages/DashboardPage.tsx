import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { TOOLS, TOOL_CATEGORIES } from '../lib/tools/toolRegistry';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useListProjects } from '../hooks/useQueries';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const { identity } = useInternetIdentity();
  const { data: projects } = useListProjects();
  const navigate = useNavigate();

  const recentProjects = projects?.slice(0, 3) || [];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section 
        className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-accent/20 to-accent/5 p-8 md:p-12"
        style={{
          backgroundImage: 'url(/assets/generated/kdsai-hero-bg.dim_1600x600.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to KDS AI Image Generator Pro
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Professional image creation and editing tools powered by advanced local processing. 
            Create stunning visuals without leaving your browser.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/tools">
              <Button size="lg" className="gap-2">
                Explore Tools
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            {identity && (
              <Link to="/my-projects">
                <Button size="lg" variant="outline">
                  My Projects
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      {identity && recentProjects.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Recent Projects</h2>
            <Link to="/my-projects">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentProjects.map((project) => (
              <Card 
                key={project.id}
                className="hover:border-accent transition-colors cursor-pointer"
                onClick={() => navigate({ to: '/my-projects/$projectId', params: { projectId: project.id } })}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{project.projectName}</CardTitle>
                  <CardDescription>{project.toolType}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {new Date(Number(project.updatedAt) / 1000000).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Tool Categories */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Tool Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOL_CATEGORIES.map((category) => {
            const categoryTools = TOOLS.filter((t) => t.category === category);
            return (
              <Card key={category} className="hover:border-accent transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-accent" />
                    {category}
                  </CardTitle>
                  <CardDescription>{categoryTools.length} tools available</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {categoryTools.slice(0, 3).map((tool) => (
                      <li key={tool.id}>
                        <Link to={tool.path}>
                          <Button variant="ghost" size="sm" className="w-full justify-start">
                            {tool.name}
                          </Button>
                        </Link>
                      </li>
                    ))}
                    {categoryTools.length > 3 && (
                      <li className="text-sm text-muted-foreground pl-3">
                        +{categoryTools.length - 3} more
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
