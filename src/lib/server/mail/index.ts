import nodemailer, { type SendMailOptions } from 'nodemailer';
import { getLanguage } from './lang';
import mustache from 'mustache';
import juice from 'juice';
import { THEME } from '$lib/defaults';
import VERIFICATION_TEMPLATE from './templates/verification.html?raw';
import { env } from '$env/dynamic/private';

const { MAIL_HOST, MAIL_PORT, MAIL_FROM, MAIL_SECURE, MAIL_USER, MAIL_PASS } = env;

if (!MAIL_HOST || !MAIL_FROM || !MAIL_PORT || !MAIL_USER || !MAIL_PASS) {
	throw new Error('MAIL_HOST, MAIL_PORT,  MAIL_USER, MAIL_PASS not set');
}

const isSecure = (value?: string | undefined) => {
	if (value == null) {
		return true;
	}
	return value === 'true' || value === '1' || value === 'yes';
};

const transporter = nodemailer.createTransport({
	name: 'Mailgun',
	host: MAIL_HOST,
	port: MAIL_PORT,
	secure: isSecure(MAIL_SECURE),
	auth: {
		type: 'login',
		user: MAIL_USER,
		pass: MAIL_PASS
	},
	connectionTimeout: 60000
});

export const mail = async (to: string, subject: string, content: string, html = true) => {
	const mailOptions: SendMailOptions = {
		from: MAIL_FROM,
		to,
		subject
	};

	if (html) {
		mailOptions.html = content;
	} else {
		mailOptions.text = content;
	}

	await transporter.sendMail(mailOptions);
};

export const sendVerificationMail = async (
	to: string,
	key: string,
	lang: string = 'en',
	theme: THEME = THEME.LIGHT
) => {
	const language = getLanguage(lang);
	const html = mustache.render(VERIFICATION_TEMPLATE, {
		bg: theme === THEME.DARK ? '#27272a' : '#f4f4f5',
		color: theme === THEME.DARK ? '#e4e4e7' : '#27272a',
		accent: theme === THEME.DARK ? '#115e59' : '#2dd4bf',
		headline: language.verification_headline,
		body: language.verification_body,
		key
	});
	const htmlWithInlineStyles = juice(html);
	await mail(to, language.verification, htmlWithInlineStyles);
};
