import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LinearProgress } from "@mui/material";
import axios from "axios";
const CollectionMap = (props) => {
    const [active,setActive] = useState(false)
  const handleOpenModal = () => setActive(true);
  const [totalURI, setTotalURI] = useState(null);
  async function homeNFTs() {
    const response = await axios.post("api/home/collections");
    const data = await response.data;
    setTotalURI(data.data);
    console.log(data.data);
    const dataa = await response.data;
    setTotalURI(dataa.data);
  }
  useEffect(() => {
homeNFTs();
  },[])

  return (
    <>
      {" "}
      { active ==true ||  totalURI != null  ? (
        totalURI.map((uri, i) => {
        
          return (
            <Link
              href={{
                pathname: "/Collections/" + uri.id,
  
              }}
              key={i}
            >
              <div className="card" onClick={handleOpenModal}>
                <a>
                  {uri.imageType ? (
                    <img
                      src={uri.featuredImage||uri.logoImage}
                      style={
                        uri.featuredImage
                          ? {}
                          : { paddingTop: "65px", paddingBottom: "65px" }
                      }
                      className="card-img-top"
                      alt="..."
                    />
                  ) : (
                    <img
                      src={uri.featuredImage|| uri.logoImage}
                      className="card-img-top"
                      alt="..."
                    />
                  )}

                  <div className="card-body">
                    <h6 className="card-h">{uri.name}</h6>
                    <div className="card-part">
                      <div className="card-content">
                        <p className="card-text">Current Price </p>
                      
                      </div>
                      {/* <div className="card-content">
                        {/* <p className="card-text">{uri.listed} </p> */}
                        {/* <p className="card-para"> <strong>14</strong>m  <strong> 53</strong>s </p> */}
                      {/* </div> */} 
                    </div>
                  </div>
                </a>
              </div>
            </Link>
          );
        })
      ) : (
        <div className="container mt-5">
          {/* <h4> {errorMessage === null ? "Loading..." : errorMessage}</h4> */}
          <LinearProgress
            style={{ width: "100%", height: "0.3rem" }}
            color="secondary"
          />
        </div>
      )}
    </>
  );
};

export default CollectionMap;
