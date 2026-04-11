import { useParams } from "react-router-dom";
import { useProject } from "../hooks/projectHook";

export function Project() {
  const { shortId } = useParams();
  const { project, loading, error } = useProject(shortId);

  if (loading) return <p>Loading...</p>;
  if (!shortId) return <p>No project ID provided</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-forge-accent">{project?.name}</h1>
    </div>
  );
}