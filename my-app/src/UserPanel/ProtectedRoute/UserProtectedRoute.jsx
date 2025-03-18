import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

const UserProtectedRoute = ({ children }) => {
    const { isUserAuthenticated, user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        // The authentication check is handled in the AuthProvider's useEffect
        // We just need to wait for that check to complete
        setIsLoading(false);
    }, [isUserAuthenticated]);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    return isUserAuthenticated ? children : <Navigate to="/user/login" />;
};

export default UserProtectedRoute;