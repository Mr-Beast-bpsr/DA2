import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

import BasicDateRangePicker from "./ui/DatePicker";

import MyVerticallyCenteredModal from "./ui/MyVerticallyCenteredModal.js";
import { useAppContext } from "../context/GlobalState";

import {
  useContractWrite,
  useContractRead,
  useWaitForTransaction,
  useSignMessage,
  useAccount,
} from "wagmi";
import ab from "../public/abi/DaAuction.json";
import ab2 from "../public/abi/DaFactory.json";
import { ethers } from "ethers";
import { useRouter } from "next/router";
let { abi2 } = ab2;
let { abi } = ab;
const SellPage = ({ id }) => {
  const router = useRouter();
  console.log(id);

  let { address, isConnecting, isDisconnected } = useAccount();
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const { active, setActive } = useAppContext();
  const [closeModals, setCloseModals] = useState(false);
  const quantityRef = useRef();
  const [radioValue, setRadioValue] = useState("1");
  const [dataa, setData] = useState(null);

  const [value, setValue] = useState([
    new Date(),
    new Date(new Date() * (1.00005 + 0.00005 * 7)),
  ]);
  const priceRef = useRef();

  const formRef = useRef();
  const [transHash, setTransHash] = useState(null);
  const auctionContract = "0x103bA20233C93Aa753aC194D376bfF978790DA92";
  const mintContract ='0xC933Da788A96e3DedCb229e2594c3fB376FfCd91'
  async function nftData() {
    data = {
      id: id.id,
    };
    let res = await axios.post("/api/nftpage", data);
    let data = res.data;
    console.log(data.data);
    setData(data.data);
  }

  const { data, isError, isLoading, write } = useContractWrite({
    addressOrName: auctionContract,
    contractInterface: abi,
    functionName: "listNft",

    args: [],
    onSettled(data, error) {
      console.log("Settled", { data, error });
      if (error) {
        console.log("errord");
        setTimeout(function () {
          setErrorMessage(error);
          setCloseModals(false);
        }, 2000);
      }
    },
    onSuccess(data) {
      setTransHash(data?.hash);
      console.log("Success", data);
    },
  });
  const approve = useContractWrite({
    addressOrName: mintContract,
    contractInterface: abi2,
    functionName: "CustomApprovalForAll",

    args: [auctionContract, 1],
    onSettled(data, error) {
      console.log("Settled", { data, error });
      if (data) {
        sellHandler();
      }
      if (error) {
        // console.warn("Dsata")
        // setModalShow(false);
      }
    },
  });
  const signMessage = useSignMessage({
    message:
      "This is a sign message for approval of listing your NFT on market place, note that this is a one time process.",
    onSettled(data, error) {
      console.log("Settled", { data, error });
      if (data) {
        approve.write();
        // console.log("error")
      }
      if (error) {
        // console.warn("Dsata")
        setModalShow(false);
      }
    },
  });
  // console.log(token.data);
  // useEffect(()=>{

  //   console.log(token.data,token, "tokne")
  // },[
  //   token
  // ])

  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
    onSettled(data, error) {
      setSuccess(true);
      console.log("Settled Wait", { data, error });
      // let token = getCurrentToken()
      // console.log(token)
      console.log(data);

      if (data?.status == 1) {
        apiCall();
        setSuccess(true);
        console.log("api");
        setTimeout(function () {
          setModalShow(false);
          router.push("/collection/"+ address+"/" + id?.id);
        }, 2000);
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
          setModalShow(false);
        }, 5000);
        return;
      }
    },
  });
  const isApproved = useContractRead({
    addressOrName: mintContract,
    contractInterface: abi2,
    functionName: "isApprovedForAll",
    args: [address, auctionContract],
  });

  async function approval(e) {
    e.preventDefault();
    if (value[1].toISOString() == value[0].toISOString()) {
      alert("Please select a valid date range !" + "can't be the same date");
      return;
    }
    let price = priceRef.current.value;
    let quantity = quantityRef.current.value;

    if (isApproved.data) {
      sellHandler();
      return;
    }
    await signMessage.signMessage();
  }

  async function sellHandler(e) {
    // e.preventDefault();/
    console.log(isApproved.data);

    console.log(value[1], value[0]);
    if (value[1].toISOString() == value[0].toISOString()) {
      alert("Please select a valid date range !" + "can't be the same date");
      return;
    }

    let price = priceRef.current.value;
    let endDat = new Date(value[1]).toISOString().split("T")[0];
    let quantity = quantityRef.current.value;
    let startDat = new Date(value[0]).toISOString().split("T")[0];

    let dateEnd = endDat.split("-");
    let dateStart = startDat.split("-");

    let endDate = dateEnd[0] + dateEnd[1] + dateEnd[2];
    let startDate = dateStart[0] + dateStart[1] + dateStart[2];
    console.log(endDat, startDat, price);
    console.log(startDate, endDate, price);
    console.log(new Date(startDat));
    let auctionType = radioValue;
    if (radioValue == "3") {
      auctionType = "1";
    }
    console.log(
      dataa.nftContent.nftIndex,
      quantity,
      price,
      dataa.nftContent.commision
    );
    let priced = ethers.utils.parseEther(price);
    console.log(priced, "dddddddddd");
    write({
      args: [
        dataa.nftContent.nftIndex,
        quantity,
        priced,
        dataa.nftContent.commision,
      ],
      overrides: {
        gasLimit: 3802558,
      },
    });

    setCloseModals(true);
    // formRef.current.reset();
  }

  useEffect(() => {
    nftData();
  }, []);
  async function apiCall() {
    let price = priceRef.current.value;
    let endDat = new Date(value[1]).toISOString().split("T")[0];
    let quantity = quantityRef.current.value;
    let startDat = new Date(value[0]).toISOString().split("T")[0];

    let dateEnd = endDat.split("-");
    let dateStart = startDat.split("-");

    let endDate = dateEnd[0] + dateEnd[1] + dateEnd[2];
    let startDate = dateStart[0] + dateStart[1] + dateStart[2];
    let dat = {
      tokenId: dataa.nftContent.nftIndex,
      userAddress: address,
      auctionType: 1,
      startDate: startDat,
      endDate: endDat,
      minAmount: price,
      quantity: quantity,
    };
    setSuccess(true);
    const response = await axios.post("/api/nftpage/auction/startauction", dat);
  }
  // if (dataa === null) {
  //   return <div className="container">Loading...</div>;
  // }

  return (
    <div className="mint-header page-header" id="page-fixed">
      <div className="container  setContainer sellContainer" id="sellContainer">
        <MyVerticallyCenteredModal
          show={closeModals}
          hash={transHash}
          error={errorMessage}
          suc={success}
          onHide={() => {
            setTransHash(null);
            setActive(false);
          }}
        />

        <div className="mint-head" id="mint-head">
          <div
            className="type-article"
            id="type-article"
            style={{
              overflow: "auto",
              width: "50%",
              padding: "2rem",
            }}
          >
            <Form
              onSubmit={approval}
              ref={formRef}
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <h1 className="div1-heading">List item for sale</h1>
              <div className="auction-type">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    // marginBottom: "24px",
                  }}
                >
                  <label style={{ color: "white", fontSize: "22px" }}>
                    {" "}
                    Auction Type
                  </label>

                  <div>
                    {["radio"].map((type) => (
                      <div
                        key={`default-${type}`}
                        className="mb-3"
                        style={{ color: "white", marginTop: "15px" }}
                      >
                        {/* <Form.Check
                          onChange={(e) => {
                            setRadioValue(e.currentTarget.value);
                          }}
                          value="3"
                          label="Fixed Price"
                          name="group1"
                          type={type}
                          id={`inline-${type}-1`}
                        /> */}
                        <Form.Check
                          checked={"1" === radioValue}
                          onChange={(e) => {
                            setRadioValue(e.currentTarget.value);
                          }}
                          value="1"
                          label="Fixed Price with Time Limit"
                          name="group1"
                          type={type}
                          id={`inline-${type}-1`}
                        />
                        {/* <Form.Check
                          value="2"
                          checked={"2" === radioValue}
                          onChange={(e) => {
                            setRadioValue(e.currentTarget.value);
                          }}
                          label="Timed Auction"
                          name="group1"
                          type={type}
                          id={`inline-${type}-3`}
                        /> */}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: "15px", marginTop: "20px" }}>
                  {radioValue === "1" || radioValue === "3" ? (
                    ""
                  ) : (
                    <div
                      className="auction-type"
                      style={{
                        marginBottom: "0px",
                        backgroundColor: "transparent",
                        borderRadius: "10px",
                        color: "white",
                        padding: "0.1rem",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      {/* <img
                    src={chronometer.src}
                    alt="chronometer"
                    style={{
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      align: "center",
                      margin: "1rem",
                      marginRight: "0",
                    }}
                  /> */}
                      <h4 style={{ marginLeft: "10px", color: "red" }}>
                        {/* By default highest bid will be chosen. */}
                      </h4>
                    </div>
                  )}

                  <div style={{ display: "flex" }}>
                    <div
                      className="price-div"
                      style={{
                        display: "flex",
                        marginRight: "65px",
                        padding: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      <div>
                        {/* <img
                          src="/ethLogo.svg"
                          style={{ width: "34px", height: "34px" }}
                        /> */}
                      </div>
                      <div className="price-font" style={{}}>
                        Price
                      </div>
                      <div></div>
                    </div>
                    <input
                      type="float"
                      required
                      ref={priceRef}
                      // style={}
                      className="price-input"
                    />
                  </div>
                </div>

                <div style={{ display: "flex" }}>
                  <label
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      padding: "10px",
                      marginBottom: "1rem",
                    }}
                    className="price-div"
                  >
                    Quantity
                  </label>{" "}
                  <input
                    type="float"
                    required
                    ref={quantityRef}
                    style={{ marginLeft: "20px" }}
                    className="price-input"
                  />
                </div>

                <div>
                  <div style={{ display: "flex" }}>
                    <label style={{ fontSize: "24px", color: "white" }}>
                      {radioValue !== "3" ? "Duration" : null}
                    </label>
                  </div>

                  {/* {radioValue === "1" ? (
                <Form.Check
                  style={{ fontSize: "18px",  color: "white" }}
                  type="switch"
                  label=" End Date"
                
                  id="custom-switch"
                  // label="End Date"
                  onChange={(e) => {
                    setCheckValue(e.target.checked);
                  }}
                  
                />
                
              ) : null} */}

                  <div style={{ display: "flex", width: "100%" }}>
                    <div style={{ marginRight: "20px", width: "100%" }}>
                      <div>
                        <BasicDateRangePicker
                          valuee={value}
                          checkValue={radioValue}
                          setValue={setValue}
                        />
                        {/* ) : null} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                className="btn  btn-position "
                id="btn-position"
                style={
                  radioValue === "2"
                    ? { marginTop: "0" }
                    : radioValue === "1"
                    ? { marginTop: "4rem" }
                    : { marginTop: "9rem" }
                }
              >
                {" "}
                Complete Listing{" "}
              </Button>
            </Form>
          </div>

          {/* ////////////////////////////////////////////////////////////////// */}
          <div className="set-position" width="100%">
            <article className="article-sell" id="article-sell" style={{}}>
              <div className="row row-of-article">
                <div className="container">
                  <div>
                    <h1
                      className="preview-text"
                      style={{
                        color: "white",
                        fontSize: "30px",
                        marginBottom: "20px",
                      }}
                    >
                      {" "}
                      Preview{" "}
                    </h1>
                  </div>
                  <div>
                    <div>
                      {dataa?.nftContent.imageType == "0" ? (
                        <img
                          src={dataa?.nftContent.nftImage}
                          className="sell-image"
                          alt="..."
                        />
                      ) : (
                        <ReactPlayer
                          playing={true}
                          id="sell-image "
                          className="sell-image sell-ptp"
                          url={dataa?.nftContent.nftImage}
                          type="video/mp4"
                          height="200%"
                          width="100%"
                          controls="true"
                        />
                      )}
                    </div>
                  </div>

                  <div
                    className="gtx"
                    style={{ padding: "0px", paddingTop: "15px" }}
                  >
                    <div style={{ width: "100%" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          color: "white",
                          fontWeight: "600",
                        }}
                      >
                        {/* <a
                          className="prev-link"
                          rel="noreferrer"
                          target="_blank"
                          href={"/marketplace"}
                          style={{ fontSize: "20px" }}
                        >
                          DA Games
                        </a> */}

                        <div
                          className="ava-divname"
                          style={{
                            display: "flex",
                            color: "white",
                            fontSize: "24px",
                          }}
                        >
                          <div
                            style={{ flex: "1", textTransform: "capitalize" }}
                          >
                            {dataa?.nftContent.nftIndexName.toLowerCase()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellPage;
