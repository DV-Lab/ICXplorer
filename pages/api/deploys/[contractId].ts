import connectMongo from "middlewares/connectMongo";
import DeployModel from "models/deploy.model";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { contractId } = req.query;
      const deploy = await DeployModel.findOne({ contractId });
      if (!deploy) {
        return res.status(404).json({ error: "Not found" });
      }
      return res.status(200).json(deploy);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
  return res.status(404).json({ error: "Page not found" });
};

export default connectMongo(handler);
