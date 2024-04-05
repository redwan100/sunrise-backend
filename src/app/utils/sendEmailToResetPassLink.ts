import nodemailer from "nodemailer";
import config from "../config";

const sendEmailToResetPassLink = async (link: string,userEmail:string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: config.node_env === "production", // Use `true` for port 465, `false` for all other ports
      auth: {
        user: config.send_email,
        pass: config.app_pass,
      },
    });

    await transporter.sendMail({
      from: config.send_email, // sender address
      to: userEmail, // list of receivers
      subject: "Password reset link ✔", // Subject line
      text: "valid only 5 minutes", // plain text body
      html: `
      <div>
      <h1>Password Reset link</h1>
      <div>
       ${link}
      </div>
      </div>
      
      `, // html body
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export default sendEmailToResetPassLink;
