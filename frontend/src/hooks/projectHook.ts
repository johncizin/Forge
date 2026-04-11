//was messy in Project page so im abstracting it out here for direct injection 

import { useEffect, useState} from "react";
import { useAuth } from "../context/authContext";
import { fetchProjectByShortId } from "../services/projectService";

export interface ProjectData {
    name: string;
    description: string;
    shortId: string;
}

export function useProject(shortId: string | undefined) {
    const { token } = useAuth();
    const [project, setProject] = useState<ProjectData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    useEffect(() => {
        async function loadProject() {
            if (!shortId || !token) return;
            try {
                const data = await fetchProjectByShortId(shortId, token);
                setProject(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadProject();
    }
    , [shortId, token]);

    return { project, loading, error };
}