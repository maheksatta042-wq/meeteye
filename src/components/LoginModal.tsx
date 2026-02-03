import { useState } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { syncCustomer, checkCustomerExists } from "../api/customerSync";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (type: "partner" | "admin", name: string) => void;
  fromPlanSelection?: boolean; // New prop to know if opened from pricing
}

export function LoginModal({ 
  isOpen, 
  onClose, 
  onLogin,
  fromPlanSelection = false
}: LoginModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const checkActiveLicense = async (email: string): Promise<boolean> => {
    try {
      console.log('Checking active license for:', email);
      const response = await fetch(
        `https://lisence-system.onrender.com/api/external/actve-license/${email}?productId=69589e3fe70228ef3c25f26c`,
        {
          headers: {
            "x-api-key": "my-secret-key-123",
          },
        }
      );

      console.log('License check response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('License check response data:', data);
        
        // Check if activeLicense exists and status is 'active'
        const hasLicense = data.activeLicense && data.activeLicense.status === 'active';
        console.log('Has active license:', hasLicense);
        return hasLicense;
      }
      console.log('License check failed - response not ok');
      return false;
    } catch (error) {
      console.error("Error checking active license:", error);
      return false;
    }
  };

  const handlePostLoginActions = async (email: string, userName: string) => {
    // If login was triggered from plan selection (Buy Now), just close modal
    // The App component will handle navigation to checkout
    if (fromPlanSelection) {
      onLogin("admin", userName);
      onClose();
      return;
    }

    // Otherwise, check for active license and redirect accordingly
    const hasActiveLicense = await checkActiveLicense(email);

    // Close the modal first
    onClose();

    // Small delay to ensure modal closes before action
    setTimeout(() => {
      if (hasActiveLicense) {
        // Redirect to dashboard
        window.location.href = "https://frontend-8x7e.onrender.com/";
      } else {
        // Navigate to pricing section
        const pricingSection = document.querySelector('#pricing');
        if (pricingSection) {
          pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || (isSignUp && !name)) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      // SIGN UP
      if (isSignUp) {
        await syncCustomer({ name, email, source: "workeye",password  });

        const user = {
          name: name || email.split("@")[0],
          email,
          role: "admin",
        };

        localStorage.setItem("user", JSON.stringify(user));

        toast.success("Account created successfully 🎉");
        
        // Check for active license after signup
        await handlePostLoginActions(email, user.name);
        return;
      }

      // SIGN IN
      const exists = await checkCustomerExists(email);

      if (!exists) {
        alert("Account not found. Please create an account.");
        setIsSignUp(true);
        return;
      }

      const user = {
        name: email.split("@")[0],
        email,
        role: "admin",
      };

      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Welcome back 👋");
      
      // Check for active license after login
      await handlePostLoginActions(email, user.name);

    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {isSignUp ? "Create Account" : "Login"}
            </span>
          </DialogTitle>
          <DialogDescription className="text-center">
            {isSignUp
              ? "Create your Workeye account"
              : "Sign in to access the Workeye dashboard"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@workeye.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {!isSignUp && (
            <div className="flex justify-end text-sm">
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => toast.info("Password reset coming soon")}
              >
                Forgot password?
              </button>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isSignUp ? "Create Account" : "Login"}
          </Button>

          <div className="text-center text-sm">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="text-blue-600 hover:underline"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="text-blue-600 hover:underline"
                >
                  Create one
                </button>
              </>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}