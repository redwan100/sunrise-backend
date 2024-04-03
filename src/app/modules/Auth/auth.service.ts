import jwt from "jsonwebtoken";
import config from "../../config";
import User from "../user/user.model";

const userLoginIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const user = await User.isUserExists(payload.email);
  const isPasswordMatch = await User.isPasswordMatch(
    payload.password,
    user.password,
  );

  if (!user) {
    throw new Error("user not found");
  }
  const { isDelete } = user;
  if (isDelete) {
    throw new Error("user is deleted");
  }

  const { status } = user;
  if (status === "blocked") {
    throw new Error("user is blocked");
  }

  if (!isPasswordMatch) {
    throw new Error("password not match");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt.jwt_secret as string, {
    expiresIn: config.jwt.jwt_expires_in,
  });

  const refreshToken = jwt.sign(jwtPayload, config.jwt.jwt_refresh as string, {
    expiresIn: config.jwt.refresh_expires_in,
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  userLoginIntoDB,
};
