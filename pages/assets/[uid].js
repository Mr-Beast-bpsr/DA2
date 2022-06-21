import axios from "axios";
import React, { useEffect } from "react";
import MyNFT from "../../components/MyNFT";

const mynft = (props) => {
  return <MyNFT props={props} />;
};

export default mynft;

export async function getServerSideProps(context) {
  let { params } = context;
  let address = await params.uid;
  // console.log(address)

  let data = await axios.post("http://52.9.60.249:4000/api/v1/nft/getmynft", {
    userAddress: address,
  });
  let claimData = await axios.post(
    "http://52.9.60.249:4000/api/v1/nft/getclaimitem",
    { userAddress: address }
  );

  // console.log(data.data)
  {
    return {
      props: {
        address: address,
        data: data.data,
        claimData: claimData.data,
      },
    };
  }
}
