import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { fetchTasksFromProjectShortId } from "../services/taskService";
import type { TaskData } from "../services/taskService";


export function useTasks(shortId: string | undefined) {
    const { token } = useAuth();
    const [tasks, setTasks] = useState<TaskData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadTasks() {
            if (!shortId || !token) return;
            try {
                const data = await fetchTasksFromProjectShortId(shortId, token);
                setTasks(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadTasks();
    }, [shortId, token]);

    console.log("tasks in hook", tasks);
    return { tasks, loading, error };
}