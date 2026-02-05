import { useParams, useNavigate, Link } from '@tanstack/react-router';
import { useGetProject, useDeleteProject, useUpdateProjectText } from '../hooks/useQueries';
import AuthGate from '../components/auth/AuthGate';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Loader2, Trash2, ArrowLeft, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { getToolById } from '../lib/tools/toolRegistry';
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

export default function ProjectDetailsPage() {
  const { projectId } = useParams({ from: '/my-projects/$projectId' });
  const navigate = useNavigate();
  const { data: project, isLoading } = useGetProject(projectId);
  const deleteProject = useDeleteProject();
  const updateProject = useUpdateProjectText();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');

  const handleDelete = async () => {
    try {
      await deleteProject.mutateAsync(projectId);
      toast.success('Project deleted successfully');
      navigate({ to: '/my-projects' });
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete project');
    }
  };

  const handleSaveEdit = async () => {
    if (!project || !editedName.trim()) return;
    
    try {
      await updateProject.mutateAsync({
        projectId,
        newProjectName: editedName.trim(),
        newConfiguration: project.configuration,
      });
      toast.success('Project name updated');
      setIsEditing(false);
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update project');
    }
  };

  const startEditing = () => {
    if (project) {
      setEditedName(project.projectName);
      setIsEditing(true);
    }
  };

  if (isLoading) {
    return (
      <AuthGate>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AuthGate>
    );
  }

  if (!project) {
    return (
      <AuthGate>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Project not found</p>
          <Link to="/my-projects">
            <Button variant="outline" className="mt-4">
              Back to Projects
            </Button>
          </Link>
        </div>
      </AuthGate>
    );
  }

  const tool = getToolById(project.toolType);
  const config = JSON.parse(project.configuration);

  return (
    <AuthGate>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate({ to: '/my-projects' })}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            {isEditing ? (
              <div className="flex gap-2 items-center">
                <Input
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="max-w-md"
                />
                <Button onClick={handleSaveEdit} disabled={updateProject.isPending}>
                  Save
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">{project.projectName}</h1>
                <Button variant="ghost" size="sm" onClick={startEditing}>
                  Edit
                </Button>
              </div>
            )}
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
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
                <AlertDialogAction onClick={handleDelete} disabled={deleteProject.isPending}>
                  {deleteProject.isPending ? 'Deleting...' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-muted-foreground">Tool</Label>
                <p className="font-medium">{tool?.name || project.toolType}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Preset</Label>
                <p className="font-medium">{project.preset}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Created</Label>
                <p className="font-medium">
                  {new Date(Number(project.createdAt) / 1000000).toLocaleString()}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Last Updated</Label>
                <p className="font-medium">
                  {new Date(Number(project.updatedAt) / 1000000).toLocaleString()}
                </p>
              </div>
              {tool && (
                <Link to={tool.path}>
                  <Button variant="outline" className="w-full gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Open in {tool.name}
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
              <CardDescription>Settings used for this project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {Object.entries(config).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{key}:</span>
                    <span className="font-medium">{String(value)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {project.inputAssets.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Input Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {project.inputAssets.map((asset, idx) => (
                  <div key={idx} className="text-sm">
                    <span className="font-medium">{asset.assetId}</span>
                    <span className="text-muted-foreground"> - {asset.description}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {project.outputAssets.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Output Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {project.outputAssets.map((asset, idx) => (
                  <div key={idx} className="text-sm">
                    <span className="font-medium">{asset.assetId}</span>
                    <span className="text-muted-foreground"> - {asset.description}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AuthGate>
  );
}
