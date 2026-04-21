import { Quaternion, Euler } from 'three';
import { faceRotations, type FaceName } from '$lib/utils/facePositions';

export const cubeState = $state({
  activeFace: 'hero' as FaceName,
  isNavigating: false, //true during tween, blocks input
})

export function navigateTo(face: FaceName) {
  cubeState.activeFace = face
}


export const getTargetQuaternion = () => {
	const q = new Quaternion();
	q.setFromEuler(faceRotations[cubeState.activeFace]);
	return q;
};
