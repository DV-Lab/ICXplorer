import connectMongo from "middlewares/connectMongo";
import ContractModel from "models/contract.model";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const contracts = await ContractModel.find(
        {},
        "name summary version icon"
      );
      return res.status(200).json(contracts);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
  return res.status(404).json({ error: "Page not found" });
};

export default connectMongo(handler);
