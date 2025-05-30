
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { communities } from '@/data/communitySampleData';

const BrowseCommunitiesTab = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-900">
      <div className="p-4 space-y-4">
        {communities.map((community, index) => (
          <Card 
            key={community.id} 
            className="animate-slide-up cursor-pointer hover:shadow-lg transition-all"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => navigate(`/communities/${community.id}`)}
          >
            <CardContent className="p-0">
              {/* Banner Image */}
              {community.bannerImage && (
                <div className="h-32 w-full overflow-hidden rounded-t-lg">
                  <img 
                    src={community.bannerImage} 
                    alt={community.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Community Info */}
              <div className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{community.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                      {community.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-3">
                      {community.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {community.memberCount.toLocaleString()} members
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-unicampus-red text-unicampus-red hover:bg-unicampus-red hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle join community action
                        }}
                      >
                        Join
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BrowseCommunitiesTab;
