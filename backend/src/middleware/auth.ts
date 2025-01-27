import { NextFunction, Request, Response } from "express";

import { AuthError } from "../errors/auth";
import { decodeAuthToken } from "../services/auth";

const verifyAuthToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token =
    authHeader && authHeader.split(" ")[0] === "Bearer" ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res
      .status(AuthError.TOKEN_NOT_IN_HEADER.status)
      .send(AuthError.TOKEN_NOT_IN_HEADER.displayMessage(true));
  }

  try {
    // Decode the token and get user info
    const userInfo = await decodeAuthToken(token);

    // Attach the user UID to the request object
    req.body.uid = userInfo.uid;

    // Proceed to the next middleware or route handler
    next();
    return;
  } catch (error) {
    // Handle error in case of token decoding failure
    return res
      .status(AuthError.INVALID_AUTH_TOKEN.status)
      .send(AuthError.INVALID_AUTH_TOKEN.displayMessage(true));
  }
};

export { verifyAuthToken };

// import { NextFunction, Request, Response } from "express";

// import UserModel from "../models/user";

// export type PsycheRequest = {
//   userUid?: string;
// } & Request;

// const requireSignedIn = async (req: PsycheRequest, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization;
//   // Token shoud be "Bearer: <token>"
//   const token = authHeader?.split("Bearer ")[1];
//   if(!token){
//     return res.status(401).send({error: "Authorization token is required"});
//   }

//   try{
//     const userInfo = await decodeAuthToken(token);
//     req.userUid = userInfo.uid;
//     const user = await UserModel.findOne({uid: userInfo.uid});
//     if(!user){
//       return res.status(404).send({error: "User does not exist"});
//     }
//     next();
//   }
//   catch(error){
//     return res.status(401).send({error: "Invalid token"});
//   }

// };

// export { requireSignedIn };
