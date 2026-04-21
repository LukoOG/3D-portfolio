import type { FaceName } from './facePositions'

export interface FaceConfig {
  name: FaceName
  label: string
  icon: string          // lucide icon name or emoji fallback
  shortcut: string      // keyboard key
}

export const faces: FaceConfig[] = [
  { name: 'hero',     label: 'Home',     icon: '⬡', shortcut: '1' },
  { name: 'about',    label: 'About',    icon: '◈', shortcut: '2' },
  { name: 'projects', label: 'Projects', icon: '◻', shortcut: '3' },
  { name: 'skills',   label: 'Skills',   icon: '◆', shortcut: '4' },
  { name: 'blog',     label: 'Blog',     icon: '◇', shortcut: '5' },
  { name: 'contact',  label: 'Contact',  icon: '○', shortcut: '6' },
]