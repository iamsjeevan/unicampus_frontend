
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import BottomNavigation from '@/components/layout/BottomNavigation';

const ResultsScreen = () => {
  const cieData = [
    { subject: '22AL61', marks: 27, total: 30, name: 'Management & Entrepreneurship' },
    { subject: '22CS62', marks: 17, total: 30, name: 'Cloud Computing and Big Data' },
    { subject: '22CSE635', marks: 17, total: 30, name: 'Block Chain and Distributed App Development' },
    { subject: '22CSE641', marks: 29, total: 30, name: 'Introduction to DevSecOps' },
    { subject: '22ECOE01', marks: 21, total: 30, name: 'Image Processing with Python' },
  ];

  const seeData = [
    { semester: 'Sem - 1', gpa: 7.55 },
    { semester: 'Sem - 2', gpa: 8.55 },
    { semester: 'Sem - 3', gpa: 8.04 },
    { semester: 'Sem - 4', gpa: 7.65 },
    { semester: 'Sem - 5', gpa: 7.31 },
  ];

  const chartData = cieData.map(item => ({
    subject: item.subject,
    marks: item.marks,
    total: item.total
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Results</h1>
      </div>

      <div className="p-4">
        <Tabs defaultValue="cie" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="cie" className="data-[state=active]:bg-unicampus-red data-[state=active]:text-white">
              CIE
            </TabsTrigger>
            <TabsTrigger value="see" className="data-[state=active]:bg-unicampus-red data-[state=active]:text-white">
              SEE
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cie" className="space-y-6">
            {/* CIE Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Subject-wise CIE Marks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" angle={-45} textAnchor="end" height={80} />
                      <YAxis domain={[0, 30]} />
                      <Bar dataKey="marks" fill="#FF3B30" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* CIE Results List */}
            <div className="space-y-3">
              {cieData.map((item, index) => (
                <Card key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">({item.subject})</p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-unicampus-red">{item.marks}/{item.total}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="see" className="space-y-6">
            {/* CGPA Display */}
            <Card>
              <CardContent className="p-6 text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">CGPA - 7.81</h2>
                <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div 
                    className="h-1 bg-gradient-to-r from-unicampus-red to-unicampus-red-light rounded-full transition-all duration-1000"
                    style={{ width: '78.1%' }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            {/* Semester-wise Results */}
            <div className="space-y-3">
              {seeData.map((item, index) => (
                <Card key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-900 dark:text-white">{item.semester}</h3>
                      <span className="text-lg font-bold text-unicampus-red">{item.gpa}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ResultsScreen;
