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
        <div className="p-9">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-forge-login-text"> My Settings</h1>
                <button onClick={handleLogout}  className="flex items-center gap-2 bg-forge-accent text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-80 transition-opacity">
                    <LogOut size={16}/>
                    Logout
                </button>
            </div>
        </div>
    );
}