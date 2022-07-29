import React, { useEffect, useState } from "react";
import ArrowLeft from "..//public/arrow-left.svg";
import EyeIcon from "../public/eye-icon.svg";

import { Accordion } from "react-bootstrap";
import Link from "next/link";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

import { useRouter } from "next/router";
import axios from "axios";

import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import sell from "../components/Sale/Sell";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Modaal from "./ui/Modaal.js";
import ab from "../public/abi/DaAuction.json";
import CreateNftModal from "./ui/TransModal";
import { utils } from "ethers";
let { abi } = ab;

const NftPage = ({ props }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const [modalShow, setModalShow] = React.useState(false);

  const [inPlaylist, setInPlaylist] = useState(props.viewData.inPlaylist);
  const [loading, setLoading] = useState(true);
  const [heartActive, setHeartActive] = useState(props.viewData.fav);
  const [auction, setAuction] = useState(props.auctionData);
  const [nftContent, setNftContent] = useState(props.data.nftContent);
  const [nftTraits, setNftTraits] = useState(props.data.traits);
  console.log(auction);
  const router = useRouter();
  // console.log(nftContent);
  const [activity, setActivity] = useState(null);
  const [sell, setSell] = useState(false);
  const [auctionEnd, setAuctionEnd] = useState(null);
  const [success, setSuccess] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [address, setAddress] = useState(null);
  const [transHash, setTransHash] = useState(null);
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
    setCloseModal(true);
    setErrorMessage(null);
    setTransHash(null);
    console.log(auction);
    buyNft.write({
      args: [auction.id],
      overrides: {
        gasLimit: 3302558,
        value: utils.parseEther(auction?.minAmount.toString()),
      },
    });
  }

  async function stopSaleHandler(e) {
    e.preventDefault();
    setCloseModal(true);
    setErrorMessage(null);
    setTransHash(null);
    stopSale.write({
      args: [auction.id],
      overrides: {
        gasLimit: 3302558,
      },
    });
  }
  async function stopSaleAPiCall() {
    let data = { id: auction?.id, amount: auction?.minAmount };
    let res = await axios.post("/api/nftpage/auction/closebid", data);
    console.log(res.data.data);
    location.reload();
  }

  async function apiCalla() {
    let dat = {
      auctionId: auction.id,
      tokenId: props.id,
      userAddress: data?.address,
      holdings: 1,
      amount: auction.minAmount,
      nftOwner: auction.userAddress,
    };
    console.warn(data, "data");
    let bid = await axios.post("/api/nftpage/auction/placebidonauction", dat);
    console.log(bid);
  }
  // useEffect(() => {}, []);

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
    const res = axios.post("http://52.9.60.249:4000/api/v1/nft/saveview", {
      tokenId: nftContent.nftId,
    });
  }, []);
  // function onPlaceBid() {}

  async function apiCall() {
    setTimeout(function () {
      setLoading(false);
    }, 3000);
  }
  useEffect(() => {
    apiCall2(auction);
  }, [auction]);
  async function apiCall2() {
    const response2 = await axios.post("/api/nftpage/auction/getowners", {
      nftId: nftContent.nftId,
    });
    const data2 = await response2.data.data;
    console.log(data2, "Data!");
    setActivity(data2);
    console.log(data2.data);
    console.log();
  }
  ////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////

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

  // async function addToPlayList(e) {
  //   e.preventDefault();
  //   if (data?.address) {
  //     console.log(nftContent.id);
  //     let add = await axios.post("/api/music/playlist/addToPlayList", {
  //       id: nftContent.id,
  //       userAddress: data?.address,
  //     });
  //     console.log("ad");
  //     toast.success("Added to playlist", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //     setInPlaylist(true);
  //     return;
  //   }
  //   toast.error("Please Connect wallet!", {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // }

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

  const buyNft = useContractWrite({
    addressOrName: "0xF2F15FEf19077661E3cFc4Aa488Fa5F53E205D5b",
    contractInterface: abi,
    functionName: "buyNFT",

    args: [],
    onSettled(data, error) {
      console.log("Settled", { data, error });
      if (error) {
        console.log("errord");
        setTimeout(function () {
          console.log(error);
          setErrorMessage(error.message);
          setCloseModal(false);
        }, 2000);
      }
    },
    onSuccess(data) {
      setTransHash(data?.hash);
      console.log("Success", data);
    },
  });

  const stopSale = useContractWrite({
    addressOrName: "0xF2F15FEf19077661E3cFc4Aa488Fa5F53E205D5b",
    contractInterface: abi,
    functionName: "stopSale",

    args: [],
    onSettled(data, error) {
      console.log("Settled", { data, error });
      if (error) {
        console.log("errord");
        setTimeout(function () {
          console.log(error);
          setErrorMessage(error.message);
          setCloseModal(false);
        }, 2000);
      }
    },
    onSuccess(data) {
      setTransHash(data?.hash);
      console.log("Success", data);
    },
  });

  const waitForTransactions = useWaitForTransaction({
    hash: stopSale.data?.hash,
    onSettled(data, error) {
      setSuccess(true);
      console.log("Settled Wait", { data, error });

      console.log(data);

      if (data?.status == 1) {
        stopSaleAPiCall();
        setSuccess(true);
        console.log("api");
      }
      if (data?.status == 0) {
        setErrorMessage(error?.message);
        setErrorMessage("Transaction failed");
        setTimeout(function () {
          setModalShow(false);
        }, 2000);
      }
      if (error) {
        setErrorMessage(
          "An error has occurred please check etherscan for full details."
        );
        setTimeout(function () {
          setCloseModal(false);
        }, 5000);
        return;
      }
    },
  });

  const waitForTransaction = useWaitForTransaction({
    hash: buyNft.data?.hash,
    onSettled(data, error) {
      setSuccess(true);
      console.log("Settled Wait", { data, error });

      console.log(data);

      if (data?.status == 1) {
        apiCalla();
        setSuccess(true);
        console.log("api");
      }
      if (data?.status == 0) {
        setErrorMessage(error?.message);
        setErrorMessage("Transaction failed");
        setTimeout(function () {
          setModalShow(false);
        }, 2000);
      }
      if (error) {
        setErrorMessage(
          "An error has occurred please check etherscan for full details."
        );
        setTimeout(function () {
          setCloseModal(false);
        }, 5000);
        return;
      }
    },
  });
  const isSafari = /^((?!chrome|android).)*safari/;
  const config = {
    file: {
      forceHLS: !isSafari,
      forceVideo: true,
      hlsVersion: "0.12.4",
      attributes: {
        // poster: feed && feed.actionUrl && feed.actionUrl.image,
        disablePictureInPicture: true,
      },
    },
  };
  return (
    <div className="page-header">
      <Modaal
        show={modalShow}
        nftContent={nftContent?.nftId}
        address={data?.address}
        onHide={() => setModalShow(false)}
      />
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
      <CreateNftModal
        show={closeModal}
        transHash={transHash}
        success={success}
        // contractAddress={contractAddress}
        errorMessage={errorMessage}
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
                  <>
                    <ReactPlayer
                      style={{ position: "absolute" }}
                      playsinline
                      // playing={true}
                      className="Da-Player"
                      url={nftContent.nftImage}
                      type="video/mp4"
                      height="200%"
                      muted={true}
                      width="100%"
                      controls="true"
                    />
                    <video
                      playsinline
                      autoPlay
                      muted
                      controls="true"
                      width="100%"
                      height="100%"
                      style={{ position: "absolute", backgroundColor: "black"}}

                      src={nftContent.nftImage}
                      type="video/mp4"
                    />

                    <video
                      width="800"
                      height="640"
                      loop
                      muted
                      controls="true"
                      style={{ position: "absolute" }}
                      playsinline
                    >
                      <source src={nftContent.nftImage} type="video/mp4" />
                      {/* <source src="xmasvideo/M&P-Xmas 2.ogv" type="video/ogv" /> */}
                      <source type="video/webm" src="xmasvideo/M&P-Xmas.webm" />
                    </video>
                  </>
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
                  {nftContent.imageType != 0 && nftContent.freeForAll ? (
                    <Button
                      // onClick={addToPlayList}
                      style={{ width: "50%" }}
                      className=" white-btn"
                      variant="primary"
                      onClick={() => setModalShow(true)}
                    >
                      {" "}
                      Add to playlist
                    </Button>
                  ) : (
                    ""
                  )}

                  {/* <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button> */}

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
                ) : auction?.auctionType == 1 && sell ? (
                  <button
                    type="button"
                    onClick={stopSaleHandler}
                    className="btn white-btn"
                  >
                    Cancel Sale
                  </button>
                ) : (
                  ""
                )}

                {!auction && sell ? (
                  <Link href={"/sellpage/" + nftContent.id}>
                    <button
                      // onClick={list.write}
                      // onClick={router.push()}
                      className="btn   white-btn"
                      role="button"
                      data-bs-toggle="button"
                      aria-pressed="true"
                    >
                      Sell
                    </button>
                  </Link>
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
                              {/* <th scope="col">From</th>  */}
                              <th scope="col">To</th>
                              <th scope="col">Date</th>
                            </tr>

                            {activity !== null ? (
                              activity?.map((act, i) => {
                                return (
                                  <tr key={i}>
                                    <td className="tld">
                                      {/* <img className="h-icon" src={hIcon.src} />{" "} */}
                                      {act.event}
                                    </td>
                                    <td className="tld">{act.amount}</td>
                                    <td style={{ overflowWrap: "anywhere" }}>
                                      <a
                                        href={
                                          "https://mumbai.polygonscan.com/address/" +
                                          act?.to
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{ textDecoration: "none" }}
                                      >
                                        {act?.to?.slice(0, 5)} ....
                                        {act?.to?.slice(11, 16)}
                                      </a>
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
