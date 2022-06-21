import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;

      // console.log(data);
      let datafirst = await axios.post(
        "http://52.9.60.249:4000/api/v1/nft/checknftinauction",
        data
      );
      res.status(200).json({ data: datafirst.data.data });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}
