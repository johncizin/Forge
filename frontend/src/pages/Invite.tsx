import { useParams, useNavigate} from "react-router-dom";
import { useEffect } from "react";

import { useAuth } from "../context/authContext";

import { acceptInvite } from "../services/inviteService";
import { declineInvite } from "../services/inviteService";

export function Invite(){
    const { token } = useParams();
    const { token: authToken, loading, user } = useAuth();
    const navigate = useNavigate();

    console.log("token from params:", token);
    console.log("authToken:", authToken);
    console.log("loading:", loading);

    //runs on mount if authToken user is logged in, if not user not logged in nav to login page
    useEffect(() => {
        if (!loading && !user) {
            localStorage.setItem("pendingInvite", token!);
            navigate("/login");
        }
    }, [loading, authToken]);

    const handleAccept = async () => {
        console.log("accepting invite with token:", token);
        try {
            await acceptInvite(token!, authToken!);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error accepting invite:", error);
        }
    };
    
    const handleDecline = async () => {
        try {
            await declineInvite(token!, authToken!);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error declining invite:", error);
        }
    };  

      return (
        <div className="flex items-center justify-center h-full">
            <div className="bg-white border border-gray-200 rounded-xl p-8 w-full max-w-md text-center">
                <h1 className="text-xl font-bold text-forge-login-text mb-2">Project Invite</h1>
                <p className="text-sm text-forge-muted mb-8">You've been invited to join a project on Forge.</p>
                <div className="flex justify-center gap-3">
                    <button
                        onClick={handleDecline}
                        className="px-4 h-9 rounded-lg border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                        Decline
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-4 h-9 rounded-lg bg-black text-white text-sm font-medium hover:opacity-80"
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
}