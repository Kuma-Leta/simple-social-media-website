import bcrypt from "bcrypt";
import { sendEmail } from "./sendEmail";
import { NextFunction, Request, Response } from "express";
import { userModel } from "../../models/userModel";
import catchAsync from "../../globalErrorHandling/catchAsync";
import AppError from "../../globalErrorHandling/appError";
import { AuthenticatedRequest } from "../../middleware/authenticationMiddleware";
import crypto from "crypto";
export const forgotPassword = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new AppError("There is no user with that email address.", 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `http://localhost:5000/api/resetPassword/:${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      to: user.email,
      subject: "Your password reset token (valid for 10 min)",
      text: message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }
};
