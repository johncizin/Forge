function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center h-full text-forge-muted">
      <p className="text-2xl font-semibold tracking-wide">{title}</p>
    </div>
  );
}

export function Dashboard() {
  return <PlaceholderPage title="Dashboard" />;
}

export function Projects() {
  return <PlaceholderPage title="Projects" />;
}

export function Tasks() {
  return <PlaceholderPage title="Tasks" />;
}

export function Report() {
  return <PlaceholderPage title="Report" />;
}

export function Favorites() {
  return <PlaceholderPage title="Favorites" />;
}

export function Settings() {
  return <PlaceholderPage title="Settings" />;
}