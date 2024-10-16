import React, { useState, useContext } from "react";
import google from "./element/google.png";
import "./style_login.css"; // Assuming the CSS file is imported here
import { onLogin } from "./auth.api.login";
import { AuthForm } from "./Auth.component.login";
import { useNavigate, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";
import UserContext from "../../context/UserContext";
import bgImage from "../bg.avif"; // Import the background image

const LoginForm: React.FC = () => {
  const { setC_id } = useContext(UserContext); // Access the setC_id function
  const navigate = useNavigate();
  const location = useLocation(); // Access location to get the "from" state
  const [credentials, setCredentials] = useState({
    C_name: "",
    C_password: "",
  });

  const [error, setError] = useState(""); // State for storing the error
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission

  const login = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true); // Disable the button by setting isSubmitting to true

    const response = await onLogin(credentials);
    if (response && response.error) {
      setError(response.error); // Set error message if response contains error
      setIsSubmitting(false); // Enable the button after an error
    } else {
      try {
        const serverResponse = await fetch(
          `api/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );

        const result = await serverResponse.json();

        if (serverResponse.ok) {
          setC_id(result.C_id); // Set C_id in UserContext
          sessionStorage.setItem("C_id", result.C_id); // Save C_id to sessionStorage

          // Check if a "from" location is provided (i.e., where the user came from)
          const from = location.state?.from?.pathname || "/";
          navigate(from); // Redirect back to the page they tried to visit, or home
        } else {
          setError(result.error || "Failed to Login");
        }
      } catch (error) {
        setError("An unexpected error occurred.");
      } finally {
        setIsSubmitting(false); // Re-enable the button after response
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  // Function to handle Google login
  const handleGoogleLogin = () => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=663248155967-avgv6eqfkjdr04m1jj07lbf9v3jtuma2.apps.googleusercontent.com&redirect_uri=${
      import.meta.env.VITE_APP_FE_BASE_URL
    }/auth/google/callback&response_type=code&scope=openid+https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile`;
    window.location.href = googleAuthUrl; // Redirect to Google OAuth
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`, // Use the imported image
        backgroundSize: "cover", // Optional: to cover the whole div
        backgroundPosition: "center", // Optional: to center the image
        height: "100vh", // Set the height of the div to cover the viewport
        width: "100%", // Ensure it takes the full width
      }}
    >
      <AuthForm
        onSubmit={login}
        style={{
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div className="wrapper">
          <h1>Login</h1>

          {/* Display error message if there's an error */}
          <div className="input-box">
            <input
              type="text"
              name="C_name"
              placeholder="Username"
              value={credentials.C_name}
              onChange={handleChange}
              required
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input
              type="password"
              name="C_password"
              placeholder="Password"
              value={credentials.C_password}
              required
              onChange={handleChange}
            />
            <i className="bx bxs-lock-alt"></i>
          </div>

          {error && (
            <Alert variant="filled" severity="error" sx={{ mb: 3, mt: -2 }}>
              {error}
            </Alert>
          )}

          <button
            type="submit"
            className="btn_login"
            style={{ background: "#4b0e0e", color: "white" }}
            disabled={isSubmitting} // Disable button when submitting
          >
            <span>{isSubmitting ? "Logging in..." : "Login"}</span>
          </button>

          <div
            className="button-divider-with-text"
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            <span className="divider-text">Log in with</span>
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            className="btn_authG"
            onClick={handleGoogleLogin}
          >
            <img
              className="google"
              src={google}
              alt="Google"
              style={{ height: "25px" }}
            />
          </button>

          <div className="register-link">
            <p>
              Don't have an account?{" "}
              <a
                href="/register"
                style={{ color: "black" }}
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </AuthForm>
    </div>
  );
};

export default LoginForm;
