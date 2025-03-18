import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { adminUser, isAdminAuthenticated } = useContext(AuthContext);
    
    // Use the context state instead of directly checking localStorage
    return isAdminAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;