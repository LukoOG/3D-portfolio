import { Euler } from 'three';
import { Vector3 } from 'three';

export type FaceName = 'hero' | 'about' | 'projects' | 'secret' | 'lab' | 'contact';

export const faceRotations: Record<FaceName, Euler> = {
	hero: new Euler(0, 0, 0),
	projects: new Euler(0, -Math.PI / 2, 0), // rotate right
	about: new Euler(0, Math.PI / 2, 0), // left face
	contact: new Euler(Math.PI / 2, 0, 0), // rotate left → left face forward
	lab: new Euler(-Math.PI / 2, 0, 0), // bottom face
	secret: new Euler(0, Math.PI, 0) // back face
};

// How far in front of the face surface to place HTML content
export const FACE_OFFSET = 1.009;
