// src/components/communities/CreatePostScreen.tsx
import React, { useState, useEffect } from 'react';
import { X, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
// Remove mock data import: import { communities, userFollowedCommunityIds } from '@/data/communitySampleData';
import apiClient, { PaginatedResponse } from '@/lib/apiClient'; // Import apiClient
import { toast } from '@/hooks/use-toast'; // Assuming you use a toast hook
import { useAuth } from '@/contexts/AuthContext'; // To ensure user is authenticated

// Define Community type based on your API
interface Community {
  id: string; // or _id
  name: string;
  slug?: string;
  icon?: string; // Or however you represent icons
  // Add other fields like description, member_count etc.
  is_member?: boolean; // If your API provides this
}

interface CreatePostScreenProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCommunityId?: string;
  onPostCreated?: (newPost: any) => void; // Callback after successful post creation
}

// Define Post type (or import if defined elsewhere)
interface PostData {
    title: string;
    content_type: 'text' | 'image' | 'link'; // Match your API
    content_text?: string;
    image_url?: string; // If you handle image uploads separately and get a URL
    link_url?: string;
    tags?: string[];
}

const CreatePostScreen = ({ 
    isOpen, 
    onClose, 
    preselectedCommunityId,
    onPostCreated 
}: CreatePostScreenProps) => {
  const { isAuthenticated } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState(preselectedCommunityId || '');
  // const [image, setImage] = useState<string | null>(null); // Image handling needs more thought (upload first or base64?)
  const [imageFile, setImageFile] = useState<File | null>(null);


  const [availableCommunities, setAvailableCommunities] = useState<Community[]>([]);
  const [isLoadingCommunities, setIsLoadingCommunities] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch communities when component might become visible or when needed
  useEffect(() => {
    if (isOpen && isAuthenticated && !preselectedCommunityId) { // Only fetch if selector is needed
      const fetchCommunities = async () => {
        setIsLoadingCommunities(true);
        try {
          // Assuming your list communities endpoint is paginated but we fetch a reasonable limit for a dropdown
          const response = await apiClient<PaginatedResponse<Community>>('/communities?limit=100');
          if (response.status === 'success' && response.data) {
            // TODO: Potentially sort them by userFollowedCommunityIds if API doesn't do it
            setAvailableCommunities(response.data);
          }
        } catch (error) {
          console.error("Failed to fetch communities:", error);
          toast({ title: "Error", description: "Could not load communities.", variant: "destructive" });
        } finally {
          setIsLoadingCommunities(false);
        }
      };
      fetchCommunities();
    }
  }, [isOpen, isAuthenticated, preselectedCommunityId]);

  useEffect(() => {
    if (preselectedCommunityId) {
      setSelectedCommunity(preselectedCommunityId);
      // If you want to show the preselected community name, you might need to fetch its details
      // or ensure it's part of `availableCommunities` if that list is always fetched.
    } else {
        setSelectedCommunity(''); // Clear if no preselection
    }
  }, [preselectedCommunityId, isOpen]); // Reset if dialog reopens or preselection changes


  const preselectedCommunityDetails = availableCommunities.find(c => c.id === preselectedCommunityId) || 
                                    (preselectedCommunityId ? {id: preselectedCommunityId, name: "Selected Community"} : null) ; // Fallback name

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !selectedCommunity) {
      toast({ title: "Validation Error", description: "Please fill in all required fields.", variant: "destructive"});
      return;
    }
    if (!isAuthenticated) {
        toast({ title: "Authentication Error", description: "Please log in to create a post.", variant: "destructive"});
        return;
    }

    setIsSubmitting(true);

    const postData: PostData = {
      title: title.trim(),
      content_type: "text", // Defaulting to text, can be enhanced for image/link
      content_text: content.trim(),
      // tags: ["some", "tags"] // Add tag input if needed
    };

    // TODO: Image Upload Logic
    // If imageFile exists, you'd typically upload it first to get a URL, then include that URL in postData.
    // This requires a separate endpoint for image uploads (e.g., to your Node.js service).
    // For now, we're not including image_url.

    try {
      const response = await apiClient<any>( // Define a proper type for the created post response
        `/communities/${selectedCommunity}/posts`,
        {
          method: 'POST',
          data: postData,
        }
      );
      
      // Assuming API returns the created post object directly in response or response.data
      const createdPost = response.data?.post || response.data || response; 
      
      toast({ title: "Success", description: `Post created in ${preselectedCommunityDetails?.name || 'selected community'}!` });
      
      if (onPostCreated && createdPost) {
        onPostCreated(createdPost);
      }

      // Reset form
      setTitle('');
      setContent('');
      setImageFile(null);
      if (!preselectedCommunityId) { // Don't reset if it was preselected
        setSelectedCommunity('');
      }
      onClose();
    } catch (error: any) {
      console.error("Failed to create post:", error);
      toast({ 
        title: "Error Creating Post", 
        description: error.message || "An unexpected error occurred.", 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
      // Optionally show a preview
    }
  };

  const isFormValid = title.trim() && content.trim() && selectedCommunity;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              {preselectedCommunityId ? `New Post in ${preselectedCommunityDetails?.name}` : 'Create New Post'}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Community Selector */}
          {!preselectedCommunityId && (
            <div className="space-y-2">
              <Label htmlFor="community" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Community *
              </Label>
              <Select value={selectedCommunity} onValueChange={setSelectedCommunity} disabled={isLoadingCommunities}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={isLoadingCommunities ? "Loading communities..." : "Select a community"} />
                </SelectTrigger>
                <SelectContent>
                  {availableCommunities.map((community) => (
                    <SelectItem key={community.id} value={community.id}>
                      <div className="flex items-center space-x-2">
                        {community.icon && <span className="text-lg">{community.icon}</span>}
                        <span>{community.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                   {availableCommunities.length === 0 && !isLoadingCommunities && (
                     <div className="px-2 py-1.5 text-sm text-gray-500 dark:text-gray-400">No communities found or could not load.</div>
                   )}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Show selected community when preselected */}
          {preselectedCommunityId && preselectedCommunityDetails && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Posting to
              </Label>
              <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                {preselectedCommunityDetails.icon && <span className="text-lg">{preselectedCommunityDetails.icon}</span>}
                <span className="font-medium text-gray-900 dark:text-white">{preselectedCommunityDetails.name}</span>
              </div>
            </div>
          )}

          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Title *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              className="w-full"
            />
          </div>

          {/* Content Input */}
          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Content *
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full min-h-[120px] resize-none"
              rows={5}
            />
          </div>

          {/* Add Image Input */}
          <div className="space-y-2">
             <Label htmlFor="imageFile" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Attach Image (Optional)
            </Label>
            <Input
              id="imageFile"
              type="file"
              accept="image/*"
              onChange={handleImageInputChange}
              className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-unicampus-red/10 file:text-unicampus-red hover:file:bg-unicampus-red/20"
            />
            {imageFile && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Selected: {imageFile.name}</p>}
          </div>


          {/* Submit Button */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="px-6"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
              className="px-6 bg-unicampus-red hover:bg-unicampus-red-dark text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Posting..." : "Post"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostScreen;