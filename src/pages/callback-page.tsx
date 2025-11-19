import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";

const CallbackPage: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Don't do anything while loading
    if (auth.isLoading) {
      return;
    }

    // If there's an error, redirect to login
    if (auth.error) {
      console.error("Authentication error:", auth.error);
      navigate("/login");
      return;
    }

    // If authenticated, redirect to the stored path or default
    if (auth.isAuthenticated) {
      const redirectPath = localStorage.getItem("redirectPath") || "/";
      localStorage.removeItem("redirectPath");
      navigate(redirectPath, { replace: true });
    }
  }, [auth.isLoading, auth.isAuthenticated, auth.error, navigate]);

  if (auth.error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400">Authentication failed</p>
          <p className="text-sm text-gray-400">{auth.error.message}</p>
        </div>
      </div>
    );
  }

  if (auth.isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Processing login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <p>Completing login...</p>
    </div>
  );
};

export default CallbackPage;