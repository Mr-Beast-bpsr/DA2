import React from "react";
import MusicPlayer from "../../components/Music/MusicPlayer";
import axios from "axios";

const musicplayer = (props) => {
  return <MusicPlayer props={props} />;
};

export default musicplayer;
export async function getServerSideProps(context) {
  const { params } = await context;
  let { uid } = params;

  let datafirst = await axios.post(
    "http://52.9.60.249:4000/api/v1/nft/getplaylist",
    { userAddress: uid }
  );
  // console.log(datafirst);
  let data = datafirst.data.data;
  let arr = [];
  data.map((item) => {
    if (item.imageType == 1 || item.imageType == 2) {
      arr.push(item);
    }
  });

  return {
    props: {
      data: arr,
    },
  };
}
