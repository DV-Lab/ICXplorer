import { MONGO_URI } from "@env";
import mongoose from "mongoose";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const connectMongo =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (mongoose.connections[0].readyState) {
      // Use current db connection
      return handler(req, res);
    }
    // Use new db connection
    await mongoose.connect(MONGO_URI);
    return handler(req, res);
  };

export default connectMongo;
