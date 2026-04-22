import type { Component } from 'svelte'
import type { FaceName } from './facePositions'
import {
  House,
  User,
  Folder,
  Mail,
  Wrench,
  ArrowLeft
} from '@lucide/svelte'

export interface FaceConfig {
  label: string
  route: string
  shortcut: string | null
  color: string  // used for face material tint
  icon: Component
}

export const faceConfig: Record<FaceName, FaceConfig> = {
  hero:     { label: 'Home',     route: '/',  shortcut: "1",       color: '#1a1a2e', icon: House },
  about:    { label: 'About',    route: '/about', shortcut: "2",   color: '#16213e', icon: User },
  projects: { label: 'Projects', route: '/projects', shortcut: "3", color: '#0f3460', icon: Folder },
  contact:  { label: 'Contact',  route: '/contact', shortcut: "4", color: '#533483', icon: Mail },
  skills:   { label: 'Skills',   route: '/skills', shortcut: "5",  color: '#e94560', icon: Wrench },
  back:     { label: '',         route: '/',    shortcut: null,     color: '#0a0a0a', icon: ArrowLeft },
};