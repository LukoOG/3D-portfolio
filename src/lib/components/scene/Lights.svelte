<script lang="ts">
	import { T } from '@threlte/core';
</script>

<T.AmbientLight intensity={0.6} />
<T.PointLight position={[0, 0, 5]} intensity={80} color="#fff" />
<T.PointLight position={[0, 0, -5]} intensity={80} color="#fff" />
<T.PointLight position={[5, 0, 0]} intensity={80} color="#fff" />
<T.PointLight position={[-5, 0, 0]} intensity={80} color="#fff" />
