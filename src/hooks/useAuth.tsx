import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "../redux/slices/authSlice";

interface UseAuthProps {
  username: string;
  password: string;
}

export const useAuth = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);

  const login = ({ username, password }: UseAuthProps) => {
    // Mock authentication logic
    if (username === "user" && password === "password") {
      const fakeToken = "fake-jwt-token";
      dispatch(loginSuccess({ token: fakeToken }));
      setError(null);
    } else {
      dispatch(loginFailure({ error: "Invalid credentials" }));
      setError("Invalid username or password");
    }
  };

  return { login, error };
};
