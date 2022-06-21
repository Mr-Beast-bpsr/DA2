import React from "react";
import axios from "axios";
import Marketplace from "../components/Marketplace";

const index = (props) => {
  return <Marketplace props={props} />;
};

export default index;

export async function getServerSideProps(context) {
  const response = await axios.post(
    "http://52.9.60.249:4000/api/v1/admin/properties/getalltypes"
  );
  const data = await response.data.data;
  // console.log(data)
  return {
    props: {
      data,
    },
  };
}
