import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
            } catch (error) {
                // Invalid token
                localStorage.removeItem("userToken");
            }
        }
    }, []);

    // Login using stored credentials
    const login = (userData) => {
        // For your local storage based auth:
        const token = jwt.sign(userData, 'user_jwt_secret', { expiresIn: '7d' });
        localStorage.setItem("userToken", token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("userToken");
        setUser(null);
    };

    return (
        <UserAuthContext.Provider value={{ user, login, logout }}>
            {children}
        </UserAuthContext.Provider>
    );
};

export default UserAuthContext;