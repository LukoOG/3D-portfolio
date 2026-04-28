<!-- src/routes/+page.svelte (hero) -->
<script lang="ts">
	import SecretLayout from '$lib/components/html/pageLayouts/SecretLayout.svelte';
</script>

<SecretLayout>
	<div class="flex h-[90%] flex-col items-center justify-center">
		<h1 class="text-3xl">Check out my portfolio first 🫵</h1>
	</div>
</SecretLayout>

<style>
	h1 {
		font-size: clamp(2rem, 5vw, 4rem);
		font-weight: 300;
		letter-spacing: -0.02em;
		margin: 0;
		animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
	}

	@keyframes slide-up {
		from {
			opacity: 0;
			translate: 0 12px;
		}
		to {
			opacity: 1;
			translate: 0 0;
		}
	}
</style>
