
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  
  // Auto-redirect to the landing page
  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return null;
}
