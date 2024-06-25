import { AuthenticatedRequest } from "./../../middleware/authenticationMiddleware";
import { Response, NextFunction } from "express";
import { userModel } from "../../models/userModel";
import AppError from "../../globalErrorHandling/appError";
import crypto from "crypto";
export const resetPassword = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await userModel.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Password reset successful!",
  });
};
