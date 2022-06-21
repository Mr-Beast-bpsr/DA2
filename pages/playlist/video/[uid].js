import React from 'react'
import VideoPlayer from '../../../components/Music/VideoPlayer'
import axios from 'axios'
const video = (props) => {

  console.log(props)
  return (
<VideoPlayer props={props} />
  )
}

export default video;
export async function getServerSideProps(context) {

  const { params } = await context;
let {uid} = params;

let datafirst = await axios.post("http://52.9.60.249:4000/api/v1/nft/getplaylist",{userAddress:uid});
console.log(datafirst.data.data)
let data = datafirst.data.data
let arr =[ ]
data.map(item=>{
  if(item.imageType== 1){
    arr.push(item)
  }
})

return {
  props: {
data: arr
  },
};
}