import { useNavigate } from '@tanstack/react-router';
import { useListProjects, useDeleteProject } from '../hooks/useQueries';
import AuthGate from '../components/auth/AuthGate';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Loader2, Trash2, ExternalLink, FolderOpen } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/alert-dialog';

export default function MyProjectsPage() {
  const { data: projects, isLoading } = useListProjects();
  const deleteProject = useDeleteProject();
  const navigate = useNavigate();

  const handleDelete = async (projectId: string, projectName: string) => {
    try {
      await deleteProject.mutateAsync(projectId);
      toast.success(`"${projectName}" deleted successfully`);
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete project');
    }
  };

  return (
    <AuthGate>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Projects</h1>
          <p className="text-muted-foreground">
            Manage your saved tool configurations and outputs
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{project.projectName}</CardTitle>
                  <CardDescription>
                    {project.toolType} • {project.preset}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Updated: {new Date(Number(project.updatedAt) / 1000000).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 gap-2"
                      onClick={() => navigate({ to: '/my-projects/$projectId', params: { projectId: project.id } })}
                    >
                      <ExternalLink className="h-4 w-4" />
                      View
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Project</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{project.projectName}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(project.id, project.projectName)}
                            disabled={deleteProject.isPending}
                          >
                            {deleteProject.isPending ? 'Deleting...' : 'Delete'}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <FolderOpen className="h-16 w-16 text-muted-foreground" />
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
              <p className="text-muted-foreground mb-4">
                Start creating with our tools and save your work here
              </p>
              <Button onClick={() => navigate({ to: '/tools' })}>
                Explore Tools
              </Button>
            </div>
          </div>
        )}
      </div>
    </AuthGate>
  );
}
