
import React, { useState } from 'react';
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
import { communities, userFollowedCommunityIds } from '@/data/communitySampleData';

interface CreatePostScreenProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCommunityId?: string;
}

const CreatePostScreen = ({ isOpen, onClose, preselectedCommunityId }: CreatePostScreenProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState(preselectedCommunityId || '');
  const [image, setImage] = useState<string | null>(null);

  // Sort communities - followed first, then others
  const followedCommunities = communities.filter(c => userFollowedCommunityIds.includes(c.id));
  const otherCommunities = communities.filter(c => !userFollowedCommunityIds.includes(c.id));
  const sortedCommunities = [...followedCommunities, ...otherCommunities];

  const preselectedCommunity = communities.find(c => c.id === preselectedCommunityId);
  const isPreselected = !!preselectedCommunityId;

  const handleSubmit = () => {
    if (!title.trim() || !content.trim() || !selectedCommunity) {
      alert('Please fill in all required fields');
      return;
    }

    const selectedCommunityName = communities.find(c => c.id === selectedCommunity)?.name;
    alert(`Post submitted to ${selectedCommunityName}!`);
    
    // Reset form
    setTitle('');
    setContent('');
    if (!isPreselected) {
      setSelectedCommunity('');
    }
    setImage(null);
    onClose();
  };

  const handleImageAttach = () => {
    // Placeholder for image picker
    alert('Image picker feature coming soon!');
  };

  const isFormValid = title.trim() && content.trim() && selectedCommunity;

  // Reset selectedCommunity when preselectedCommunityId changes
  React.useEffect(() => {
    if (preselectedCommunityId) {
      setSelectedCommunity(preselectedCommunityId);
    }
  }, [preselectedCommunityId]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              {isPreselected ? `New Post in ${preselectedCommunity?.name}` : 'Create New Post'}
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

        <div className="space-y-4">
          {/* Community Selector */}
          {!isPreselected && (
            <div className="space-y-2">
              <Label htmlFor="community" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Community *
              </Label>
              <Select value={selectedCommunity} onValueChange={setSelectedCommunity}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a community" />
                </SelectTrigger>
                <SelectContent>
                  {followedCommunities.length > 0 && (
                    <>
                      <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Following
                      </div>
                      {followedCommunities.map((community) => (
                        <SelectItem key={community.id} value={community.id}>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{community.icon}</span>
                            <span>{community.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </>
                  )}
                  {otherCommunities.length > 0 && (
                    <>
                      <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Other Communities
                      </div>
                      {otherCommunities.map((community) => (
                        <SelectItem key={community.id} value={community.id}>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{community.icon}</span>
                            <span>{community.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Show selected community when preselected */}
          {isPreselected && preselectedCommunity && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Posting to
              </Label>
              <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                <span className="text-lg">{preselectedCommunity.icon}</span>
                <span className="font-medium text-gray-900 dark:text-white">{preselectedCommunity.name}</span>
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

          {/* Add Image Button */}
          <div className="space-y-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleImageAttach}
              className="w-full justify-start text-gray-600 dark:text-gray-400 border-dashed"
            >
              <Camera className="h-4 w-4 mr-2" />
              Attach Image (Optional)
            </Button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="px-6 bg-unicampus-red hover:bg-unicampus-red-dark text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostScreen;
