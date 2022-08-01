import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LinearProgress } from "@mui/material";
import axios from "axios";
import {useAccount} from "wagmi";
import {useAppContext} from "../../context/GlobalState";
const CollectionNft = ({props}) => {
    const { active, setActive } = useAppContext();
    const handleOpenModal = () => setActive(true);
  
  const [totalURI, setTotalURI] = useState(props);
const {address} =useAccount()
// console.log(props)

  return (
    <>
      {" "}
      { active ==true ||  totalURI != null && totalURI.length != 0 ? (
        totalURI.map((uri, i) => {
        console.log(uri)
          return (
            <Link
            href={{
              pathname: "/Collection/" + uri.id,
              query: { address: address},
            }}
            key={i}
          >
            <div className="card" onClick={handleOpenModal}>
              <a>
                {uri.imageType ? (
                  <img
                    src={uri.nftFeaturedImage|| videoImg.src}
                    style={uri.nftFeaturedImage? {}: { paddingTop: "65px", paddingBottom: "65px" }}
                    className="card-img-top"
                    alt="..."
                  />
                ) : (
                  <img
                    src={uri.nftImage}
                    className="card-img-top"
                    alt="..."
                  />
                )}

                <div className="card-body">
                  <h6 className="card-h">{uri.nftIndexName}</h6>
                  <div className="card-part">
                    <div className="card-content">
                      <p className="card-text">Current Price </p>
                      <p className="card-para">
                        {" "}
                        <strong>{uri.finalPrice || "0"}</strong> ETH
                      </p>
                    </div>
                    <div className="card-content">
                      <p className="card-text">{uri.listed} </p>
                      {/* <p className="card-para"> <strong>14</strong>m  <strong> 53</strong>s </p> */}
                    </div>
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
          {/* <LinearProgress
            style={{ width: "100%", height: "0.3rem" }}
            color="secondary"
          /> */}
          <img src="https://lh3.googleusercontent.com/RU4ImqNGSC2FvAYpmbW54KKTlx_n3k1eurN2Gz2tNpiyaG3al0ANwN8U7K4MWWOkdSnl88ymtUlfLUrDP02ieipsuXWCY9UNl2DkYb3VbBsCG0J6tsSwcmfUYLrE=e365-rw-v0-w580"/>
        </div>
      )}
    </>
  );
};

export default CollectionNft;
