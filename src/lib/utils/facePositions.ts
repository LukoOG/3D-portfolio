import { Euler } from 'three'

export type FaceName = 'hero' | 'about' | 'projects' | 'skills' | 'blog' | 'contact'

export const faceRotations: Record<FaceName, Euler> = {
  hero:     new Euler(0, 0, 0),
  about:    new Euler(0, Math.PI, 0),
  projects: new Euler(0, -Math.PI / 2, 0),
  skills:   new Euler(0, Math.PI / 2, 0),
  blog:     new Euler(Math.PI / 2, 0, 0),
  contact:  new Euler(-Math.PI / 2, 0, 0),
}

// How far in front of the face surface to place HTML content
export const FACE_OFFSET = 1.52