import { handleCallback } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

const callbackHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await handleCallback(req, res);
  } catch (error:any) {
    res.status(error);
  }
};

export default callbackHandler;