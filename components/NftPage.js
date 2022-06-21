import React, { useEffect, useState } from "react";
import ArrowLeft from "..//public/arrow-left.svg";
import Like from "../public/like.png";
import Heart from "../public/heart.svg";
import EyeIcon from "../public/eye-icon.svg";
import Hicon from "../public/h-icon.png";
import ManIcon from "../public/man-pic.jpg";
import { Accordion, Alert, Button } from "react-bootstrap";
import Link from "next/link";
import ReactPlayer from "react-player/lazy";
import $ from "jquery";
import { useRouter } from "next/router";
import axios from "axios";
import AuctionTimer from "./ui/nftpage/AuctionTimer";
import LoadingPlaceHolder from "./ui/nftpage/LoadingPlaceHolder";

import { useAccount } from "wagmi";
import { ToastContainer, toast } from 'react-toastify';


const NftPage = ({ props }) => {

  console.log(props);
  const [loading,setLoading] =useState(true)
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
  const {data} = useAccount()
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
   let owner=  localStorage.getItem("address")
    setSell(data?.address.toLowerCase() == nftContent.nftOwner.toLowerCase())
    setAddress(data?.address);
    console.log(data?.address.toLowerCase() == nftContent.nftOwner.toLowerCase())
console.log( data , nftContent.nftOwner.toLowerCase())
  
    apiCall();
  }, [data]);
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
      }, 1000);
    
  }
  useEffect(() => {
    apiCall2(auction)

  },[auction])
