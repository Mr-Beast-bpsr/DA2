import React from 'react'
import SellPage from '../../components/SellPage'

const sellingpage = (props) => {
  return (
    <SellPage id={props}/>
  )
}

export default sellingpage

export async function getServerSideProps(context) {
    const {params} = await context;
    const id = await params.uid;
   

      return {
        props: {
          
          id
        },
      };
    
    }