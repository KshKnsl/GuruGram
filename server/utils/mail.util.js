import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAILPASSWORD,
  },
});

const baseStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'DM Sans', Georgia, sans-serif; background-color: #0b0b0b; color: #d6d3cb; -webkit-font-smoothing: antialiased; }
  .wrapper { background-color: #0b0b0b; padding: 48px 16px; }
  .container { max-width: 580px; margin: 0 auto; background-color: #0f0f0f; border: 1px solid rgba(201,168,76,0.18); }

  .header { padding: 36px 40px 28px; border-bottom: 1px solid rgba(201,168,76,0.12); }
  .brand { font-family: 'Playfair Display', Georgia, serif; font-size: 22px; font-weight: 900; color: #f5f0e8; letter-spacing: -0.5px; }
  .brand span { color: #c9a84c; }
  .accent-line { display: block; width: 32px; height: 2px; background-color: #c9a84c; margin-top: 10px; }

  .hero { padding: 44px 40px 36px; border-bottom: 1px solid rgba(201,168,76,0.12); }
  .label { display: block; font-size: 10px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: #c9a84c; margin-bottom: 14px; }
  .headline { font-family: 'Playfair Display', Georgia, serif; font-size: 36px; font-weight: 900; line-height: 1.15; color: #f5f0e8; letter-spacing: -0.5px; }
  .headline em { font-style: italic; color: #c9a84c; }
  .subtext { margin-top: 16px; font-size: 14px; font-weight: 300; line-height: 1.7; color: #9ca3af; }

  .body-section { padding: 36px 40px; border-bottom: 1px solid rgba(201,168,76,0.12); }

  .feature-item { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 18px; }
  .feature-dot { flex-shrink: 0; width: 6px; height: 6px; background-color: #c9a84c; margin-top: 7px; }
  .feature-text { font-size: 14px; line-height: 1.6; color: #d6d3cb; }
  .feature-text strong { color: #f5f0e8; font-weight: 500; }

  .stat-row { display: flex; border: 1px solid rgba(201,168,76,0.15); margin-bottom: 28px; }
  .stat-item { flex: 1; padding: 18px 16px; text-align: center; border-right: 1px solid rgba(201,168,76,0.15); }
  .stat-item:last-child { border-right: none; }
  .stat-number { display: block; font-family: 'Playfair Display', Georgia, serif; font-size: 24px; font-weight: 900; color: #c9a84c; }
  .stat-label { display: block; font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase; color: #6b7280; margin-top: 4px; }

  .cta-section { padding: 36px 40px; text-align: center; border-bottom: 1px solid rgba(201,168,76,0.12); }
  .cta-button { display: inline-block; padding: 14px 36px; background-color: #c9a84c; color: #0b0b0b; text-decoration: none; font-size: 11px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%); }
  .cta-note { margin-top: 16px; font-size: 12px; color: #6b7280; }

  .footer { padding: 28px 40px; }
  .footer-brand { font-family: 'Playfair Display', Georgia, serif; font-size: 14px; font-weight: 900; color: #3d3d3d; margin-bottom: 10px; }
  .footer-text { font-size: 11px; color: #4b5563; line-height: 1.6; }
  .footer-link { color: #c9a84c; text-decoration: none; }
`;

const shell = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>${baseStyle}</style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="brand">Guru<span>Gram</span></div>
        <span class="accent-line"></span>
      </div>
      ${content}
      <div class="footer">
        <div class="footer-brand">GuruGram</div>
        <div class="footer-text">
          You're receiving this because you have an account at GuruGram.<br />
          Questions? Reach us at <a href="mailto:info@gurugram.com" class="footer-link">info@gurugram.com</a><br />
          &copy; ${new Date().getFullYear()} GuruGram. All rights reserved.
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

async function sendMail(name, toEmail, purpose) {
  let content = "";
  let subject = "";

  switch (purpose) {
    case "CreateAccount":
      subject = "Welcome to GuruGram — Your Mentorship Journey Begins";
      content = shell(`
        <div class="hero">
          <span class="label">Welcome aboard</span>
          <h1 class="headline">Hello, <em>${name}</em>.<br />Your journey starts now.</h1>
          <p class="subtext">You've joined a community of ambitious learners and world-class mentors. We're glad you're here.</p>
        </div>

        <div class="body-section">
          <div class="stat-row">
            <div class="stat-item"><span class="stat-number">12K+</span><span class="stat-label">Mentors</span></div>
            <div class="stat-item"><span class="stat-number">98K+</span><span class="stat-label">Sessions</span></div>
            <div class="stat-item"><span class="stat-number">4.9★</span><span class="stat-label">Rating</span></div>
          </div>

          <div class="feature-item">
            <div class="feature-dot"></div>
            <div class="feature-text"><strong>Personalized matching</strong> — our AI pairs you with mentors aligned to your exact goals and learning style.</div>
          </div>
          <div class="feature-item">
            <div class="feature-dot"></div>
            <div class="feature-text"><strong>1-on-1 sessions</strong> — book directly with industry professionals, no back-and-forth.</div>
          </div>
          <div class="feature-item">
            <div class="feature-dot"></div>
            <div class="feature-text"><strong>Track your growth</strong> — detailed progress analytics and milestone badges along the way.</div>
          </div>
          <div class="feature-item">
            <div class="feature-dot"></div>
            <div class="feature-text"><strong>Global access</strong> — connect with experts across 140+ countries and time zones.</div>
          </div>
        </div>

        <div class="cta-section">
          <a href="https://gurugram.vercel.app" class="cta-button">Explore GuruGram</a>
          <p class="cta-note">Find your mentor and book your first session today.</p>
        </div>
      `);
      break;

    case "Login":
      subject = "Welcome Back to GuruGram";
      content = shell(`
        <div class="hero">
          <span class="label">Welcome back</span>
          <h1 class="headline">Good to see you again, <em>${name}</em>.</h1>
          <p class="subtext">Your mentorship journey continues. Here's what's waiting for you.</p>
        </div>

        <div class="body-section">
          <div class="feature-item">
            <div class="feature-dot"></div>
            <div class="feature-text"><strong>5 new mentor recommendations</strong> based on your updated interests and goals.</div>
          </div>
          <div class="feature-item">
            <div class="feature-dot"></div>
            <div class="feature-text"><strong>3 upcoming webinars</strong> in your field — early access available for active members.</div>
          </div>
          <div class="feature-item">
            <div class="feature-dot"></div>
            <div class="feature-text"><strong>Skill Assessment</strong> is now live — track your progress and identify where to focus next.</div>
          </div>
        </div>

        <div class="cta-section">
          <a href="https://gurugram.vercel.app" class="cta-button">Go to Dashboard</a>
          <p class="cta-note">Consistent sessions lead to the best results.</p>
        </div>
      `);
      break;

    default:
      subject = "A note from GuruGram";
      content = shell(`
        <div class="hero">
          <span class="label">GuruGram</span>
          <h1 class="headline">Hello, <em>${name}</em>.</h1>
          <p class="subtext">We hope you're having a great experience. If you have any questions or need support, we're always here.</p>
        </div>

        <div class="cta-section">
          <a href="https://gurugram.vercel.app" class="cta-button">Visit GuruGram</a>
          <p class="cta-note">Our support team is available anytime at <a href="mailto:info@gurugram.com" style="color:#c9a84c;">info@gurugram.com</a></p>
        </div>
      `);
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: toEmail,
      subject: subject,
      html: content,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export { sendMail };
