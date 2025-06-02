// src/components/resources/CreateResourceScreen.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, UploadCloud } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import apiClient from '@/lib/apiClient';
import { toast } from '@/hooks/use-toast';

// Constants (can be moved to a shared file if used elsewhere)
const SEMESTERS = ['1', '2', '3', '4', '5', '6', '7', '8'];
const CATEGORIES = [
    { value: 'notes', label: 'Notes' },
    { value: 'pyqs', label: 'PYQs / Question Papers' },
    { value: 'textbooks', label: 'Textbooks / Reference Books' },
    { value: 'syllabus', label: 'Syllabus' },
    { value: 'lab', label: 'Lab Manuals / Records' },
    { value: 'assignments', label: 'Assignments' },
    { value: 'other', label: 'Other' },
];
const RESOURCE_TYPES = [
    { value: 'file', label: 'Upload File' },
    { value: 'link', label: 'Share Link' },
];

interface ResourceFormData {
  title: string;
  description: string;
  resource_type: 'file' | 'link';
  category: string;
  semester_tag: string;
  tags: string; // Comma-separated string for input, will be converted to array
  link_url: string;
  resourceFile: File | null;
}

const CreateResourceScreen = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth(); // Needed for API calls if apiClient doesn't grab it automatically for FormData
  const [formData, setFormData] = useState<ResourceFormData>({
    title: '',
    description: '',
    resource_type: 'file',
    category: CATEGORIES[0].value,
    semester_tag: SEMESTERS[0],
    tags: '',
    link_url: '',
    resourceFile: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof ResourceFormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resourceFile: e.target.files![0] }));
    } else {
      setFormData(prev => ({ ...prev, resourceFile: null }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) {
        toast({ title: "Authentication Error", description: "You must be logged in to create a resource.", variant: "destructive" });
        return;
    }

    // Basic Validation
    if (!formData.title.trim()) {
      toast({ title: "Validation Error", description: "Title is required.", variant: "destructive" });
      return;
    }
    if (formData.resource_type === 'link' && !formData.link_url.trim()) {
      toast({ title: "Validation Error", description: "Link URL is required for link type.", variant: "destructive" });
      return;
    }
    if (formData.resource_type === 'file' && !formData.resourceFile) {
      toast({ title: "Validation Error", description: "File is required for file type.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    const dataToSubmit = new FormData();
    dataToSubmit.append('title', formData.title.trim());
    dataToSubmit.append('description', formData.description.trim());
    dataToSubmit.append('resource_type', formData.resource_type);
    dataToSubmit.append('category', formData.category);
    dataToSubmit.append('semester_tag', formData.semester_tag);
    if (formData.tags.trim()) {
        dataToSubmit.append('tags', formData.tags.trim()); // API expects comma-separated string
    }

    if (formData.resource_type === 'link') {
      dataToSubmit.append('link_url', formData.link_url.trim());
    } else if (formData.resource_type === 'file' && formData.resourceFile) {
      dataToSubmit.append('resourceFile', formData.resourceFile);
    }

    try {
      // apiClient handles Authorization header for FormData if configured correctly
      // For FormData, Content-Type is set by the browser automatically
      const response = await apiClient<any>('/resources', { // Define specific success response type if known
        method: 'POST',
        data: dataToSubmit,
        // No need to set Content-Type for FormData; browser does it with boundary
      });

      toast({
        title: "Resource Created!",
        description: `${formData.title} has been successfully added.`,
      });
      navigate('/resources'); // Navigate back to resources list
    } catch (error: any) {
      console.error("Failed to create resource:", error);
      toast({
        title: "Error Creating Resource",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Resources
        </Button>

        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Add New Resource</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title" className="font-medium text-gray-700 dark:text-gray-300">Title *</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleChange} required className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>

              <div>
                <Label htmlFor="description" className="font-medium text-gray-700 dark:text-gray-300">Description (Optional)</Label>
                <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={3} className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="resource_type" className="font-medium text-gray-700 dark:text-gray-300">Resource Type *</Label>
                  <Select name="resource_type" value={formData.resource_type} onValueChange={(value) => handleSelectChange('resource_type', value)}>
                    <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:text-white">
                      {RESOURCE_TYPES.map(type => <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category" className="font-medium text-gray-700 dark:text-gray-300">Category *</Label>
                  <Select name="category" value={formData.category} onValueChange={(value) => handleSelectChange('category', value)}>
                    <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:text-white">
                      {CATEGORIES.map(cat => <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {formData.resource_type === 'link' && (
                <div>
                  <Label htmlFor="link_url" className="font-medium text-gray-700 dark:text-gray-300">Link URL *</Label>
                  <Input id="link_url" name="link_url" type="url" value={formData.link_url} onChange={handleChange} placeholder="https://example.com/resource" required={formData.resource_type === 'link'} className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
              )}

              {formData.resource_type === 'file' && (
                <div>
                  <Label htmlFor="resourceFile" className="font-medium text-gray-700 dark:text-gray-300">Upload File *</Label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600 dark:text-gray-400">
                        <label htmlFor="resourceFile_input" className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-unicampus-red hover:text-unicampus-red-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-unicampus-red">
                          <span>Upload a file</span>
                          <input id="resourceFile_input" name="resourceFile_input" type="file" className="sr-only" onChange={handleFileChange} required={formData.resource_type === 'file'} />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-500">PDF, DOCX, PNG, JPG, etc. (Max 10MB)</p>
                      {formData.resourceFile && <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">Selected: {formData.resourceFile.name}</p>}
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div>
                  <Label htmlFor="semester_tag" className="font-medium text-gray-700 dark:text-gray-300">Semester Tag *</Label>
                  <Select name="semester_tag" value={formData.semester_tag} onValueChange={(value) => handleSelectChange('semester_tag', value)}>
                    <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:text-white">
                      {SEMESTERS.map(sem => <SelectItem key={sem} value={sem}>Sem {sem}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tags" className="font-medium text-gray-700 dark:text-gray-300">Tags (comma-separated, optional)</Label>
                  <Input id="tags" name="tags" value={formData.tags} onChange={handleChange} placeholder="e.g., important, module1, unit2" className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
              </div>

              <div className="pt-2">
                <Button type="submit" className="w-full bg-unicampus-red hover:bg-unicampus-red-dark text-white" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Add Resource'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateResourceScreen;