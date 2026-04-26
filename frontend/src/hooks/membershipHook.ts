//for member state of project

import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { fetchProjectMembers, fetchTaskMembers } from "../services/membershipService";
//import { fetchProjectMembers } from "../services/membershipService";
//import { fetchTaskMembers } from "../services/membershipService";

export interface MemberData {
    id: string;
    name: string;
    email: string;
}

export function useProjectMembership(projectShortId: string | undefined) {
    const { token } = useAuth();
    const [members, setMembers] = useState<MemberData[]>([]); //should never be null but edge case
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    //const[taskMembers, setTaskMembers] = useState<MemberData[]>([]); //setup for taks members

    useEffect(() => {
        async function loadMembers() {
            if (!projectShortId || !token) return;
            try {
                const data = await fetchProjectMembers(projectShortId, token);
                setMembers(data);
            } catch (err: any) {
                console.error("Error fetching project members:", err.message);
                setError(err.message);
            }finally {
                setLoading(false);
            }
        }
        loadMembers();
    }, [projectShortId, token]);
    
    return { members, loading, error };
}

export function useTaskMembership(taskId: string | undefined) {
    const { token } = useAuth();
    const [members, setMembers] = useState<MemberData[]>([]); 
    const[loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    useEffect(() => {
        async function loadMembers() {
            if (!taskId || !token) return;
            try {
                const data = await fetchTaskMembers(taskId, token);
                setMembers(data);
            } catch (err: any) {
                console.error("Error fetching task members:", err.message);
                setError(err.message);
            }finally {
                setLoading(false);
            }
        }
        loadMembers();
    }, [taskId, token]);
    
    return { members, loading, error };
}