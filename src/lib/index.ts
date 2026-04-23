// place files you want to import through the `$lib` alias in this folder.
// src/lib/index.ts
export { cubeState, navigateTo, exitFace, enterFace, getTargetQuaternion } from './states/cubeState.svelte'
export { faceConfig } from './utils/faceConfig'
export { faceRotations, type FaceName } from './utils/face'