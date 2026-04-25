<script lang="ts">
	import ContactLayout from '$lib/components/html/pageLayouts/ContactLayout.svelte';
	import { enhance } from '$app/forms';
	import { Download } from '@lucide/svelte';
    import resume from "$lib/assets/cv.pdf"

	let { form } = $props();

	let loading = $state(false);

	const social = [
		{
			label: 'GitHub',
			href: 'https://github.com/',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`
		},
		{
			label: 'LinkedIn',
			href: 'https://linkedin.com/',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`
		},
		{
			label: 'Twitter',
			href: 'https://twitter.com/',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`
		}
	];
</script>

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
				<a href="mailto:your@email.com" class="email-link"> your@email.com </a>

				<div class="social-links">
					{#each social as link}
						<a
							href={link.href}
							target="_blank"
							rel="noopener"
							class="social-link"
							aria-label={link.label}
						>
							{@html link.icon}
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
				<span class="dot" />
				<span>Available for new opportunities</span>
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
							<span class="spinner" />
							Sending...
						{:else}
							Send message →
						{/if}
					</button>
				</form>
			{/if}
		</div>
	</div>
</ContactLayout>

<style>
	.contact-root {
		width: 100%;
		min-height: 100%;
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
