import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { GMAIL_USER, GMAIL_PASS } from '$env/static/private';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const name = data.get('name')?.toString().trim();
		const email = data.get('email')?.toString().trim();
		const subject = data.get('subject')?.toString().trim();
		const message = data.get('message')?.toString().trim();

		// basic validation
		if (!name || !email || !message) {
			return fail(400, {
				error: 'Please fill in all required fields.',
				values: { name, email, subject, message }
			});
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, {
				error: 'Please enter a valid email address.',
				values: { name, email, subject, message }
			});
		}
		console.log(email)

		try {
			const transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: GMAIL_USER,
					pass: GMAIL_PASS
				}
			});

			const mailOptions = {
				from: email,
				to: GMAIL_USER,
				replyTo: email,
				subject: subject,
				text: message
			};

			await transporter.sendMail(mailOptions);

			return { success: true };
		} catch (e) {
			return fail(500, {
				error: 'Something went wrong. Please try again.',
				values: { name, email, subject, message }
			});
		}
	}
};