async function apiCall2(data) {
  if (data == null) return;
  let checkUser = {
    userAddress: address,
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

    if (heartActive ==false) {
      let add = await axios.post("/api/nftpage/fav/addfav", {
        tokenId: nftContent.id,
        userAddress: address,
      });
    } else {
      console.log("remove")

      let remove = await axios.post("/api/nftpage/fav/removefav", {
        tokenId: nftContent.id,
        userAddress: address,
      });
    }
  }

async function addToPlayList(e){
  e.preventDefault();
  if(account.data?.address) {

    let add = await axios.post("/api/music/addtoplaylist", {
      id: nftContent.id,
      userAddress: address,
    });
    console.log("ad")
    toast.success('Added to playlist', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  
    return ;
  }
  toast.error('Please Connect wallet!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

}
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
            {loading ? (
             <LoadingPlaceHolder/>
            ) : (
              <div className="col-md-6 right-part mt-4 pt-3">
           
                <div className="heading-text">
                  <h4 className="k-text">{nftContent.nftIndexName}</h4>

                  <div onClick={heart} className={heartActive == true ? "heart is-active": "heart"}></div>
                </div>

                <div className="collect-top">
                  <div className="text-sec">
                    {/* <h6 className="collect-text"> Collection Name</h6> */}
                   {nftContent.imageType == 0 ? null : 

<button onClick={addToPlayList} style={{width: '50%'}} className=" white-btn"> Add to playlist</button>
                   }
                    
                    <p className="f-text">
                      <img className="eye" src={EyeIcon.src} alt="..." />{" "}
                      {props.viewData?.checkViews?.view || 0} views
                    </p>
                  </div>
                  {auction !== null || auctionEnd != null ? (
                    <AuctionTimer
                      auction={auction}
                      setAuction={setAuction}
                      setAuctionEnd={setAuctionEnd}
                      setEndAuction={setEndAuction}
                      setEnded={setEnded}
                      endAuction={endAuction}
                    />
                  ) : sell == true && auction == null && auctionEnd == null ? (
                    <div
                      style={{
                        marginTop: "1rem",
                        marginBottom: "2rem",
                        marginLeft: "0",
                      }}
                    >
                      <button onClick={onBid} className=" white-btn">
                        Sell
                      </button>
                    </div>
                  ) : (
                    <h1
                      className="collect-center"
                      style={{
                        width: "100%",
                        // color: "red",
                        textAlign: "center",
                        padding: "15px",
                        fontSize: "20px",
                        marginTop: "70px",
                      }}
                    >
                      {" "}
                      Not For Sale{" "}
                    </h1>
                  )}

                  <div className="bid-btn-sec">
                    <div className="bid-text">
                      {/* <h6 className="p-text">Price</h6> */}

                      <h6
                        style={{ justifyContent: "flex-start" }}
                        className="heading-text"
                      >
                        {auction !== null &&
                        activity !== null &&
                        auction.auctionType === 2 &&
                        activity.length >= 1 ? (
                          <>
                            {activity[0].amount}{" "}
                            <span className="s-awax"> ETH</span>
                          </>
                        ) : auction !== null && auction.auctionType === 1 ? (
                          <>
                            {auction.minAmount}
                            <span className="s-awax"> ETH</span>
                          </>
                        ) : auction !== null &&
                          activity !== null &&
                          auction.auctionType === 2 &&
                          activity.length < 1 ? (
                          <>
                            {auction.minAmount}{" "}
                            <span className="s-awax"> ETH</span>
                          </>
                        ) : (
                          ""
                        )}
                      </h6>
                      {auction !== null &&
                      auction.auctionType === 1 &&
                      !sell ? (
                        <button
                          onClick={publicSaleHandler}
                          className="btn   white-btn"
                          role="button"
                          data-bs-toggle="button"
                          aria-pressed="true"
                        >
                          Buy
                        </button>
                      ) : auction != null &&
                        sell == true &&
                        auction.auctionType == 1 ? (
                        <button
                          style={{ width: "100%" }}
                          className="btn white-btn"
                          onClick={() =>
                            stopSales(
                              dataa.nftContent.nftIndex,
                              props.id,
                              setTransHash,
                              setCloseModals,
                              auction.id,
                              setSuccess,
                              collectionAddress
                            )
                          }
                        >
                          Cancel Sale
                        </button>
                      ) : null}

                      {auction !== null &&
                      auction.auctionType == "2" &&
                      !sell ? (
                        <button
                          onClick={onPlaceBid}
                          type="button"
                          className="btn btn-light white-btn"
                        >
                          Place bid
                        </button>
                      ) : auction !== null &&
                        sell === true &&
                        auction.auctionType === 2 ? (
                        <>
                          <button
                            className="btn white-btn"
                            style={{ width: "33%" }}
                            onClick={() =>
                              cancelAuctions(
                                dataa.nftContent.nftIndex,

                                props.id,
                                setTransHash,
                                setCloseModals,
                                auction.id,
                                setSuccess
                              )
                            }
                          >
                            Cancel Auction
                          </button>
                          <button
                            style={{ width: "33%" }}
                            className="btn btn-light white-btn"
                            onClick={finalizeAuction}
                          >
                            Finalize Auction
                          </button>
                        </>
                      ) : null}
                    </div>

                    {auctionEnd != null && sell == true &&
                        auctionEnd?.auctionType == 1 
                 ? (
                      <button
                        className="btn white-btn"
                        onClick={() =>
                          stopSales(
                            dataa.nftContent.nftIndex,

                            props.id,
                            setTransHash,
                            setCloseModals,
                            auctionEnd.id,
                            setSuccess,
                            collectionAddress
                          )
                        }
                      >
                        Cancel Sale
                      </button>
                    ) : null}

                    {auctionEnd !== null &&
                    auctionEnd.auctionType === 2 &&
                    sell === true ? (
                      <>
                        <button
                          className="btn white-btn"
                          onClick={() =>
                            cancelAuctions(
                              dataa.nftContent.nftIndex,

                              props.id,
                              setTransHash,
                              setCloseModals,
                              auctionEnd.id,
                              setSuccess
                            )
                          }
                        >
                          Cancel Auction
                        </button>
                        <button
                          className="btn btn-light white-btn"
                          onClick={(e) =>
                            finalize(
                              dataa.nftContent.nftIndex,

                              props.id,
                              setTransHash,
                              setCloseModals,
                              auctionEnd.id,
                              setSuccess,
                              collectionAddress
                            )
                          }
                        >
                          Finalize Auction
                        </button>
                      </>
                    ) : null}
                    {claim ? (
                      <button
                        style={{
                          position: "relative",
                          // left: "-68%",
                          marginTop: "70px",
                          height: "60px",
                        }}
                        onClick={() =>
                          claimRewards(
                            dataa.nftContent.nftIndex,
                            props.id,
                            setTransHash,
                            setCloseModals,

                            setSuccess,
                            collectionAddress
                          )
                        }
                        className="btn btn-light white-btn"
                      >
                        Claim
                      </button>
                    ) : null}
                    {cancelClaimButton === true ? (
                      <button
                        style={{
                          position: "relative",
                          // left: "-68%",
                          marginTop: "70px",
                          height: "60px",
                        }}
                        onClick={() =>
                          cancelClaimFunction(
                            dataa.nftContent.nftIndex,
                            props.id,
                            setTransHash,
                            setCloseModals,

                            setSuccess,
                            collectionAddress
                          )
                        }
                        className="btn btn-light white-btn"
                      >
                        Cancel Claim
                      </button>
                    ) : null}
                    <Alert show={error} variant="success">
                      Switch to ETH Mainnet.
                      <Alert.Heading> </Alert.Heading>
                      <div className="d-flex justify-content-end">
                        <Button
                          onClick={() => setError(false)}
                          variant="outline-success"
                        >
                          Got it!
                        </Button>
                      </div>
                    </Alert>
                  </div>
                  {/* <VerticalModal
                    id={props.id}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                  <BidHandler
                    auctionid={auction !== null ? auction.id : null}
                    id={props.id}
                    tokenindex={dataa.nftContent.nftIndex}
                    show={bidModalShow}
                    minAmount={
                      auction !== null &&
                      activity !== null &&
                      auction.auctionType === 2 &&
                      activity.length >= 1
                        ? activity[0].amount + " Avax"
                        : auction !== null && auction.auctionType === 1
                        ? auction.minAmount + " Avax"
                        : auction !== null &&
                          activity !== null &&
                          auction.auctionType === 2 &&
                          activity.length < 1
                        ? auction.minAmount + " Avax"
                        : ""
                    }
                    // minAmount={auction !== null ? auction.minAmount : null}
                    onHide={() => {
                      setBidModalShow(false);
                      setTimeout(() => {
                        getBidsOnAuction(
                          auction.id,
                          dataa.nftContent.nftIndex,
                          setActivity
                        );
                      }, 2000);
                    }}
                    // auctionI={auction !== null ? auction.id : null}
                    propId={props.id}
                    setActivity={setActivity}
                  /> */}
                </div>
              </div>
            )}

            {/* <h5 className="heading-text">
                        <strong>{props.finalPrice}</strong>{" "}
                        <span style={{ paddingLeft: "5px" }}> ETH</span>{" "}
                      </h5>
                    </div>

                    <div className="bid-btn">
                      <a
                        href="#"
                        className="btn rounded-pill  blue-btn"
                        role="button"
                        data-bs-toggle="button"
                        aria-pressed="true"
                      >
                        Buy
                      </a>
                      <button
                        type="button"
                        className="btn white-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        Place bid
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}
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
                        <div className="left-acd">
                          <p>Contract Address</p>
                          <p> Token ID</p>
                          <p>Token Standard</p>
                          <p> Blockchain</p>
                        </div>
                        <div className="right-acd">
                          <p className="acd-text text-break ">
                            {" "}
                            {nftContent?.nftOwner}{" "}
                          </p>
                          <p>{nftContent.nftIndex}</p>
                          <p> ERC-1155</p>
                          <p>Ethereum</p>
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
                  {/*   
        </div>
      </div> */}
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
