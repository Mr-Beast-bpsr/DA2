import React from "react";
import NftPage from "../../components/NftPage";
import axios from "axios";

const index = (props) => {
  return <NftPage props={props} />;
};

export default index;

export async function getServerSideProps(context) {
  const { params } = await context;
  const {query} = await context;
  // console.log(query.address)
  
  const id = await params.uid;
  let tokenId = {
    tokenId: id,
    userAddress: 1,
  }; 
  try{

    const res = axios.post("http://52.9.60.249:4000/api/v1/nft/saveview", {
      tokenId: id,
    });
    const rest = await axios.post(
      "http://52.9.60.249:4000/api/v1/nft/getView",
      {tokenId:id, userAddress:query.address}
      );
      
      console.log(rest, "rest")
      const dat = await axios.post("http://52.9.60.249:4000/api/v1/nft/getnft", {
        id: id,
      });
      console.log(dat, "dat")
      const data = dat.data.data;
      const check = await axios.post("http://52.9.60.249:4000/api/v1/nft/checknftinauction",{tokenId : data.nftContent.nftIndex})
      console.log(check.data)
      const auctionData = check.data.data
      const viewData = await rest.data.data;
   
      return {
        props: {
          id,
          viewData,
          data,auctionData
        },
      };
    }catch (er) {console.log(er)}
}
