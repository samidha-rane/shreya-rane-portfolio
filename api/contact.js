/**
 * Contact form handler (Vercel Serverless Function) -> POST /api/contact
 *
 * Sends each enquiry to your inbox through Resend (https://resend.com, free plan).
 * Set these in Vercel: Project > Settings > Environment Variables
 *   RESEND_API_KEY  (required)  your Resend API key
 *   CONTACT_TO      (optional)  where enquiries go, default shreyarane14@gmail.com
 *   CONTACT_FROM    (optional)  sender, default "Portfolio <onboarding@resend.dev>".
 *                               After you verify your own domain in Resend, use e.g.
 *                               "Shreya Rane Website <hello@yourdomain.com>".
 */

const SERVICES = ["SEO", "Google Ads", "SEO and Google Ads", "Conversion tracking or reporting", "Job opportunity", "Something else"];

const oneLine = (v) => String(v || "").replace(/[\r\n\t]+/g, " ").trim();
const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

module.exports = async (req, res) => {
  const isAjax = req.headers["x-requested-with"] === "fetch";

  const respond = (ok, message, code = 200) => {
    if (isAjax) {
      res.status(code).json({ ok, message });
    } else {
      res.writeHead(303, { Location: "/contact?status=" + (ok ? "sent" : "error") });
      res.end();
    }
  };

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return respond(false, "This address only accepts form submissions.", 405);
  }

  const body = req.body || {};

  // Spam checks: hidden honeypot field, and bots that submit instantly
  if (body.website) return respond(true, "Message sent. I'll reply within one working day.");
  const started = parseInt(body.form_time, 10) || 0;
  if (started && Date.now() / 1000 - started < 3) {
    return respond(false, "That was very fast. Please wait a moment and send again.", 429);
  }

  const name = oneLine(body.name);
  const email = oneLine(body.email);
  const phone = oneLine(body.phone);
  let service = oneLine(body.service);
  const message = String(body.message || "").trim();

  const errors = [];
  if (name.length < 2 || name.length > 80) errors.push("name");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 120) errors.push("email address");
  if (phone && !/^[+()\-\s\d]{7,20}$/.test(phone)) errors.push("phone number");
  if (message.length < 10 || message.length > 3000) errors.push("message");
  if (!SERVICES.includes(service)) service = "Not specified";
  if (errors.length) return respond(false, "Please check your " + errors.join(", ") + " and try again.", 422);

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return respond(false, "The form isn't set up yet. Please email me directly at shreyarane14@gmail.com.", 500);
  }

  const text =
    `You have a new message from your portfolio website.\n\n` +
    `Name:    ${name}\nEmail:   ${email}\nPhone:   ${phone || "-"}\nService: ${service}\n\n` +
    `Message:\n${message}\n`;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO || "shreyarane14@gmail.com"],
        reply_to: email,
        subject: `New enquiry from ${name} (${service})`,
        text,
        html: `<pre style="font-family:inherit;white-space:pre-wrap">${escapeHtml(text)}</pre>`,
      }),
    });
    if (!r.ok) {
      console.error("Resend error", r.status, await r.text());
      return respond(false, "Your message wasn't sent because the mail service didn't accept it. Please email me directly at shreyarane14@gmail.com.", 502);
    }
    return respond(true, "Message sent. I'll reply within one working day.");
  } catch (err) {
    console.error(err);
    return respond(false, "Your message wasn't sent. Please try again, or email me directly at shreyarane14@gmail.com.", 500);
  }
};
