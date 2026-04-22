<script lang="ts">
	import { T } from '@threlte/core';
	import { ShaderMaterial, BackSide } from 'three';

	const material = new ShaderMaterial({
		side: BackSide,
		uniforms: {},
		vertexShader: `
      varying vec3 vPosition;
      void main() {
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
		fragmentShader: `
      varying vec3 vPosition;

      void main() {
        // normalize y from -1 to 1
        float t = normalize(vPosition).y * 0.5 + 0.5;

        // deep space colors — dark navy at top, deep purple at bottom
        vec3 top    = vec3(0.02, 0.02, 0.08);   // near black navy
        vec3 middle = vec3(0.04, 0.02, 0.10);   // deep purple hint
        vec3 bottom = vec3(0.06, 0.01, 0.08);   // dark magenta tint

        vec3 color = mix(bottom, middle, t);
        color = mix(color, top, t * t);          // ease toward top

        gl_FragColor = vec4(color, 1.0);
      }
    `
	});
</script>


<T.Mesh {material}>
  <T.SphereGeometry args={[50, 32, 32]} />
</T.Mesh>