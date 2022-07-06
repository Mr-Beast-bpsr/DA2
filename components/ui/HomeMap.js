import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LinearProgress } from "@mui/material";
import ManPic from "../../public/man-pic1.jpg";
import videoImg from "../../public/video-img.PNG";
// import avaxLogo from "../../public/avax-logo.png";
// import { homeNFTs } from '../walletInteractions/connect';
import { useAppContext, useFilterContext } from "../../context/GlobalState";
import axios from "axios";
import {useAccount} from "wagmi" 
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";

const HomeMap = (props) => {
  const account = useAccount()
  const { filterArray, setFilterArray } = useFilterContext();
  console.log(filterArray);
  console.log(props);
  //   const [activ,setActive] = useState(false)

  const [types, setTypes] = useState(props.types);

  useEffect(() => {
    console.log(filterArray);
  }, [filterArray]);
  const { active, setActive } = useAppContext();
  const handleOpenModal = () => setActive(true);

  const [totalURI, setTotalURI] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  async function homeNFTs() {
    const response = await axios.post("api/home");
    const data = await response.data;
    setTotalURI(data.data);
    console.log(data.data);
  }

  async function typesHomeNFTs() {
    let dataa = filterArray.list.join(", ");
    console.log(dataa);
    let datas = {
      types: dataa,
    };

    const response = await axios.post(
      "api/home/filters/nftbyproperties",
      datas
    );
    const data = await response.data;
    setTotalURI(data.data);
    console.log(data.data);
  }

  async function filterNfts() {
    const response = await axios.post(
      "api/home/filters/filtersapi",
      props.filters
    );
    const data = await response.data;
    setTotalURI(data.data);
    console.log(data);
  }
  async function mixFilter() {
    let dat = props.types.join(", ");
    console.log(dat);
    let finalData = Object.assign(props.filters, { types: dat });
    console.log(finalData);
    const response = await axios.post("api//homefilters/filtersapi", finalData);
    const dataa = await response.data;
    setTotalURI(dataa.data);
  }
  async function searchNfts() {
    const response = await axios.post("api/home/filters/textsearch", {
      textSearch: props.search,
    });
    const dataa = await response.data;
    setTotalURI(dataa.data);
  }
  useEffect(() => {
    setTypes(props.types);
    if (props.search !== "" && props.search !== null) {
      searchNfts();
      return;
    }
    if (props.filters !== null && filterArray.list.every((e) => e != 0)) {
      console.log("first");
      mixFilter();
      return;
    }
    // if (props.filters.OnSale)
    if (props.filters !== null) {
      filterNfts();
      return;
    }
    if (filterArray.list.every((e) => e === 0)) {
      homeNFTs(setTotalSupply, setTotalURI, setErrorMessage, totalURI);
      console.log(types);
      return;
    }
    typesHomeNFTs();
    console.log(types);
  }, [props]);

  //

  return (
    <>
      {" "}
      {totalURI != null ? (
        totalURI
          .sort((a, b) => {
            if (props.priceFilter === "1") {
              return a.finalPrice - b.finalPrice;
            } else if (props.priceFilter === "2") {
              return b.finalPrice - a.finalPrice;
            } else if (props.priceFilter === "3") {
              return b.totalViews - a.totalViews;
            } else if (props.priceFilter === "4") {
              return (
                new Date(b.recentlySold).getTime() -
                new Date(a.recentlySold).getTime()
              );
            }
          })
          .map((uri, i) => {
            // console.log(uri.finalPrice);
            // console.log(new Date(uri.recentlySold))
            console.log(uri.imageType == false, uri.imageType);
            return (
              <Link
                href={{
                  pathname: "/Collections/" + uri.id,
                  query: { address: account.data?.address},
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
          <h4> {errorMessage === null ? "Loading..." : errorMessage}</h4>
          <LinearProgress
            style={{ width: "100%", height: "0.3rem" }}
            color="secondary"
          />
        </div>
      )}
    </>
  );
};

export default HomeMap;
