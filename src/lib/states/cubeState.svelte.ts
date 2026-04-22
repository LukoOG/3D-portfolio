import { Quaternion, Euler } from 'three';
import { faceRotations, type FaceName } from '$lib/utils/face';
import { faceConfig } from '$lib/utils/faceConfig';
import { goto } from '$app/navigation';

export type cubeMode = 'idle' | 'navigating' | 'arrived' | 'entered';

export const cubeState = $state({
	activeFace: 'hero' as FaceName,
	isFacing: false, //true during tween, blocks input
	mode: 'idle' as cubeMode
});

export function navigateTo(face: FaceName, route: string) {
	cubeState.activeFace = face;
	cubeState.mode = 'navigating';
	goto(route)
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

export const getActiveFaceColor = () => faceConfig[cubeState.activeFace].color
