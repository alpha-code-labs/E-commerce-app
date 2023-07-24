// sendmail.js
import nodemailer from "nodemailer";
import { compostMail } from "./content.js";

const sendMail = async (req, res) => {
  try {
    let testAccount = await nodemailer.createTestAccount();
    // Connect with the SMTP
    let transporter = await nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: "cshashank899@gmail.com",
        pass: "OKU3xg7ERT21d4Sv",
      },
    });

    const { to } = req.body;

    if (!to || !Array.isArray(to) || to.length === 0) {
      return res.status(400).json({ error: "Invalid email recipients provided" });
    }

    const subject = "Welcome to Alpha Code Labs subsdiary of Studio Code";
    const text = compostMail
    const html = compostMail
    // const html = "<b>Welcome to our website! We are glad you joined us.</b>";

    const info = await transporter.sendMail({
      from: '"Shashank Chauhan 👻" <cshashank899@gmail.com>', // sender address
      to: to.join(", "), // Combine the array of email addresses into a comma-separated string
      subject: subject,
      text: text,
      html: html,
    });

    console.log("Message sent: %s", info.messageId);

    res.json(info);
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending email" });
  }
};

export { sendMail };
