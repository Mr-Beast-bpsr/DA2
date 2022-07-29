import axios from "axios";
export default async function handler(req, res) {
  if (req.method === "POST") {

    let datafirst = await axios.post("http://52.9.60.249:4000/api/v1/nft/getallcollection");

    res.status(200).json({ data: datafirst.data.data });
  }

}
