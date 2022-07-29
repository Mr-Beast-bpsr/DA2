import React from "react";

import axios from "axios";
import CollectionNft from "../../components/ui/CollectionNft";
import Collections from "../../components/Collections";

const index = (props) => {
  return <Collections props={props}/>;
};

export default index;

export async function getServerSideProps(context) {
  const { params } = await context;

  const id = await params.uid;
  console.log(id);
  try {
    const res = await axios.post(
      "http://52.9.60.249:4000/api/v1/nft/getcollectiondata",
      {
        id: id,
      }
    );

    console.log(res.data.data);
    let data = res.data.data;
    return {
      props: {
        data,
      },
    };
  } catch (er) {
    console.log(er);
  }
}
