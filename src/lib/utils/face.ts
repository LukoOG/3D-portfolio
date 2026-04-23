import { Euler } from 'three';
import { Vector3 } from 'three';

export type FaceName = 'hero' | 'about' | 'projects' | 'skills' | 'gallery' | 'contact';

export const faceRotations: Record<FaceName, Euler> = {
	hero: new Euler(0, 0, 0),
	projects: new Euler(0, -Math.PI / 2, 0), // rotate right
	skills: new Euler(0, Math.PI / 2, 0), // left face
	about: new Euler(0, Math.PI, 0), // rotate left → left face forward
	contact: new Euler(Math.PI / 2, 0, 0), // back face
	gallery: new Euler(-Math.PI / 2, 0, 0) // bottom face
};

// How far in front of the face surface to place HTML content
export const FACE_OFFSET = 1.009;
