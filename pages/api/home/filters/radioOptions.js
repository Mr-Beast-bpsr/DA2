// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
export default async function handler(req, res) {
  if (req.method === "POST") {
    var data = JSON.stringify({
      // "typeOfProperty": `${value}`
    });

    let datafirst = await axios.post(
      "http://52.9.60.249:4000/api/v1/admin/properties/getalltypes"
    );
    // console.

    res.status(200).json({ data: datafirst.data.data });
  }
}
