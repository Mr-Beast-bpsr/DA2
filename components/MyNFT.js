import React, { useState, useEffect } from "react";
import ManPic from "../public/man-pic.jpg";
import ManPic1 from "../public/man-pic1.jpg";
import ManPic2 from "../public/man-pic2.jpg";
import { Accordion } from "react-bootstrap";
import axios from "axios";
import Link from "next/link";
import { Alert } from "@mui/material";
import { useRouter } from "next/router";
import videoImg from "../public/video-img.PNG";
const NftPage = ({ props }) => {
  console.log(props);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function reloadMyData() {
    setLoading(true);
  }
  let { result } = props.data.data;
  console.log(result);

  let { offers } = props.data.data;
  let { resultMySale } = props.data.data;
  const [getNft, setNft] = useState(true);
  // const [offers,setOffers] = useState(null)
  const [nftURI, setNFTURI] = useState(result);
  const [myClaimNft, setMyClaimNft] = useState(null);
  //  const {active,setActive} = useAppContext()
  // setNFTURI(nftURI)
  async function getNfts() {
    let addresses = {
      userAddress: sessionStorage.getItem("userAddress"),
    };
    const response = await axios.post("/api/mynft", addresses);
    const data = await response.data;
    setNFTURI(data.data);
    console.log(data.data);
  }

  useEffect(() => {
    if (nftURI !== null) {
      console.log(nftURI);
    }
    window.ethereum.on("accountsChanged", (accounts) => {
      // Handle the new accounts, or lack thereof
      setNft(true);
      console.log(accounts);
      router.replace("/assets/" + accounts[0]);
      getNfts();
      // "accounts" will always be an array, but it can be empty.
    });

    ethereum.on("connect", () => {
      // Handle the new accounts, or lack thereof.
      console.log("connected");
      setNft(true);
      getNfts();
      // "accounts" will always be an array, but it can be empty.
    });

    if (sessionStorage.getItem("userAddress") !== null) {
      setNft(true);
      getNfts();
    } else {
      setNft(false);
    }

    // console.log(nftURI)
    // connect()
    //  connect(setActive).then(() =>
    // myNfts(setNFTURI,setMyNftCount,)
    // )
  }, [getNft]);
  // console.log(window.ethereum)

  return (
    <div>
      <div className="page-header">
        <section className="head-page">
          <div className="container">
            <div className="row">
              <div className=" col-md-12 up-sec">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="head-part">
                    <h4 className="my-text">My NFTs </h4>

                    <div className="circle"> {result.length} </div>
                  </div>
                  <svg
                    onClick={reloadMyData}
                    className={loading ? "roronoa bi bi-bootstrap-reboot" : "bi bi-bootstrap-reboot"}
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="white" 
                
                    viewBox="0 0 16 16"
                  >
                    <path d="M1.161 8a6.84 6.84 0 1 0 6.842-6.84.58.58 0 1 1 0-1.16 8 8 0 1 1-6.556 3.412l-.663-.577a.58.58 0 0 1 .227-.997l2.52-.69a.58.58 0 0 1 .728.633l-.332 2.592a.58.58 0 0 1-.956.364l-.643-.56A6.812 6.812 0 0 0 1.16 8z" />
                    <path d="M6.641 11.671V8.843h1.57l1.498 2.828h1.314L9.377 8.665c.897-.3 1.427-1.106 1.427-2.1 0-1.37-.943-2.246-2.456-2.246H5.5v7.352h1.141zm0-3.75V5.277h1.57c.881 0 1.416.499 1.416 1.32 0 .84-.504 1.324-1.386 1.324h-1.6z" />
                  </svg>
                </div>

                <div className="nft-card">
                  <div className="card-head">
                    {/* <div className="card-sec" >
                  <a href="/nfts">
                    <img src={ManPic.src} className="card-img-top" alt="..."/>
                    <div className="card-body">
                      <h6 className="card-h">Ksubi Denim-1 wife beater</h6>
                      <div className="card-part">
                      <div className="card-content">
                        <p className="card-text"><strong> Not Listed </strong></p>
                       
                      </div>
                      <div className="card-content">
                        <p className="card-text">Last </p>
                         <p className="card-para"> <strong>2.72</strong>  ETH</p>
                      </div>
                      </div>
                    </div>
                    </a>
                    
    
                  </div>
       */}

                    {/* <div className="card-sec" >
                  <a href="/nfts">
                    <img src={ManPic1.src} className="card-img-top" alt="..."/>
                    <div className="card-body">
                      <h6 className="card-h">camodark-denim-1_tshirt</h6>
                       <div className="card-part">
                      <div className="card-content">
                        <p className="card-text"><strong> Not Listed</strong></p>
                       
                      </div>
                      <div className="card-content">
                        <p className="card-text">Last </p>
                         <p className="card-para"> <strong>2.72</strong>  ETH</p>
                      </div>
                      </div>
                    </div>
                    </a>
                  </div>
       */}

                    {result
                      ? result.map((item, index) => {
                          return (
                            <Link key={index}    href={{query: { address: router.query.uid } , pathname:"/Collection/" + item.id}}>
                              <div className="card-sec">
                                {/* <a href="/nfts"> */}
                                <img
                                  src={
                                    item.imageType
                                      ? item.nftFeaturedImage
                                      : item.nftImage
                                  }
                                  
                                  style={item.nftFeaturedImage? {}: { paddingTop: "65px", paddingBottom: "65px" }}
                                  className="card-img-top"
                                  alt="..."
                                />
                                <div className="card-body">
                                  <h6 className="card-h">
                                    {item.nftIndexName}
                                  </h6>
                                  <div className="card-part">
                                    <div className="card-content">
                                      <p className="card-text">
                                        <strong> {item.listed}</strong>
                                      </p>
                                    </div>
                                    <div className="card-content">
                                      <p className="card-text">Last </p>
                                      <p className="card-para">
                                        {" "}
                                        <strong>
                                          {item.finalPrice || 0}
                                        </strong>{" "}
                                        ETH
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                {/* </a> */}
                              </div>
                            </Link>
                          );

                          console.log(item);
                        })
                      : null}
                  </div>

                  <div className="content-page">
                    <div className=" col-md-6 left-sec">
                      <div className="activity1-item">
                        <Accordion defaultActiveKey="0">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header
                              className="accordion-header"
                              id="headingOne"
                            >
                              {/* <h2 className="accordion-header" id="headingfour">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapsefour" aria-expanded="true" aria-controls="collapsefour"> */}
                              My Offers
                              {/* </button>
                </h2> */}
                            </Accordion.Header>

                            {/* <div id="collapsefour" className="accordion-collapse collapse show" aria-labelledby="headingfour" data-bs-parent="#accordionExample"> */}

                            {/* <div className="table-body"> */}
                            <Accordion.Body className="table-body">
                              <table className="table">
                                <tbody>
                                  <tr>
                                    <th scope="col">NFT</th>

                                    <th scope="col">Expiration</th>

                                    <th scope="col">Amount</th>
                                  </tr>

                                  {offers
                                    ? offers.map((item, index) => {
                                        return (
                                          <tr key={index}>
                                            <td scope="col">Camo Dark</td>

                                            <td>27/02/22, 5:30 AM</td>

                                            <td>2.7 ETH</td>
                                          </tr>
                                        );
                                      })
                                    : null}
                                </tbody>
                              </table>

                              {/* </div>
                </div> */}
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>
                    </div>

                    <div className=" col-md-6 right-sec">
                      <div className="activity2-item">
                        <Accordion defaultActiveKey="0">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header
                              className="accordion-header"
                              id="headingFive"
                            >
                              {/* <h2 className="accordion-header" id="headingfive">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapsefive" aria-expanded="true" aria-controls="collapsefive"> */}
                              My Sales
                              {/* </button>
                    </h2> */}
                            </Accordion.Header>

                            {/* <div id="collapsefive" className="accordion-collapse collapse show" aria-labelledby="headingfive" data-bs-parent="#accordionExample">
                      <div className="table-body"> */}
                            <Accordion.Body className="table-body">
                              <table className="table">
                                <tbody>
                                  <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col" colSpan="2">
                                      To
                                    </th>
                                    <th scope="col">Amount</th>
                                  </tr>

                                  {resultMySale
                                    ? resultMySale.map((item, index) => {
                                        return (
                                          <tr key={index}>
                                            <td>Ammy</td>
                                            <td colSpan="2">Username</td>
                                            <td>2.7 ETH</td>
                                          </tr>
                                        );
                                      })
                                    : null}
                                </tbody>
                              </table>

                              {/* </div>
                    </div> */}
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NftPage;
