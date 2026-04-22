import { Euler } from 'three';
import { Vector3 } from 'three';

export type FaceName = 'hero' | 'about' | 'projects' | 'skills' | 'gallery' | 'contact';

export const faceRotations: Record<FaceName, Euler> = {
	hero: new Euler(0, 0, 0),
	about: new Euler(0, Math.PI / 2, 0), // rotate left → left face forward
	projects: new Euler(0, -Math.PI / 2, 0), // rotate right
	contact: new Euler(0, Math.PI, 0), // back face
	skills: new Euler(-Math.PI / 2, 0, 0), // top face
	gallery: new Euler(Math.PI / 2, 0, 0) // bottom face
};

export const facePositions: Record<FaceName, { position: Vector3; target: Vector3 }> = {
	hero: { position: new Vector3(0, 0, 5), target: new Vector3(0, 0, 0) },
	about: { position: new Vector3(-5, 0, 0), target: new Vector3(0, 0, 0) },
	projects: { position: new Vector3(5, 0, 0), target: new Vector3(0, 0, 0) },
	contact: { position: new Vector3(0, 0, -5), target: new Vector3(0, 0, 0) },
	skills: { position: new Vector3(0, 5, 0), target: new Vector3(0, 0, 0) },
	gallery: { position: new Vector3(0, -5, 0), target: new Vector3(0, 0, 0) }
};

// How far in front of the face surface to place HTML content
export const FACE_OFFSET = 1.009;
