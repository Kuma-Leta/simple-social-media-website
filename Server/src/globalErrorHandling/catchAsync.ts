// src/utils/catchAsync.ts
import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middleware/authenticationMiddleware";

const catchAsync = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
