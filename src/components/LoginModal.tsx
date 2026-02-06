import { useState } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { syncCustomer, checkCustomerExists, loginCustomer } from "../api/customerSync";
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (type: "partner" | "admin", name: string) => void;
  fromPlanSelection?: boolean;
}

export function LoginModal({ 
  isOpen, 
  onClose, 
  onLogin,
  fromPlanSelection = false
}: LoginModalProps) {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePostLoginActions = (email: string, userName: string) => {
    // Trigger custom event to update Navbar immediately
    window.dispatchEvent(new Event('userLoggedIn'));
    
    // If login was triggered from plan selection (Buy Now), navigate to checkout
    if (fromPlanSelection) {
      onLogin("admin", userName);
      onClose();
      // Navigate to checkout after a short delay to ensure state is updated
      setTimeout(() => {
        navigate('/checkout');
      }, 100);
      return;
    }

    // Otherwise, just close the modal and let user stay on current page
    onClose();
    onLogin("admin", userName);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || (isSignUp && !name)) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // SIGN UP
      if (isSignUp) {
        try {
          console.log("Attempting signup...");
          const response = await syncCustomer({ name, email, source: "workeye", password });
          
          console.log("Signup response:", response);

          // Make sure we have a customerId
          if (!response?.customerId && !response?.customer?.customerId) {
            throw new Error("Account has been created please login to continue");
          }

          const customerId = response.customerId || response.customer?.customerId;

          const user = {
            name: name || email.split("@")[0],
            email,
            role: "admin",
            customerId: customerId,
          };

          console.log("Saving user to localStorage:", user);
          localStorage.setItem("user", JSON.stringify(user));

          alert("Account created successfully! 🎉");
          
          setIsSubmitting(false);
          handlePostLoginActions(email, user.name);
          return;
        } catch (signupError: any) {
          console.error("Signup error:", signupError);
          setIsSubmitting(false);
          
          if (signupError.response?.data?.message) {
            alert(signupError.response.data.message);
          } else if (signupError.message) {
            alert(signupError.message);
          } else {
            alert("Failed to create account. Please try again.");
          }
          return;
        }
      }

      // SIGN IN
      try {
        const exists = await checkCustomerExists(email);
        console.log("Email exists?", exists);

        if (!exists) {
          setIsSubmitting(false);
          alert("Account not found. Please create an account.");
          setIsSignUp(true);
          return;
        }

        // Email exists, now verify password
        const loginResponse = await loginCustomer({ email, password });

        console.log("Login response:", loginResponse);

        if (loginResponse.success && loginResponse.customer) {
          // Make sure we have a customerId
          if (!loginResponse.customer.customerId && !loginResponse.customer._id) {
            throw new Error("Customer ID not received from server");
          }

          const customerId = loginResponse.customer.customerId || loginResponse.customer._id;

          const user = {
            name: loginResponse.customer.name,
            email: loginResponse.customer.email,
            role: "admin",
            customerId: customerId,
          };

          console.log("Saving user to localStorage:", user);
          localStorage.setItem("user", JSON.stringify(user));

          alert("Login successful! Welcome back, " + user.name + "! 👋");
          
          setIsSubmitting(false);
          handlePostLoginActions(user.email, user.name);
        } else {
          setIsSubmitting(false);
          alert("Invalid credentials. Please check your password.");
        }
      } catch (loginError: any) {
        console.error("Login error:", loginError);
        setIsSubmitting(false);
        
        if (loginError.response?.status === 401) {
          alert("Invalid credentials. Incorrect password.");
        } else if (loginError.response?.data?.message) {
          alert(loginError.response.data.message);
        } else if (loginError.message) {
          alert(loginError.message);
        } else {
          alert("Login failed. Please try again.");
        }
      }

    } catch (err: any) {
      console.error("General error:", err);
      setIsSubmitting(false);
      
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else if (err.message) {
        alert(err.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  const handleCloseModal = () => {
    if (!isSubmitting) {
      setName("");
      setEmail("");
      setPassword("");
      setIsSignUp(false);
      onClose();
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
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
                disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </div>

          {!isSignUp && (
            <div className="flex justify-end text-sm">
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => alert("Password reset feature coming soon")}
                disabled={isSubmitting}
              >
                Forgot password?
              </button>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {isSignUp ? "Creating Account..." : "Logging in..."}
              </span>
            ) : (
              <span>{isSignUp ? "Create Account" : "Login"}</span>
            )}
          </Button>

          <div className="text-center text-sm">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="text-blue-600 hover:underline"
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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