import { handleProfile } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

const profileHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await handleProfile(req, res);
    } catch (error) {
        console.log(error)
    }
};

export default profileHandler;