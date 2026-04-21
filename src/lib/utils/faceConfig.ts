import type { FaceName } from './facePositions'

export interface FaceConfig {
  label: string
  route: string
  color: string  // used for face material tint
}

export const faceConfig: Record<FaceName, FaceConfig> = {
  hero:     { label: 'Home',     route: '/',         color: '#1a1a2e' },
  about:    { label: 'About',    route: '/about',    color: '#16213e' },
  projects: { label: 'Projects', route: '/projects', color: '#0f3460' },
  contact:  { label: 'Contact',  route: '/contact',  color: '#533483' },
  skills:   { label: 'Skills',   route: '/skills',   color: '#e94560' },
  back:     { label: '',         route: '/',         color: '#0a0a0a' },
}