import { AuthenticatedRequest } from "../../middleware/authenticationMiddleware";
import { UserModel } from "../../models/models";
import nodemailer from "nodemailer";

import bcrypt from "bcrypt";
import { Response } from "express";
import { generatePassword } from "./generatePassword";
export const resetPassword = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    // Retrieve the user's ID from the authenticated request
    const userId = req.user._id;
    let testAccount = await nodemailer.createTestAccount();
    // Find the user in the database
    const user = await UserModel.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const email = user.email;

    // Generate a random password
    const newPassword = generatePassword();

    // Send email with the new password
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const mailOptions = {
      from: "kumaleta2021@gmail.com", // sender address
      to: email, // list of receivers
      subject: "password reset", // Subject line
      text: "change your password as soon as possible", // plain text body
      html: `${user.name}"<b>Hello ! your new password is:</b>" ${newPassword}`, // html body
    };

    await transporter
      .sendMail(mailOptions)
      .then((info: any) => {
        res.status(201).json({
          message: `Password reset successful. Check your email for the new password.`,
          info: info.messageId,
          preview: nodemailer.getTestMessageUrl(info),
        });
      })
      .catch((error: any) => {
        res.status(500).json({ message: "internal server error" });
      });

    // Update the user's password in the database
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the password
    await UserModel.findByIdAndUpdate(userId, { password: hashedPassword });
  } catch (error) {
    console.error("Error resetting password:", error);
    res
      .status(500)
      .json({ error: "An error occurred while resetting the password." });
  }
};
