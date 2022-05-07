import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(9821, req.body);

  res.status(200).json({ message: "hooked" });
};
