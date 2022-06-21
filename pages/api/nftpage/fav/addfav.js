// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
export default async function handler(req, res) {
  if (req.method === "POST") {
    let data = req.body;
    
    console.log(data)
    let dataFirst = await axios.post(
      "http://52.9.60.249:4000/api/v1/nft/addtofav",
      data
    );
    // console.
    console.log(dataFirst.data.data);

    res.status(200).json({ data: dataFirst.data.data });
  }
}
