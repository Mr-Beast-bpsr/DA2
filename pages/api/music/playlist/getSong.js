import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;
      console.log(data, "data here by nikhil");
      let datafirst = await axios.post(
        "http://52.9.60.249:4000/api/v1/nft/getplaylist",
        data
      );
      console.log(datafirst.data)
      res.status(200).json({ data: datafirst.data.data });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}
