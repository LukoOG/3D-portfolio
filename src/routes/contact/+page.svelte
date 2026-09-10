<script lang="ts">
	import ContactLayout from '$lib/components/html/pageLayouts/ContactLayout.svelte';
	import { enhance } from '$app/forms';
	import { Download, Icon } from '@lucide/svelte';
	import resume from '$lib/assets/documents/cv.pdf';
	import { navigateTo } from '$lib';
	import X from '$lib/components/icon/X.svelte';
	import Github from '$lib/components/icon/github.svelte';
	import LinkedIn from '$lib/components/icon/linkedin.svelte';

	let { form } = $props();

	let loading = $state(false);

	const social = [
		{
			label: 'GitHub',
			href: 'https://github.com/LukoOG',
			icon: Github
		},
		{
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/emmanuel-adesipe-79b901365/',
			icon: LinkedIn
		},
		{
			label: '',
			href: 'https://x.com/Sipe_OG1',
			icon: X
		}
	];
	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.target instanceof HTMLInputElement) return;
		if (e.key === 'ArrowLeft') navigateTo('hero', '/', true); //clue??
		else if (e.key === 'ArrowRight') navigateTo('hero', '/', true); //clue??
	};
</script>

<svelte:window onkeydown={handleKeyDown} />

<ContactLayout>
	<div class="contact-root">
		<!-- left: info + social -->
		<div class="left">
			<div class="info-block">
				<span class="section-label">Contact</span>
				<h2 class="contact-heading">Let's work<br />together</h2>
				<p class="contact-sub">
					Have a project in mind, a role to fill, or just want to say hi? My inbox is open.
				</p>
			</div>

			<div class="contact-details">
				<a href="mailto:your@email.com" class="email-link"> emmanueladesipeog@email.com </a>

				<div class="social-links">
					{#each social as link}
						<a
							href={link.href}
							target="_blank"
							rel="noopener"
							class="social-link"
							aria-label={link.label}
						>
							<link.icon size={20} />
							<span>{link.label}</span>
						</a>
					{/each}
				</div>

				<!-- CV download -->
				<a href={resume} download class="cv-btn">
					<Download size={13} />
					<span>Download My CV</span>
				</a>
			</div>

			<!-- availability indicator -->
			<div class="availability">
				<span class="dot"></span>
				<span>I'm available for new opportunities 🤲 (gbewa)</span>
			</div>
		</div>

		<!-- right: form -->
		<div class="right">
			{#if form?.success}
				<div class="success-state">
					<div class="success-icon">✓</div>
					<p class="success-title">Message sent</p>
					<p class="success-sub">I'll get back to you as soon as possible.</p>
				</div>
			{:else}
				<form
					method="POST"
					use:enhance={() => {
						loading = true;
						return async ({ update }) => {
							loading = false;
							await update();
						};
					}}
					class="form"
				>
					{#if form?.error}
						<div class="form-error">{form.error}</div>
					{/if}

					<div class="field-row">
						<div class="field">
							<label for="name">Name <span class="req">*</span></label>
							<input
								id="name"
								name="name"
								type="text"
								placeholder="Your name"
								value={form?.values?.name ?? ''}
								required
							/>
						</div>

						<div class="field">
							<label for="email">Email <span class="req">*</span></label>
							<input
								id="email"
								name="email"
								type="email"
								placeholder="your@email.com"
								value={form?.values?.email ?? ''}
								required
							/>
						</div>
					</div>

					<div class="field">
						<label for="subject">Subject</label>
						<input
							id="subject"
							name="subject"
							type="text"
							placeholder="What's this about?"
							value={form?.values?.subject ?? ''}
						/>
					</div>

					<div class="field">
						<label for="message">Message <span class="req">*</span></label>
						<textarea
							id="message"
							name="message"
							placeholder="Tell me about your project or opportunity..."
							rows={5}
							required>{form?.values?.message ?? ''}</textarea
						>
					</div>

					<button type="submit" class="submit" disabled={loading}>
						{#if loading}
							<span class="spinner"></span>
							Sending...
						{:else}
							Send message →
						{/if}
					</button>
				</form>
			{/if}
		</div>
		<div class="col-span-2 flex w-full flex-row justify-center">
			<button class="cta" onclick={() => navigateTo('hero', '/', true)}>
				<!-- <span class="arrow">←</span> -->
				Contaced me? Back to Home
			</button>
		</div>
	</div>

	<!-- footer strip -->
	<div class="contact-footer">
		<div class="footer-left">
			<span class="footer-dot"></span>
			<span>Lagos, Nigeria</span>
			<span class="footer-sep">·</span>
			<span>WAT (UTC+1)</span>
		</div>
		<span class="footer-right">This dev typically responds within 24hrs</span>
	</div>
</ContactLayout>

<style>
	.contact-root {
		width: 100%;
		height: 100%;
		padding: 2rem 1.75rem 3rem;
		display: grid;
		grid-template-columns: 1fr 1.4fr;
		gap: 3rem;
		align-items: start;
	}

	/* left */
	.left {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
	}

	.info-block {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.section-label {
		font-size: 0.58rem;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: rgba(255, 255, 255, 0.25);
	}

	.contact-heading {
		font-size: clamp(1.6rem, 2.5vw, 2.2rem);
		font-weight: 200;
		letter-spacing: -0.02em;
		line-height: 1.15;
		margin: 0;
		color: rgba(255, 255, 255, 0.92);
	}

	.cta {
		margin-top: 0.75rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1.1rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.06);
		color: rgba(255, 255, 255, 0.8);
		font-size: 0.75rem;
		letter-spacing: 0.06em;
		cursor: pointer;
		transition:
			background 0.2s,
			border-color 0.2s,
			color 0.2s;
		animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both;
	}

	.cta:hover {
		background: rgba(255, 255, 255, 0.12);
		border-color: rgba(255, 255, 255, 0.35);
		color: white;
	}

	.contact-sub {
		font-size: 0.72rem;
		line-height: 1.7;
		color: rgba(255, 255, 255, 0.4);
		margin: 0;
	}

	.contact-details {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.contact-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.85rem 1.75rem;
		border-top: 1px solid rgba(255, 255, 255, 0.05);
		animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
	}

	.footer-left {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.62rem;
		color: rgba(255, 255, 255, 0.25);
		letter-spacing: 0.06em;
	}

	.footer-dot {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: #4ade80;
		box-shadow: 0 0 5px #4ade80;
		animation: pulse 2s ease-in-out infinite;
	}

	.footer-sep {
		color: rgba(255, 255, 255, 0.1);
	}

	.footer-right {
		font-size: 0.62rem;
		color: rgba(255, 255, 255, 0.2);
		letter-spacing: 0.06em;
	}

	.email-link {
		font-size: 0.78rem;
		color: rgba(255, 255, 255, 0.6);
		text-decoration: none;
		letter-spacing: 0.02em;
		transition: color 0.2s;
		width: fit-content;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		padding-bottom: 0.15rem;
	}

	.email-link:hover {
		color: rgba(255, 255, 255, 0.9);
		border-color: rgba(255, 255, 255, 0.3);
	}

	.social-links {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.social-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.68rem;
		color: rgba(255, 255, 255, 0.35);
		text-decoration: none;
		transition: color 0.2s;
		width: fit-content;
	}

	.social-link:hover {
		color: rgba(255, 255, 255, 0.75);
	}

	.cv-btn {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.68rem;
		color: rgba(255, 255, 255, 0.6);
		padding: 0.45rem 0.9rem;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 999px;
		text-decoration: none;
		width: fit-content;
		transition:
			background 0.2s,
			border-color 0.2s,
			color 0.2s;
		margin-top: 0.25rem;
	}

	.cv-btn:hover {
		background: rgba(255, 255, 255, 0.06);
		border-color: rgba(255, 255, 255, 0.25);
		color: white;
	}

	.availability {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.62rem;
		color: rgba(255, 255, 255, 0.3);
		letter-spacing: 0.06em;
	}

	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #4ade80;
		box-shadow: 0 0 6px #4ade80;
		flex-shrink: 0;
		animation: pulse 2s ease-in-out infinite;
	}

	/* right — form */
	.right {
		animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.form-error {
		font-size: 0.68rem;
		color: rgba(248, 113, 113, 0.9);
		padding: 0.6rem 0.85rem;
		border: 1px solid rgba(248, 113, 113, 0.2);
		border-radius: 8px;
		background: rgba(248, 113, 113, 0.05);
	}

	.field-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	label {
		font-size: 0.6rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: rgba(255, 255, 255, 0.3);
	}

	.req {
		color: rgba(248, 113, 113, 0.7);
	}

	input,
	textarea {
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 8px;
		padding: 0.6rem 0.8rem;
		color: rgba(255, 255, 255, 0.85);
		font-size: 0.72rem;
		font-family: inherit;
		transition:
			border-color 0.2s,
			background 0.2s;
		resize: none;
		width: 100%;
		box-sizing: border-box;
	}

	input::placeholder,
	textarea::placeholder {
		color: rgba(255, 255, 255, 0.18);
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: rgba(255, 255, 255, 0.2);
		background: rgba(255, 255, 255, 0.06);
	}

	.submit {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.65rem 1.25rem;
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 999px;
		color: rgba(255, 255, 255, 0.85);
		font-size: 0.72rem;
		letter-spacing: 0.06em;
		cursor: pointer;
		transition:
			background 0.2s,
			border-color 0.2s,
			color 0.2s;
		align-self: flex-end;
		margin-top: 0.25rem;
	}

	.submit:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.13);
		border-color: rgba(255, 255, 255, 0.28);
		color: white;
	}

	.submit:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.spinner {
		width: 10px;
		height: 10px;
		border: 1.5px solid rgba(255, 255, 255, 0.2);
		border-top-color: rgba(255, 255, 255, 0.8);
		border-radius: 50%;
		animation: spin 0.7s linear infinite;
	}

	/* success */
	.success-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 3rem 1rem;
		text-align: center;
		animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	.success-icon {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		border: 1px solid rgba(74, 222, 128, 0.3);
		background: rgba(74, 222, 128, 0.08);
		color: #4ade80;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1rem;
	}

	.success-title {
		font-size: 0.9rem;
		font-weight: 300;
		color: rgba(255, 255, 255, 0.85);
		margin: 0;
	}

	.success-sub {
		font-size: 0.68rem;
		color: rgba(255, 255, 255, 0.35);
		margin: 0;
	}

	@keyframes slide-up {
		from {
			opacity: 0;
			translate: 0 8px;
		}
		to {
			opacity: 1;
			translate: 0 0;
		}
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.4;
		}
	}

	@keyframes spin {
		to {
			rotate: 360deg;
		}
	}
</style>
