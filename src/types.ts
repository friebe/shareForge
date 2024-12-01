export interface Contact {
  id: string;
  name: string;
  avatar: string;
}

export interface ShareApp {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
}