
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const StartingScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-unicampus-red via-unicampus-red-light to-unicampus-red-dark flex flex-col items-center justify-center p-4 text-white">
      <div className="text-center animate-fade-in">
        <div className="mb-8">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <span className="text-unicampus-red text-4xl font-bold">UC</span>
          </div>
        </div>
        
        <h1 className="text-5xl font-bold mb-4 tracking-tight">UniCampus</h1>
        <p className="text-xl mb-12 text-white/90 max-w-md mx-auto">
          Your Digital Campus Companion
        </p>
        
        <div className="space-y-4 w-full max-w-sm mx-auto">
          <Button
            onClick={() => navigate('/login/student')}
            className="w-full bg-white text-unicampus-red hover:bg-gray-100 py-6 text-lg font-semibold shadow-lg"
          >
            Student Login
          </Button>
          
          <Button
            onClick={() => navigate('/login/admin')}
            variant="outline"
            className="w-full border-white text-white hover:bg-white hover:text-unicampus-red py-6 text-lg font-semibold"
          >
            Admin Login
          </Button>
          
          <Button
            onClick={() => navigate('/register')}
            variant="ghost"
            className="w-full text-white hover:bg-white/10 py-6 text-lg"
          >
            Register
          </Button>
        </div>
        
        <footer className="mt-16 text-white/70 text-sm">
          © {new Date().getFullYear()} UniCampus
        </footer>
      </div>
    </div>
  );
};

export default StartingScreen;
