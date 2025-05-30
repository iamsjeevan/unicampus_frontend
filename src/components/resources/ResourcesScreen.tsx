
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import BottomNavigation from '@/components/layout/BottomNavigation';

const ResourcesScreen = () => {
  const [selectedSemester, setSelectedSemester] = useState('6');

  const resources = [
    {
      id: 1,
      title: 'Data Structures and Algorithms - Complete Notes',
      type: 'PDF',
      uploadedBy: 'Dr. Priya Sharma',
      date: '2024-05-15',
      size: '2.4 MB',
      semester: '6',
      category: 'notes'
    },
    {
      id: 2,
      title: 'Database Management Systems - PYQ Solutions',
      type: 'PDF',
      uploadedBy: 'Prof. Raj Kumar',
      date: '2024-05-12',
      size: '1.8 MB',
      semester: '6',
      category: 'pyqs'
    },
    {
      id: 3,
      title: 'Computer Networks Textbook',
      type: 'PDF',
      uploadedBy: 'Library',
      date: '2024-05-10',
      size: '15.2 MB',
      semester: '6',
      category: 'textbooks'
    },
    {
      id: 4,
      title: 'Software Engineering Syllabus 2024',
      type: 'PDF',
      uploadedBy: 'Academic Office',
      date: '2024-05-08',
      size: '500 KB',
      semester: '6',
      category: 'syllabus'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'PDF': return '📄';
      case 'DOC': return '📝';
      case 'LINK': return '🔗';
      default: return '📎';
    }
  };

  const filteredResources = (category: string) => 
    resources.filter(resource => 
      resource.category === category && resource.semester === selectedSemester
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Resources</h1>
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Sem 1</SelectItem>
              <SelectItem value="2">Sem 2</SelectItem>
              <SelectItem value="3">Sem 3</SelectItem>
              <SelectItem value="4">Sem 4</SelectItem>
              <SelectItem value="5">Sem 5</SelectItem>
              <SelectItem value="6">Sem 6</SelectItem>
              <SelectItem value="7">Sem 7</SelectItem>
              <SelectItem value="8">Sem 8</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="notes" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="notes" className="text-xs data-[state=active]:bg-unicampus-red data-[state=active]:text-white">
              Notes
            </TabsTrigger>
            <TabsTrigger value="pyqs" className="text-xs data-[state=active]:bg-unicampus-red data-[state=active]:text-white">
              PYQs
            </TabsTrigger>
            <TabsTrigger value="textbooks" className="text-xs data-[state=active]:bg-unicampus-red data-[state=active]:text-white">
              Books
            </TabsTrigger>
            <TabsTrigger value="syllabus" className="text-xs data-[state=active]:bg-unicampus-red data-[state=active]:text-white">
              Syllabus
            </TabsTrigger>
          </TabsList>

          {['notes', 'pyqs', 'textbooks', 'syllabus'].map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
              {filteredResources(category).length > 0 ? (
                filteredResources(category).map((resource, index) => (
                  <Card key={resource.id} className="animate-slide-up cursor-pointer hover:shadow-lg transition-all" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl text-unicampus-red">
                          {getIcon(resource.type)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white">{resource.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Uploaded by {resource.uploadedBy}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">{resource.date}</span>
                            <Badge variant="outline" className="text-xs">
                              {resource.size}
                            </Badge>
                            <Badge className="bg-unicampus-red/10 text-unicampus-red border-unicampus-red/20 text-xs">
                              Sem {resource.semester}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-unicampus-red text-xl">⬇️</div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="text-4xl mb-4">📚</div>
                    <p className="text-gray-600 dark:text-gray-400">
                      No {category} available for Semester {selectedSemester}
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Add Resource Button */}
        <div className="fixed bottom-24 right-4">
          <Button className="w-14 h-14 rounded-full bg-unicampus-red hover:bg-unicampus-red-dark shadow-lg">
            <span className="text-xl">+</span>
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ResourcesScreen;
