import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // var axios = require("axios");
      var data = "";

      var config = {
        method: "post",
        url: "http://52.9.60.249:4000/api/v1/nft/getallcollection",
        headers: {},
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          res.status(200).json(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}
