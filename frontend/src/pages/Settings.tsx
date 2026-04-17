import { LogOut } from "lucide-react";
import { useAuth} from "../context/authContext";
import { useNavigate } from "react-router-dom";

export function Settings(){
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    function handleLogout(){
        logout();
        navigate("/login")
    }

    return(
        <button onClick={handleLogout} className="...">Logout <LogOut size={16}></LogOut> </button>
    );
}