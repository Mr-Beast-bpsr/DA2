import axios from "axios";
export default async function handler(req, res) {
  if (req.method === "POST") {
    // console.log(types)
    let data = req.body;
    console.log(data);
    let datafirst = await axios.post(
      "http://52.9.60.249:4000/api/v1/nft/removedata",
      data
    );
    // console.log(datafirst.data.data)
    res.status(200).json({ data: datafirst.data.data });
  }
  //   res.status(500).json({ error: "This page doesn't  exist" })
}
