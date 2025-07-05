
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication
    localStorage.removeItem('tandem-auth');
    
    // In a real app, this would handle auth logout
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/");
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className="w-full justify-start text-muted-foreground hover:text-foreground"
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </Button>
  );
};

export default LogoutButton;
