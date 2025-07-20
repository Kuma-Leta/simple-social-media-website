import "../../styles/signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<any>(null);
  const [signUpSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();
  async function SignUpSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }
    try {
      const signUpResult = await axios.post(
        "http://localhost:5000/api/signup",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );
      setSignupSuccess(true);
      // After successful login/signup
      localStorage.setItem("authToken", signUpResult.data.token);

      console.log(signUpResult);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error: any) {
      console.log(error);
      if (error.response.data) setError(error.response.data.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <form onSubmit={SignUpSubmitHandler} className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            SIGNUP
          </h2>

          <div className="space-y-2">
            <input
              name="name"
              placeholder="Enter your first name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <input
              name="name"
              placeholder="Enter your last name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <input
              name="email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <input
              name="password"
              placeholder="Create password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <input
              name="confirmPassword"
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
              className="w-full py-2 text-black-900 border border-blue-500  rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
            >
              Signup
            </button>
          </div>

          <p className="text-center text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>

        {signUpSuccess && (
          <p className="text-center text-green-500 font-medium mt-4">
            Congratulations! You have successfully created an account.
          </p>
        )}

        {error && (
          <p className="text-center text-red-500 font-medium mt-4">{error}</p>
        )}
      </div>
    </div>
  );
};
export default SignUp;
