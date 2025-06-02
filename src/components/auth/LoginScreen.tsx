// src/components/auth/LoginScreen.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast'; // Assuming this is from shadcn/ui or similar

// Props now reflect the Student Login API
interface LoginScreenProps {
  // type prop might not be needed if this screen is only for students
  // If you have a separate admin login, it might use a different API/params
}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [usn, setUsn] = useState(''); // Changed from email
  const [dobDd, setDobDd] = useState('');
  const [dobMm, setDobMm] = useState('');
  const [dobYyyy, setDobYyyy] = useState('');
  // Removed password as student login uses USN & DOB

  const [loading, setLoading] = useState(false);
  const { login, isLoading: authIsLoading } = useAuth(); // Get login function and global loading state
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call the updated login function from AuthContext
      await login(usn, dobDd, dobMm, dobYyyy);
      toast({
        title: "Login Successful",
        description: `Welcome back to UniCampus!`,
      });
      navigate('/dashboard'); // Or to a protected route
    } catch (error: any) {
      console.error("Login Screen Error:", error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials or server error. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-unicampus-red/5 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-unicampus-red rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">UC</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            Student Login
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-400">
            Access your UniCampus account
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="text" // USN is typically text
                placeholder="Enter your USN"
                value={usn}
                onChange={(e) => setUsn(e.target.value.toUpperCase())} // Often USNs are uppercase
                className="w-full"
                required
                autoComplete="username" // Helps with password managers
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Input
                type="text"
                placeholder="DD"
                value={dobDd}
                onChange={(e) => setDobDd(e.target.value)}
                className="w-full"
                required
                maxLength={2}
                pattern="\d*"
              />
              <Input
                type="text"
                placeholder="MM"
                value={dobMm}
                onChange={(e) => setDobMm(e.target.value)}
                className="w-full"
                required
                maxLength={2}
                pattern="\d*"
              />
              <Input
                type="text"
                placeholder="YYYY"
                value={dobYyyy}
                onChange={(e) => setDobYyyy(e.target.value)}
                className="w-full"
                required
                maxLength={4}
                pattern="\d*"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-unicampus-red hover:bg-unicampus-red-dark"
              disabled={loading || authIsLoading} // Disable if global auth is loading too
            >
              {loading || authIsLoading ? 'Signing in...' : 'Sign In'}
            </Button>
            {/* Removed Forgot Password for DOB based login, or adapt it if you have such a flow */}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginScreen;