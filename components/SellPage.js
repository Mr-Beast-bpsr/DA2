import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import ReactPlayer from "react-player/lazy";

import BasicDateRangePicker from "./ui/DatePicker";

import MyVerticallyCenteredModal from "./ui/MyVerticallyCenteredModal.js";
import { startSale } from "./web/connect";
import { useAppContext, useBalanceContext } from "../context/GlobalState";
import { useRouter } from "next/router";

const SellPage = ({ id }) => {
  console.log(id );
  const [confirmation,setConfirmation] =useState(null)
  const [success,setSuccess] =useState(false)
  const [checkValue, setCheckValue] = useState(false);
  const [errorMessage, setErrorMessage] =useState(null);
  const router = useRouter();
  const { active, setActive } = useAppContext();
  const [closeModals, setCloseModals] = useState(false);
  // console.log(id.id)
  const [radioValue, setRadioValue] = useState("1");
  const [dataa, setData] = useState(null);
  // const radios = [
  //   { name: "Fixed Price", value: "1" },
  //   { name: "Timed Auction", value: "2" },
  // ];
  const [value, setValue] = useState([
    new Date(),
    new Date(new Date() * (1.00005 + 0.00005 * 7)),
  ]);
  const priceRef = useRef();
  // const startDateRef = useRef();
  // const endDateRef = useRef();
  const formRef = useRef();
  const [transHash, setTransHash] = useState(null);
  // const [active, setActive] = useState(false);
  async function sellHandler(e) {
    e.preventDefault();

    console.log(value[1], value[0]);
    if (value[1].toISOString() == value[0].toISOString()) {
      alert("Please select a valid date range !" + "can't be the same date");
      return;
    }

    let price = priceRef.current.value;
    let endDat = new Date(value[1]).toISOString().split("T")[0];
    // console.log(endDat)
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
      id.id,
      price,
      startDate,
      endDate,
      setTransHash,
      setActive,
      startDat,
      endDat,
      setCloseModals,
      auctionType);
      setCloseModals(true)
    await startSale(

      dataa.nftContent.nftIndex,
      id.id,
      price,
      startDate,
      endDate,
      auctionType,
      setCloseModals,
      setTransHash,
      setConfirmation,
      setSuccess,
      setErrorMessage,    
      startDat,
      endDat,
    );
    formRef.current.reset();
    // if (!closeModals) {
    //   router.push("/nftpage/" + id.id);
    // }
  }

  async function nftData() {
    data = {
      id: id.id,
    };
    let res = await axios.post("/api/nftpage", data);
    let data = res.data;
    console.log(data.data);
    setData(data.data);
  }

  useEffect(() => {
    nftData();
  }, []);
  useEffect(() => {
    if (radioValue === "2") {
      setCheckValue(true);
    }
    if (radioValue === "1") {
      setCheckValue(false);
    }
  }, [radioValue]);
  if (dataa === null) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="mint-header page-header">
      <div className="container  setContainer sellContainer">
        <MyVerticallyCenteredModal
          show={closeModals}
          value={transHash}
          success={true.toString()}
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
              onSubmit={sellHandler}
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
                    Type
                  </label>

                  <Form>
                    {["radio"].map((type) => (
                      <div
                        key={`default-${type}`}
                        className="mb-3"
                        style={{ color: "white", marginTop: "15px" }}
                      >
                        <Form.Check
                          onChange={(e) => {
                            setRadioValue(e.currentTarget.value);
                          }}
                          value="3"
                          label="Fixed Price"
                          name="group1"
                          type={type}
                          id={`inline-${type}-1`}
                          // disabled
                        />
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
                        <Form.Check
                          value="2"
                          checked={"2" === radioValue}
                          onChange={(e) => {
                            setRadioValue(e.currentTarget.value);
                          }}
                          // checked={radioValue === radioValue}
                          label="Timed Auction"
                          name="group1"
                          type={type}
                          id={`inline-${type}-3`}
                        />
                      </div>
                    ))}
                  </Form>
                </div>
                <div style={{ marginBottom: "35px" }}>
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
                        By default highest bid will be chosen.
                      </h4>
                    </div>
                  )}

                  <div style={{ display: "flex" }}>
                    <label
                      style={{
                        fontSize: "24px",
                        color: "white",
                        marginBottom: "2rem",
                      }}
                    >
                      Price
                    </label>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div
                      className="price-div"
                      style={{
                        display: "flex",
                        marginRight: "30px",
                        padding: "10px",
                      }}
                    >
                      <div>
                        <img
                          src="/ethLogo.svg"
                          style={{ width: "34px", height: "34px" }}
                        />
                      </div>
                      <div
                        className="price-font"
                        style={{ marginLeft: "12px" }}
                      >
                        ETH
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
                
              ) : null}
               */}
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
                
                className="btn  btn-position"
                id="btn-position"
                style={
                  radioValue === "2"
                    ? { marginTop: "0" }
                    : radioValue === "1"
                    ? { marginTop: "3rem" }
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
            <div className="row row-of-article">
              <article className="article-sell" style={{}}>
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
                    {dataa.nftContent.imageType == "0" ? (
                    <img
                      src={dataa.nftContent.nftImage}
                      className="sell-image"

                      alt="..."
                    />
                  ) : (
                    <ReactPlayer
                      playing={true}
                      
                      className="sell-image m-5"
                      url={dataa.nftContent.nftImage}
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
                            {dataa.nftContent.nftIndexName.toLowerCase()}
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
    </div>
  );
};

export default SellPage;
