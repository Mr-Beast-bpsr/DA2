// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
export default async function handler(req, res) {
  if (req.method === "POST") {
    let data = req.body;
    // console.log(data.userAddress)
    let dataFirst = await axios.post(
      "http://52.9.60.249:4000/api/v1/nft/getview",
      data
    );
    // console.
    // console.log(dataFirst.data.data)
    // let dataSecond = await axios.post('http://52.9.60.249:4000/api/v1/nft/getclaimitem',{userAddress:data.userAddress})
    // console.log(dataSecond.data.data)
    res.status(200).json({ data: dataFirst.data.data });
  }
}
