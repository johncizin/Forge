import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { fetchTasksFromProjectShortId } from "../services/taskService";
import type { FetchedTaskData } from "../services/taskService";


export function useTasks(shortId: string | undefined) {
    const { token } = useAuth();
    const [tasks, setTasks] = useState<FetchedTaskData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadTasks() {
        console.log("loadTasks called, token:", token, "shortId:", shortId);
        if (!shortId || !token) return;
        try {
            const data = await fetchTasksFromProjectShortId(shortId, token);
            setTasks(data ?? []);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    
   
    useEffect(() => {
        loadTasks();
    }, [shortId, token]);

    console.log("tasks in hook", tasks);
    return { tasks, loading, error, refetch: loadTasks };
}

