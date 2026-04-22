import { Quaternion, Euler } from 'three';
import { faceRotations, type FaceName } from '$lib/utils/facePositions';

export type cubeMode = 'idle' | 'navigating' | 'arrived' | 'entered';

export const cubeState = $state({
	activeFace: 'hero' as FaceName,
	isFacing: false, //true during tween, blocks input
	mode: 'idle' as cubeMode
});

export function navigateTo(face: FaceName) {
	cubeState.activeFace = face;
	cubeState.mode = 'navigating';
}

export function enterFace() {
	if (cubeState.mode === 'arrived') {
		cubeState.mode = 'entered';
	}
}

export function exitFace() {
	cubeState.mode = 'idle';
}

export const getTargetQuaternion = () => {
	const q = new Quaternion();
	q.setFromEuler(faceRotations[cubeState.activeFace]);
	return q;
};
