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
  type LucideProps,
  FlaskConical,
  Terminal
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
  hero:     { label: 'Home',     route: '/',         shortcut: '1', color: '#1a1a2e', icon: House },
  projects: { label: 'Projects', route: '/projects', shortcut: '2', color: '#0f3460', icon: Folder },
  about:    { label: 'About',    route: '/about',    shortcut: '3', color: '#3f213e', icon: User },
  contact:  { label: 'Contact',  route: '/contact',  shortcut: '4', color: '#533483', icon: Mail },
  lab:      { label: 'Lab',      route: '/lab',      shortcut: '5', color: '#942605', icon: FlaskConical },
  secret:   { label: '?',        route: '/secret',   shortcut: '6', color: '#a0a0a0', icon: Terminal },
}