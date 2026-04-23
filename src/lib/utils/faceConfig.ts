import type { Component } from 'svelte'
import type { FaceName } from './face'
import {
  House,
  User,
  Folder,
  Mail,
  Wrench,
  GalleryHorizontalEnd as Gallery,
  ArrowLeft,
  type LucideProps
} from '@lucide/svelte'

type LucideIcon = Component<LucideProps>;

export interface FaceConfig {
  label: string
  route: string
  shortcut: string | null
  color: string  // used for face material tint
  icon: LucideIcon
}

export const faceConfig: Record<FaceName, FaceConfig> = {
  hero:     { label: 'Home',     route: '/',  shortcut: "1",       color: '#1a1a2e', icon: House },
  projects: { label: 'Projects', route: '/projects', shortcut: "2", color: '#0f3460', icon: Folder },
  skills:   { label: 'Skills',   route: '/skills', shortcut: "3",  color: '#e94560', icon: Wrench },
  about:    { label: 'About',    route: '/about', shortcut: "4",   color: '#3f213e', icon: User },
  contact:  { label: 'Contact',  route: '/contact', shortcut: "5", color: '#533483', icon: Mail },
  gallery:   { label: 'Gallery',   route: '/gallery', shortcut: "6",  color: '#942605', icon: Gallery }
};