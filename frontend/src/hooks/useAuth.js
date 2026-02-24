import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        // Simulate an API call to check user session
        const response = await fetch("/api/check-session");
        const data = await response.json();

        if (data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, [setUser]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (data.user) {
        setUser(data.user);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await fetch("/api/logout", { method: "POST" });
      setUser(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
  };
};

export default useAuth;