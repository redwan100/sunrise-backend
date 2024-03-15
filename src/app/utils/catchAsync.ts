import { NextFunction, Request, Response } from "express";

const catchAsync = async (fn) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
      resolve(fn);
    });
  };
};

export default catchAsync;
