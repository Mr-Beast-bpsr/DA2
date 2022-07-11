import React, { useEffect, useState } from "react";
import ArrowLeft from "..//public/arrow-left.svg";

import EyeIcon from "../public/eye-icon.svg";

import { Accordion } from "react-bootstrap";
import Link from "next/link";
import ReactPlayer from "react-player/lazy";

import { useRouter } from "next/router";
import axios from "axios";

import { useAccount } from "wagmi";
import { ToastContainer, toast } from "react-toastify";

const NftPage = ({ props }) => {
  console.log(props);
  const [inPlaylist, setInPlaylist] = useState(props.viewData.inPlaylist);
  const [loading, setLoading] = useState(true);
  const [heartActive, setHeartActive] = useState(props.viewData.fav);
  const [auction, setAuction] = useState(props.auctionData);
  const [nftContent, setNftContent] = useState(props.data.nftContent);
  const [nftTraits, setNftTraits] = useState(props.data.traits);
  const router = useRouter();

  const [activity, setActivity] = useState(null);
  const [sell, setSell] = useState(false);
  const [auctionEnd, setAuctionEnd] = useState(null);
  const [claim, setClaim] = useState(false);
  const [cancelClaimButton, setCancelClaimButton] = useState(false);
  const [nftLink, setNftLink] = useState(null);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState(null);
  const [ended, setEnded] = useState(null);
  const [endAuction, setEndAuction] = useState(null);
  const data = useAccount();
  const [days, setDays] = useState(null);
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [distance, setDistance] = useState(2);

  function onBack() {
    router.back();
  }

  // const notify = () => t
  async function publicSaleHandler(e) {
    e.preventDefault();
    await buy(
      dataa.nftContent.nftIndex,
      props.id,
      auction.minAmount,
      setTransHash,
      setCloseModals,
      auction.id,
      setSuccess,
      collectionAddress
    );
    //  setCloseModals(true)
  }
  useEffect(() => {}, []);

  useEffect(() => {
    let owner = localStorage.getItem("address");
    setSell(data?.address?.toLowerCase() == nftContent.nftOwner?.toLowerCase());
    setAddress(data?.address);
    console.log(
      data?.address?.toLowerCase() == nftContent.nftOwner?.toLowerCase()
    );
    console.log(data, nftContent.nftOwner.toLowerCase());
    if (new Date().getTime() > new Date(auction?.endDate)) {
      setAuctionEnd(auction);
      setEnded(true);
    }
    apiCall();
  }, []);
  function onPlaceBid() {}
  async function finalizeAuction(e) {
    e.preventDefault();
    await finalize(
      dataa.nftContent.nftIndex,

      props.id,
      setTransHash,
      setCloseModals,
      auction.id,
      setSuccess,
      collectionAddress
    );
  }
  async function apiCall() {
    setTimeout(function () {
      setLoading(false);
    }, 3000);
  }
  useEffect(() => {
    apiCall2(auction);
  }, [auction]);
  async function apiCall2(data) {
    if (data == null) return;
    let checkUser = {
      userAddress: data?.address,
      auctionId: data.id,
      tokenId: nftContent.nftIndex,
    };
    // console.log(det)
    const response1 = await axios.post(
      "/api/nftpage/auction/checkuser",
      checkUser
    );

    const data1 = await response1.data;
    console.log(data1.data);
    console.log(data1, "data");
    const response2 = await axios.post("/api/nftpage/auction/getbids", {
      auctionId: data.id,
    });

    const data2 = await response2.data.data;
    console.log(data2, "Data!");
    setActivity(data2);
    console.log(data2.data);
    console.log();
  }
  ////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////
  // console.log(props.id % 2)
  function onBid() {
    router.push("/sellpage/" + props.id);
  }

  async function heart() {
    setHeartActive(!heartActive);

    if (heartActive == false) {
      let add = await axios.post("/api/nftpage/fav/addfav", {
        tokenId: nftContent.id,
        userAddress: data?.address,
      });
      console.log(address);
    } else {
      console.log("remove");

      let remove = await axios.post("/api/nftpage/fav/removefav", {
        tokenId: nftContent.id,
        userAddress: data?.address,
      });
    }
  }

  async function addToPlayList(e) {
    e.preventDefault();
    if (data?.address) {
      console.log(nftContent.id);
      let add = await axios.post("/api/music/addtoplaylist", {
        id: nftContent.id,
        userAddress: data?.address,
      });
      console.log("ad");
      toast.success("Added to playlist", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setInPlaylist(true);
      return;
    }
    toast.error("Please Connect wallet!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  async function removePlaylist(e) {
    e.preventDefault();
    if (data?.address) {
      setInPlaylist(false);

      let add = await axios.post("/api/music/removeplaylist", {
        id: nftContent.id,
        userAddress: data?.address,
      });
      console.log(add, "ad");
      toast.success("Removed from playlist", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    ("");
    console.log(address);
    toast.error("Please Connect wallet!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function notALoop(distance) {
    // if (auction){
    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
      setEndAuction("Auction ended");
      // return;
    }

    // const distance = datesec - dates;
    // Time calculations for days, hours, minutes and seconds
    setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    setSeconds(Math.floor((distance % (1000 * 60)) / 1000));

    // console.log(days,hours,minutes,seconds)n
  }

  useEffect(() => {
    if (auction != null) {
      // console.log(auction)
      // setEndAuction(auction[0].endDate)
      let interval;
      let date = new Date(auction.endDate).toDateString();
      setEndAuction(date.toString());
      let dates = new Date().getTime();
      let datesec = new Date(auction.endDate).getTime();

      let secs = datesec - dates;
      if (distance <= 0) {
        setEndAuction("Auction ended");

        setEnded(true);

        return;
      }

      interval = setInterval(() => {
        setDistance(secs - 1);
      }, 1000);
      // setDistance() ;
      notALoop(distance);

      // console.log(days,hours,minutes,seconds)
    }

    return () => clearInterval(interval);
  }, [auction, distance]);

  return (
    <div className="page-header">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <section className="page-head">
        <div className="container">
          <div className="row">
            {/* <Link href="/"> */}
            <div className="back-btn" onClick={onBack}>
              <img src={ArrowLeft.src} />
              <h2 className="back-text"> Back</h2>
            </div>
            {/* </Link> */}
            <div className="col-md-6 left-part mt-4 p-0 border-0">
              <div
                className="profile-card"
                style={
                  nftContent.imageType == "0"
                    ? { height: "50%", width: "50%" }
                    : {
                        height: "auto",
                        width: "90%",
                        border: " 1px solid yellow",
                      }
                }
              >
                {/* {props}
                  {props.id % 2 ?  <img src={ManIcon.src} className="card-img-top" alt="..."/>   */}

                {/* {nftLink} */}
                {nftContent.imageType == "0" ? (
                  <img
                    src={nftContent.nftImage}
                    className="card-img-top"
                    alt="..."
                  />
                ) : (
                  <ReactPlayer
                    playsInline
                    playing={true}
                    className="Da-Player"
                    url={nftContent.nftImage}
                    type="video/mp4"
                    height="200%"
                    width="100%"
                    controls={true}
                  />
                )}
              </div>
            </div>
            <div className="col-md-6 right-part mt-4 pt-3">
              <div className="heading-text">
                <h4 className="k-text">{nftContent.nftIndexName}</h4>

                <div
                  onClick={heart}
                  className={heartActive == true ? "heart is-active" : "heart"}
                ></div>
              </div>

              <div className="collect-top">
                <div className="text-sec">
                  {/* <h6 className="collect-text"> Collection Name</h6> */}
                  {nftContent.imageType != 0 && !inPlaylist ? (
                    <button
                      onClick={addToPlayList}
                      style={{ width: "50%" }}
                      className=" white-btn"
                    >
                      {" "}
                      Add to playlist
                    </button>
                  ) : nftContent.imageType != 0 && inPlaylist ? (
                    <button
                      onClick={removePlaylist}
                      style={{ width: "50%" }}
                      className=" white-btn"
                    >
                      {" "}
                      Remove
                    </button>
                  ) : null}

                  <p className="f-text">
                    <img className="eye" src={EyeIcon.src} alt="..." />{" "}
                    {props.viewData?.checkViews?.view || 0} views
                  </p>
                </div>

                <h5 className="heading-text">
                  <strong>{props.finalPrice}</strong>{" "}
                  {/* <span style={{ paddingLeft: "5px" }}> ETH</span>{" "} */}
                </h5>
              </div>

              <div className="bid-btn">
                {auction ? (
                  <div className="collect-center">
                    <div className="ends">
                      <h6 className="act-text">
                        {" "}
                        {!ended && auction.auctionType == 1
                          ? !ended
                            ? "Sale   ends on"
                            : "Auction ends on"
                          : ""}{" "}
                        {" :"}{" "}
                        {!ended
                          ? new Date(auction.endDate).toDateString()
                          : "Auction ended"}{" "}
                      </h6>{" "}
                      <span style={{ fontSize: "1.4rem" }}></span>
                    </div>
                    <div className="num-title">
                      <div className="num-text">
                        <h2>{days} </h2>
                        <h5>Days</h5>
                      </div>
                      <div className="sem">
                        <h2>:</h2>
                      </div>

                      <div className="num-text">
                        <h2>{hours} </h2>
                        <h5>Hours</h5>
                      </div>
                      <div className="sem">
                        <h2>:</h2>
                      </div>

                      <div className="num-text">
                        <h2>{minutes}</h2>
                        <h5>Mins</h5>
                      </div>

                      <div className="sem">
                        <h2>:</h2>
                      </div>

                      <div className="num-text">
                        <h2>{seconds}</h2>
                        <h5>Seconds</h5>
                      </div>
                    </div>
                  </div>
                ) : //   <AuctionTimer
                //   auction={auction}
                //   setAuction={setAuction}
                //   setAuctionEnd={setAuctionEnd}
                //   setEndAuction={setEndAuction}
                //   setEnded={setEnded}
                //   endAuction={endAuction}
                // />

                null}

                {!ended && auction?.auctionType == 1 && !sell ? (
                  <button
                    onClick={publicSaleHandler}
                    className="btn   white-btn"
                    role="button"
                    data-bs-toggle="button"
                    aria-pressed="true"
                  >
                    Buy
                  </button>
                ) : auction?.auctionType == 1 && sell && ended ? (
                  <button type="button" className="btn white-btn">
                    Cancel Sale
                  </button>
                ) : auction?.auctionType == 2 && !sell && !ended ? (
                  <button
                    type="button"
                    className="btn white-btn"
                    onClick={onBid}
                  >
                    Bid
                  </button>
                ) : auction?.auctionType == 2 && sell && ended ? (
                  <>
                    <button
                      type="button"
                      className="btn white-btn"
                      onClick={onBid}
                    >
                      Cancel Auction
                    </button>
                    <button
                      type="button"
                      className="btn white-btn"
                      onClick={onBid}
                    >
                      Finalize
                    </button>
                  </>
                ) : null}

                {!auction && sell ? (
                  <button
                    onClick={onBid}
                    className="btn   white-btn"
                    role="button"
                    data-bs-toggle="button"
                    aria-pressed="true"
                  >
                    Sell
                  </button>
                ) : null}
              </div>
            </div>

            <section className="activity-part">
              <div className="col-md-6 left-activity ">
                <div className="top-content">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header
                        className="accordion-header"
                        id="headingOne"
                      >
                        {/* <button className="accordion-button" eventKey="0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"> */}
                        Description
                        {/* </button> */}
                      </Accordion.Header>

                      {/* <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample"> */}

                      <Accordion.Body className="accordion-body">
                        <div className="cc-sec">
                          <h6 className="cc-heading">
                            Created by: <span className="bold-txt">J Ford</span>
                          </h6>
                          <p className="acdn-para">
                            {nftContent.nftDescription}
                          </p>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>

                <div className="top-content">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header
                        className="accordion-header"
                        id="headingTwo"
                      >
                        {/* <h2 className="accordion-header" id="headingtwo"> */}
                        {/* <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapsetwo" aria-expanded="true" aria-controls="collapsetwo"> */}
                        Properties
                        {/* </button>
          </h2> */}
                      </Accordion.Header>

                      {/* <div id="collapsetwo" className="accordion-collapse collapse show" aria-labelledby="headingtwo" data-bs-parent="#accordionExample">
            <div className="accordion-body"> */}
                      <Accordion.Body className="accordion-body">
                        <div className="box-sec">
                          {nftTraits.map((trait, index) => (
                            <>
                              <div className="flex-item" key={index}>
                                <h6 className="b-text"> {trait.TraitType}</h6>
                                <h4 className="g-text">{trait.TraitValue}</h4>
                              </div>
                            </>
                          ))}
                        </div>
                        {/* </div>
  
          </div> */}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>

                <div className="top-content">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header
                        className="accordion-header"
                        id="headingThree"
                      >
                        {/* <h2 className="accordion-header" id="headingthree">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapsethree" aria-expanded="true" aria-controls="collapsethree"> */}
                        Details
                        {/* </button>
                  </h2>
           */}
                      </Accordion.Header>

                      {/* 

          <div id="collapsethree" className="accordion-collapse collapse show" aria-labelledby="headingthree" data-bs-parent="#accordionExample">
            <div className="accordion-body"> */}

                      <Accordion.Body className="accordion-body">
                        <div className="">
                          <p>Contract Address</p>
                          <p> Token ID</p>
                          <p>Token Standard</p>
                          <p> Blockchain</p>
                          <p>Supply</p>
                        </div>
                        <div className="">
                          <p className="acd-text text-break ">
                            {" "}
                            {nftContent?.nftOwner}{" "}
                          </p>
                          <p>{nftContent.nftIndex}</p>
                          <p> ERC-1155</p>
                          <p>Polygon</p>
                          <p>{nftContent.totalSupply}</p>
                        </div>
                        {/* </div>
          
                  </div> */}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>

              <div className="col-md-6 right-activity">
                <div className="activity-item">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header
                        className="accordion-header"
                        id="headingFour"
                      >
                        {/* <h2 className="accordion-header" id="headingfour">
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapsefour" aria-expanded="true" aria-controls="collapsefour"> */}
                        Item activity
                        {/* </button>
      </h2> */}
                      </Accordion.Header>

                      {/* <div id="collapsefour" className="accordion-collapse collapse show" aria-labelledby="headingfour" data-bs-parent="#accordionExample"> */}

                      <Accordion.Body className="table-body">
                        {/* <div className="table-body">
                         */}
                        <table className="table">
                          <tbody>
                            <tr>
                              <th scope="col">Event</th>
                              <th scope="col">Price</th>
                              <th scope="col">From</th>
                              <th scope="col" className="table-txt">
                                To
                              </th>
                              <th scope="col">Date</th>
                            </tr>

                            {activity !== null ? (
                              activity?.map((act, i) => {
                                return (
                                  <tr key={i}>
                                    <td className="tld">
                                      <img className="h-icon" src={hIcon.src} />{" "}
                                      Bid
                                    </td>
                                    <td className="tld">
                                      <img src={avaxLogo.src} /> {act.amount}
                                    </td>
                                    <td style={{ overflowWrap: "anywhere" }}>
                                      {act.userAddress}
                                    </td>

                                    <td>
                                      {new Date(act.createdAt)
                                        .toString()
                                        .split(
                                          "GMT+0530 (India Standard Time)"
                                        )}
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <></>
                            )}
                          </tbody>
                        </table>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NftPage;
