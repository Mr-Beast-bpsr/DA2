import axios from "axios";
export default async function handler(req, res) {
  if (req.method === "POST") {
    // console.log(types)

    let datafirst = await axios.post("http://52.9.60.249:4000/api/v1/nft/list");
    // console.log(datafirst.data.data)
    res.status(200).json({ data: datafirst.data.data });
  }
  // res.status(500).json({ error: "This page doesn't  exist" })
}

//     // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import axios from 'axios'
// export default async function handler(req, res) {

// if (req.method === 'POST') {
// const types= req.body;
// console.log(value)
// var data = JSON.stringify({
//   // "typeOfProperty": `${value}`
// });

// try{

//   let datafirst = await axios.post('http://52.9.60.249:4000/api/v1/nft/searchnft',types)
//   res.status(200).json({"data": datafirst.data.data})
// }catch(err){

// }
// // console.

// }
// }
