<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { ShaderMaterial, BackSide } from 'three';

	const material = new ShaderMaterial({
		side: BackSide,
		uniforms: {
			uTime: { value: 0 }
		},
		vertexShader: `
      varying vec3 vWorldPosition;

      void main() {
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;

        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
		fragmentShader: `
      varying vec3 vWorldPosition;
      uniform float uTime;

      // -------------------------
      // Create a dark gradient background with more contrast
      // -------------------------
      vec3 voidBackground(vec3 dir) {
        // More pronounced vertical gradient
        float h = dir.y * 0.5 + 0.5; // vertical gradient
        vec3 top = vec3(0.01, 0.01, 0.02);  // very dark blue/black
        vec3 bottom = vec3(0.01, 0.01, 0.05);  // deep abyss-like dark blue

        // Smooth transition with higher contrast
        return mix(bottom, top, h);
      }

      // -------------------------
      // Add noise for subtle motion (slightly more noticeable)
      // -------------------------
      float noise(vec2 p) {
        return sin(p.x * 100.0 + uTime * 0.1) * sin(p.y * 100.0 + uTime * 0.1);
      }

      void main() {
        // -------------------------
        // VIEW + REFLECTION
        // -------------------------
        vec3 viewDir = normalize(cameraPosition - vWorldPosition);
        vec3 normal = normalize(vWorldPosition);
        vec3 reflectDir = reflect(-viewDir, normal);

        // -------------------------
        // VOID BACKGROUND BASE
        // -------------------------
        vec3 color = voidBackground(reflectDir);

        // -------------------------
        // DISTORTION (mild distortion to feel fluid)
        // -------------------------
        float warp = sin(reflectDir.x * 5.0 + uTime * 0.4) * sin(reflectDir.y * 5.0 - uTime * 0.3);
        color += warp * 0.1;  // Increased distortion intensity

        // -------------------------
        // ADD NOISE TO MAKE IT MORE NOTICABLE
        // -------------------------
        float n = noise(vWorldPosition.xy);
        color += vec3(n * 0.02);  // More pronounced noise effect

        gl_FragColor = vec4(color, 1.0);
      }
    `
	});

	useTask((delta) => {
		material.uniforms.uTime.value += delta;
	});
</script>

<T.Mesh {material}>
	<T.SphereGeometry args={[50, 64, 64]} />
</T.Mesh>