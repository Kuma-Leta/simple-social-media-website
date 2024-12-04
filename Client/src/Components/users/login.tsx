import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../../styles/login.css";
import { IoLogoGoogle } from "react-icons/io";
import axios from "../../axiosConfig";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<any>(false);
  const navigate = useNavigate();

  async function formSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      if (password !== confirmPassword) {
        setError("the password didn't match each other");
        return;
      }

      const userCredential = await axios.post(
        "http://localhost:5000/api/login",
        {
          email,
          password,
        }
      );
      console.log(userCredential);
      if (userCredential) {
        setResult("congratulations ! successfully Logged in");
        // After successful login/signup
        localStorage.setItem("authToken", userCredential.data.token);

        setTimeout(() => navigate("/home"), 2000);
      }
    } catch (error: any) {
      // console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <form onSubmit={formSubmitHandler} className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            LOGIN
          </h2>

          <div className="space-y-2">
            <input
              placeholder="Enter email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="button"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Reset Password
          </button>

          <div className="space-y-2">
            <input
              placeholder="Enter password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <input
              placeholder="Confirm your password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full justify-center flex items-center px-4 py-2  text-black border border-blue-500 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
            >
              Login
            </button>
          </div>

          {!result && (
            <p className="text-center text-gray-700">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Signup
              </Link>
            </p>
          )}
          {result && (
            <p className="text-center text-green-500 font-medium">{result}</p>
          )}
          {error && (
            <p className="text-center text-red-500 font-medium">{error}</p>
          )}

          <hr className="border-gray-300" />
          <span className="block text-center text-gray-600">or</span>

          <div className="flex justify-center">
            <button
              type="button"
              className="flex items-center px-4 py-2  text-black border border-blue-500 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
            >
              <IoLogoGoogle size={28} className="mr-2" />
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
