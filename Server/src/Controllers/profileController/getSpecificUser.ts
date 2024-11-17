import Jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../../middleware/authenticationMiddleware";
import { userModel } from "../../models/userModel";
import { AppCheck } from "firebase-admin/lib/app-check/app-check";
import AppError from "../../globalErrorHandling/appError";
const getSpecificUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params;

  if (!token) {
    return next(new AppError("no token found", 404));
  }
  const decoded = (await Jwt.verify(
    token,
    process.env.JWT_SECRET || "default"
  )) as JwtPayload;
  const User = await userModel.findById(decoded.id);
  res.status(200).json({ status: "success", User });
};
export default getSpecificUser;
