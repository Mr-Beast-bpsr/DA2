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
      const data1 = {
        userAddress: data.userAddress,
        id: data.id,
        amount: data.finalPrice,
      };
      let first = await axios.post(
        "http://52.9.60.249:4000/api/v1/nft/updateaddress",
        data1
      );

      let data2 = {
        userAddress: data.userAddress,
        tokenId: data.tokenIndex,
      };
      let datafirst = await axios.post(
        "http://52.9.60.249:4000/api/v1/nft/updateclaim",
        data2
      );

      res
        .status(200)
        .json({ data: datafirst.data.data, first: first.data.data });
    } catch (err) {
      res.status(500).json({ err });
      console.log(err);
    }
  }
}
