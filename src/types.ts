import { LucideIcon } from 'lucide-react';

export interface Contact {
  id: string;
  name: string;
  avatar: string;
}

export interface ShareApp {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
}