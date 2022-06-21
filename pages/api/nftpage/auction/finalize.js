import axios from "axios";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;
      // const response = await axios.post("https://api.stierapp.com/api/v1/auth/signin", data)
      // const dataa = await response.data
      // const token = dataa.data.token;

      // const finalData =  JSON.stringify(data)
      console.log(data);
      let datafirst = await axios.post(
        "http://52.9.60.249:4000/api/v1/nft/finalizedauction",
        data
      );
      let dataSecond = await axios.post(
        "http://52.9.60.249:4000/api/v1/nft/closebid",
        data
      );

      res
        .status(200)
        .json({ data: datafirst.data.data, dataSecond: dataSecond.data.data });
    } catch (err) {
      res.status(500).json({});
      console.log(err);
    }
  }
}
