import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { adminLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    
    if (!username.trim()) {
      newErrors.username = "Username is required";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await adminLogin(username, password);
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Invalid credentials";
      const errorCode = error.response?.status;
      
      if (errorCode === 401) {
        toast.error("Invalid username or password");
      } else if (errorCode === 403) {
        toast.error("Account locked. Please contact support");
      } else if (errorCode === 429) {
        toast.error("Too many attempts. Please try again later");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-indigo-900">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg m-4 sm:m-0 dark:bg-gray-700">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Welcome Back</h2>
          <p className="text-gray-600 mt-2 dark:text-gray-300">Login to access your admin dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="username" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
            >
              Username
            </label>
            <div className="relative">
              <input
                id="username"
                type="text"
                className={`w-full px-4 py-3 border ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
              >
                Password
              </label>
             
            </div>
            <div className="relative">
              <input
                id="password"
                type="password"
                className={`w-full px-4 py-3 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:ring-offset-gray-800"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-200">
              Remember me
            </label>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : "Sign In"}
          </button>
        </form>
        
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}
