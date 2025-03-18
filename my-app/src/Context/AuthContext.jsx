import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [adminUser, setAdminUser] = useState(null);

    useEffect(() => {
        // Check for admin auth
        const adminToken = localStorage.getItem("token");
        if (adminToken) {
            try {
                const decoded = jwtDecode(adminToken);
                setAdminUser(decoded);
            } catch (error) {
                localStorage.removeItem("token");
            }
        }

        // Check for user auth
        const userToken = localStorage.getItem("userToken") || sessionStorage.getItem("userToken");
        if (userToken) {
            try {
                // Parse the stored token - this is critical
                const tokenData = JSON.parse(userToken);
                
                // Verify token is not expired
                if (tokenData.exp > Date.now()) {
                    setUser(tokenData.user);
                } else {
                    // Clean up expired tokens
                    localStorage.removeItem("userToken");
                    sessionStorage.removeItem("userToken");
                }
            } catch (error) {
                console.error("Token validation failed:", error);
                localStorage.removeItem("userToken");
                sessionStorage.removeItem("userToken");
            }
        }
    }, []);

    // Admin login
    const adminLogin = async (username, password) => {
        try {
            const res = await axios.post("http://localhost:5000/admin/login", { username, password });
            localStorage.setItem("token", res.data.token);
            setAdminUser(jwtDecode(res.data.token));
        } catch (error) {
            console.error("Login failed:", error.response?.data?.error || "Unknown error");
            throw new Error(error.response?.data?.error || "Login failed");
        }
    };

    // User login with localStorage
    const userLogin = (loginData, isAutoLogin = false) => {
        // If it's an auto-login, we don't need to validate credentials
        if (isAutoLogin) {
            setUser(loginData);
            return true;
        }
        
        // Normal login flow with credential validation
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const identifier = loginData.loginType === "phone" ? "phone" : "email";
        const value = loginData.loginType === "phone" ? loginData.phone : loginData.email;
        
        const foundUser = users.find(u => u[identifier] === value);
        
        if (foundUser && foundUser.password === loginData.password) {
            const userData = {
                id: Date.now(),
                [identifier]: value,
                loginType: loginData.loginType
            };
            
            // Create a JWT-like token structure
            const token = JSON.stringify({
                user: userData,
                exp: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days expiry
            });
            
            if (loginData.rememberMe) {
                localStorage.setItem("userToken", token);
            } else {
                sessionStorage.setItem("userToken", token);
            }
            
            setUser(userData);
            return true;
        }
        return false;
    };

    const adminLogout = () => {
        localStorage.removeItem("token");
        setAdminUser(null);
    };

    const userLogout = () => {
        localStorage.removeItem("userToken");
        sessionStorage.removeItem("userToken");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            adminUser, 
            userLogin, 
            adminLogin, 
            userLogout, 
            adminLogout,
            isUserAuthenticated: !!user,
            isAdminAuthenticated: !!adminUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;