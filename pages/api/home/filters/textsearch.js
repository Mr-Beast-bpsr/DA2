// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
export default async function handler(req, res) {
  if (req.method === "POST") {
    // var data = JSON.stringify({
    //   // "typeOfProperty": `${value}`
    // });

    try {
      const text = await req.body;
      // console.log(types)
      // let data = JSON.parse({"types":types})
      // console.log(data)
      // console.log(types)
      // console.log(types)
      let datafirst = await axios.post(
        "http://52.9.60.249:4000/api/v1/nft/textsearch",
        text
      );
      res.status(200).json({ data: datafirst.data.data });
    } catch (err) {
      // console.log(err)
      res.status(500).json({ error: err });
    }
    // console.
  }
}
