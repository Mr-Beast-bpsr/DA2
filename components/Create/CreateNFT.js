import React, { useState, useRef, useEffect } from "react";
import ImgIcon from "../../public/img-icon.svg";
import Exclamation from "../../public/exclamation.png";
import ThreeLines from "../../public/three-lines.PNG";
import { Tooltip } from "@mui/material";
import { Spinner } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import { TextField } from "@material-ui/core";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

import { Remove, Add } from "@material-ui/icons";

import { create } from "ipfs-http-client";

import CreateNftModal from "../ui/TransModal";
import {
  useAccount,
  useContractWrite,
  useWaitForTransaction,
  useContractRead,
} from "wagmi";
import ab from "../../public/abi/DaFactory.json";

const { abi2 } = ab;
/* Create an instance of the client */

const CreateNFT = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [fileType, setFileType] = useState(null);
  const nameRef = useRef(null);
  const externalLinkRef = useRef(null);
  const descriptionRef = useRef(null);
  const commisionRef = useRef(null);
  const supplyRef = useRef(null);
  const [nftCollection, setNftCollection] = useState(null);
  const [fieldsCount, setFieldsCount] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [collectionName, setCollectionName] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [transHash, setTransHash] = useState(null);
  const [success, setSuccess] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [contractAddress, setContractAddress] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [fileUrl2, setFileUrl2] = useState(null);
  const [fileType2, setFileType2] = useState(null);
  const [fileUrl3, setFileUrl3] = useState(null);
  const [fileType3, setFileType3] = useState(null);

  const [uploading2, setUploading2] = useState(null);
  const [uploading3, setUploading3] = useState(null);
  const [freeCheck, setFreeCheck] = useState(false);

  const [inputFields, setInputFields] = useState([
    {
      trait_type: "",
      value: "",
    },
  ]);
  // const auctionContract = "0x103bA20233C93Aa753aC194D376bfF978790DA92";
  const mintContract ='0xC933Da788A96e3DedCb229e2594c3fB376FfCd91'

  const { address } = useAccount();
  console.log(address);
  const { data, isError, isLoading, write } = useContractWrite({
    addressOrName: mintContract,
    contractInterface: abi2,
    functionName: "mint",

    onSettled(data, error) {
      console.log("Settled", { data, error });
      if (error) {
        setErrorMessage(error?.message);
        setTimeout(function () {
          setModalShow(false);
        }, 2000);
      }
    },
    onSuccess(data) {
      setTransHash(data?.hash);
      console.log("Success", data);
    },
  });
  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
    onSettled(data, error) {
      setSuccess(true);
      console.log("Settled Wait", { data, error });
      // let token = getCurrentToken()
      // console.log(token)
      console.log(data);
      let tokenId = parseInt(token.data);
      if (data?.status == 1) {
        apiCall(tokenId);
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
          setModalShow(false);
        }, 5000);
        return;
      }
    },
  });
  const token = useContractRead({
    addressOrName: mintContract,
    contractInterface: abi2,
    functionName: "tokenIndex",
  });
  function handleChange(index, event) {
    console.log(index, event.target.value);
    const value = [...inputFields];
    value[index][event.target.name] = event.target.value;
    setInputFields(value);
  }
  function handleAddFields() {
    setInputFields([...inputFields, { trait_type: "", value: "" }]);
    setFieldsCount(fieldsCount + 1);
  }
  function handleRemoveFields(index) {
    if (index == 0) {
      return;
    }
    const value = [...inputFields];
    value.splice(index, 1);

    setInputFields(value);
    setFieldsCount(fieldsCount - 1);
  }
  const [uploading, setUploading] = useState(false);

  async function onChange(e) {
    e.preventDefault();
    console.log("file", e.target.files[0]);

    setUploading(true);
    const file = e.target.files[0];
    if (file.size > 100000000) {
      alert("file can't be higher than 100mb");
      setUploading(false);
      return;
    }
    if (typeof file == "undefined") return;
    console.log(file.type.split("/"));

    setFileType(file.type.split("/"));
    // setFile(URL.createObjectURL(file));
    const client = create("https://ipfs.infura.io:5001/api/v0");
    const added = await client.add(file);
    const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    console.log(url);
    setFileUrl(url);
    setUploading(false);

    console.log(URL.createObjectURL(file));
  }

  async function onChange2(e) {
    const file = e.target.files[0];
    if (typeof file == "undefined") return;

    if (file.size > 100000000) {
      alert("file can't be higher than 100mb");
      setUploading2(false);
      return;
    }
    setUploading2(true);
    let url = await UploadFile(file);
    setFileType2(file.type.split("/"));
    setFileUrl2(url);
    setUploading2(false);

    // console.log(URL.createObjectURL(file));
  }
  async function UploadFile(file) {
    // e.preventDefault();
    console.log(file.type.split("/"));
    const client = create("https://ipfs.infura.io:5001/api/v0");
    const added = await client.add(file);
    const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    return url;
  }

  async function onChange3(e) {
    const file = e.target.files[0];
    if (typeof file == "undefined") return;

    if (file.size > 100000000) {
      alert("file can't be higher than 100mb");
      setUploadin3(false);
      return;
    }
    setUploading3(true);
    let url = await UploadFile(file);
    setFileType3(file.type.split("/"));
    setFileUrl3(url);
    setUploading3(false);
  }
  function onSubmitHandler(e) {
    e.preventDefault();
    setErrorMessage(null);
    setTransHash(null);
    setConfirmation(false);
    setSuccess(false);
    setContractAddress(null);
    setModalShow(true);
    // console.log(type)
    if (fileUrl == null) return;
    let supply = supplyRef.current?.value;
    setModalShow(true);
    console.log(address, parseInt(supply));
    write({
      args: [address, parseInt(supply)],
      overrides: {},
    });
  }

  async function apiCall(tokenId) {
    // e.preventDefault();
    const name = nameRef.current.value;
    const externalLink = externalLinkRef.current.value;
    const description = descriptionRef.current.value;
    const commision = commisionRef.current.value;
    let supply = supplyRef.current.value;

    console.log(
      "FileType",
      name,
      supply,
      description,
      externalLink,
      fileUrl,
      fileUrl2,
      fileUrl3,
      inputFields,
      fileType,
      freeCheck
    );
    let type = 1;
    if (fileType[0] == "image") {
      type = 0;
    }
    if (fileType[0] == "audio") {
      type = 2;
    }

    let data = {
      tokenId: tokenId,
      nftIndexName: name,
      nftDescription: description,
      nftImage: fileUrl,
      nftFeaturedImage: fileUrl2,
      nftSampleImage: fileUrl3,
      freeForAll: freeCheck,

      userAddress: address,
      imageType: type,
      totalSupply: supply,
      commision: commision,
      externalLink: externalLink,
      propertyArray: inputFields,
      nftCollection: nftCollection, 
    };
    console.log(data);
    console.log(data);
    await axios.post("/api/mintpage", data);
    setTimeout(function () {
      setModalShow(false);
      window.location.href = "/assets/" + address;
    }, 8000);
  }
  const [collection, setCollections] = useState(null);
  async function getCollection() {
    console.log("api");
    try {
      let res = await axios.post("/api/getallcollection");

      let data = res.data;
      console.log(data, "dataaa");
      setCollections(data.data);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getCollection();
  }, []);
  return (
    <div>
      <div className="create-header">
        <section className="create-page">
          <CreateNftModal
            show={modalShow}
            transHash={transHash}
            success={success}
            contractAddress={contractAddress}
            errorMessage={errorMessage}
            onHide={() => {
              setShowModal(false);
            }}
          />
          <div className="container">
            <div className="row">
              <div className="create-sec">
                <div className="heading-sec">
                  <h2 className="create-heading"> Create New Item</h2>
                  <p className="small-txt">
                    {" "}
                    <span className="red-star">*</span> Required Fields
                  </p>
                </div>

                <form
                  action=""
                  onSubmit={onSubmitHandler}
                  className="create-form"
                >
                  <div className="create-head" style={{ width: "70%" }}>
                    <h4 className="form-heading">
                      Image, Video, Audio, or 3D Model{" "}
                      <span className="red-star">*</span>
                    </h4>
                    <p className="form-para">
                      File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3,
                      WAV, OGG, GLB, GLTF. Max size: 100 MB
                    </p>

                    <input
                      style={{ display: "none" }}
                      id="contained-button-file"
                      type="file"
                      accept="audio/*,video/*,image/*"
                      required
                      onChange={onChange}
                    />
                    <div
                      style={{
                        align: "center",
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                    >
                      <label
                        className="form-img-box"
                        htmlFor="contained-button-file"
                      >
                        <label
                          htmlFor="contained-button-file"
                          className="box-img"
                          type="jpg"
                        >
                          {!fileUrl ? (
                            <img src={ImgIcon.src} />
                          ) : fileUrl && fileType[0] == "image" ? (
                            <img width="100%" src={fileUrl} alt="img" />
                          ) : (
                            <ReactPlayer
                              playing
                              url={fileUrl}
                              type={fileType}
                              height="100%"
                              width="100%"
                              controls={true}
                            />
                          )}
                        </label>
                      </label>
                      {uploading == true ? (
                        <Spinner
                          animation="border"
                          variant="primary"
                          style={{
                            width: "200px",
                            height: "200px",
                            marginTop: "4vh",
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="create-head">
                    <h4 className="form-heading">
                      Featured image
                      <span className="red-star">*</span>
                    </h4>
                    <p className="form-para">
                      This image will be used for featuring your collection on
                      the homepage, category pages, playlists or other
                      promotional areas of DaGames. 600 x 400 recommended
                    </p>

                    <input
                      style={{ display: "none" }}
                      id="contained-button-file2"
                      type="file"
                      accept="image/*"
                      onChange={onChange2}
                    />
                    <div
                      style={{
                        align: "center",
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                    >
                      <label
                        className="form-img-box"
                        htmlFor="contained-button-file2"
                      >
                        <label
                          htmlFor="contained-button-file2"
                          className="box-img"
                          type="jpg"
                        >
                          {!fileUrl2 ? (
                            <img src={ImgIcon.src} />
                          ) : fileUrl2 && fileType2[0] == "image" ? (
                            <img width="100%" src={fileUrl2} alt="img" />
                          ) : (
                            <ReactPlayer
                              playing
                              url={fileUrl2}
                              type={fileType2}
                              height="100%"
                              width="100%"
                              controls={true}
                            />
                          )}
                        </label>
                      </label>
                      {uploading2 == true ? (
                        <Spinner
                          animation="border"
                          variant="primary"
                          style={{
                            width: "200px",
                            height: "200px",
                            marginTop: "4vh",
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="create-head">
                    <h4 className="form-heading">
                      Sample
                      <span className="red-star">*</span>
                    </h4>
                    <p className="form-para">
                      You can add a 15 to 30 second&apos;s preview for your NFT.
                    </p>

                    <input
                      style={{ display: "none" }}
                      id="contained-button-file3"
                      type="file"
                      accept="audio/*,video/*,image/*"
                      onChange={onChange3}
                    />
                    <div
                      style={{
                        align: "center",
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                    >
                      <label
                        className="form-img-box"
                        htmlFor="contained-button-file3"
                      >
                        <label
                          htmlFor="contained-button-file3"
                          className="box-img"
                          type="jpg"
                        >
                          {!fileUrl3 ? (
                            <img src={ImgIcon.src} />
                          ) : fileUrl3 && fileType3[0] == "image" ? (
                            <img width="100%" src={fileUrl3} alt="img" />
                          ) : (
                            <ReactPlayer
                              playing
                              url={fileUrl3}
                              type={fileType3}
                              height="100%"
                              width="100%"
                              controls={true}
                            />
                          )}
                        </label>
                      </label>
                      {uploading3 == true ? (
                        <Spinner
                          animation="border"
                          variant="primary"
                          style={{
                            width: "200px",
                            height: "200px",
                            marginTop: "4vh",
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="form-ipt-sec mt-1">
                    <h4 className="name-txt">
                      Name <span className="red-star">*</span>
                    </h4>
                    <input
                      type="text"
                      required
                      ref={nameRef}
                      className="form-ipt"
                      placeholder="Item name"
                    />
                  </div>

                  <div className="form-ipt-sec">
                    <h4 className="name-txt">External link</h4>
                    <p className="para-txt">
                      DA will include a link to this URL on this item&apos;s
                      detail page, so that users can click to learn more about
                      it. You are welcome to link to your own webpage with more
                      details.
                    </p>
                    <input
                      ref={externalLinkRef}
                      type="text"
                      required
                      className="form-ipt"
                      placeholder="https://yoursite.io/item/123"
                    />
                  </div>

                  <div className="form-ipt-sec">
                    <h4 className="name-txt">Description</h4>
                    <p className="para-txt">
                      The description will be included on the item&apos;s detail
                      page underneath its image. Markdown syntax is supported.
                    </p>
                    <textarea
                      ref={descriptionRef}
                      type="text"
                      required
                      className="form-area"
                      placeholder="Provide a detailed description of your item"
                    ></textarea>
                  </div>

                  {/* <div className="form-ipt-sec">
                    <h4 className="name-txt">Collection</h4>
                    <div
                      className="tooltip"
                      id="tooltip"
                      style={{ display: "none" }}
                    >
                   
                    </div>

                    <p className="para-txt">
                      This is the collection where your item will appear.
                      <Tooltip
                        title="Moving items to a different collection may take up to 30 minutes. You can manage your collections here."
                        target="tooltip"
                        placement="top"
                      >
                        <img
                          className="excllamation"
                          id="termsopen"
                          src={Exclamation.src}
                          height="18px"
                        />
                      </Tooltip>
                    </p>

                    <input
                      ref={collectionRef}
                      type="text"
                      className="form-ipt"
                      placeholder="Provide a detailed description of your item"
                    />
                  </div> */}

                  <div className="form-ipt-sec">
                    <div className="txt-area">
                      <img src={ThreeLines.src} height="20px" width="18.5px" />
                      <div className="content-txt">
                        <h4 className="name-txt">Properties</h4>
                        <p className="para-txt">
                          Textual traits that show up as rectangles
                        </p>
                      </div>
                    </div>

                    <div className="form-ipt-part">
                      {inputFields.map((inputField, index) => (
                        <div
                          className="form-ipt-part "
                          id="increment-data"
                          style={{ display: "flex" }}
                          key={index}
                        >
                          <div className="name-box">
                            <h4 className="n-txt">Type</h4>

                            {/* <h2 className="p-txt" >Property</h2> */}
                            <TextField
                              key={"trait_type" + index}
                              name="trait_type"
                              className="properties"
                              value={inputField.type}
                              onChange={(event) => handleChange(index, event)}
                            />
                          </div>

                          <div className="name-box">
                            <h4 className="n-txt">Name</h4>

                            <TextField
                              key={"value" + index}
                              name="value"
                              className="properties"
                              value={inputField.name}
                              onChange={(event) => handleChange(index, event)}
                            />
                          </div>
                        </div>
                      ))}
                      <div className="icon-box">
                        <IconButton
                          className="icon-img"
                          onClick={() => {
                            handleRemoveFields(fieldsCount);
                          }}
                        >
                          <Remove />
                        </IconButton>
                        <IconButton
                          className="icon-img"
                          onClick={() => {
                            handleAddFields();
                          }}
                        >
                          <Add />
                        </IconButton>
                      </div>
                    </div>
                  </div>

                  <div className="form-ipt-sec">
                    <h4 className="name-txt">Supply</h4>
                    <p className="para-txt">
                      {" "}
                      The number of items that can be minted. No gas cost to
                      you!
                      <Tooltip
                        title={
                          "Minting is an action that brings an item into existence on the blockchain, and costs gas to do so."
                        }
                        placement="top-end"
                        target="tooltip"
                      >
                        <img
                          className="excllamation"
                          src={Exclamation.src}
                          height="18px"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                        />
                      </Tooltip>
                    </p>

                    <input
                      ref={supplyRef}
                      type="text"
                      className="form-ipt"
                      placeholder="1"
                      required
                    />
                  </div>

                  <div className="form-ipt-sec">
                    <div className="form-ipt-sec">
                      <h4 className="name-txt">Creator Earnings</h4>
                      <p className="para-txt">
                        Collect a fee when a user re-sells an item you
                        originally created. This is deducted from the final sale
                        price and paid monthly to a payout address of your
                        choosing.{" "}
                        <a href="">Learn more about creator earnings.</a>
                      </p>
                      <h5 className="per-txt">Percentage fee</h5>
                      <input
                        ref={commisionRef}
                        type="text"
                        className="form-ipt"
                        placeholder="1"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-ipt-sec">
                    <div className="form-ipt-sec">
                      <h4 className="name-txt">Select Collection</h4>
                      <p className="para-txt">
                        You can select a specific collection for your nft to
                        appear in.
                        {/* <a href="">Learn more about creator earnings.</a> */}
                      </p>
                      {/* <h5 className="per-txt">Percentage fee</h5> */}
                      <select
                        onChange={(e) =>
                          setNftCollection(e.currentTarget.value)
                        }
                        className="form-ipt"
                      >
                        <option value="" className="form-ipt">
                          None
                        </option>
                        {collection
                          ? collection.map((item) => (
                              <option value={item.id} className="form-ipt">
                                {item.name}
                              </option>
                            ))
                          : ""}
                      </select>
                      {/* <input
                      ref={commisionRef}
                      type="text"
                      className="form-ipt"
                      placeholder="1"
                      required
                      /> */}
                    </div>
                  </div>

                  <div className="form-ipt-sec">
                    <h4 className="name-txt">Free for All</h4>
                    <p className="para-txt">
                      {" "}
                      The NFT minted will be freely available for everyone, they
                      can freely add it to their playlist!
                      <Tooltip
                        title={
                          "Minting is an action that brings an item into existence on the blockchain, and costs gas to do so."
                        }
                        placement="top-end"
                        target="tooltip"
                      >
                        <img
                          className="excllamation"
                          src={Exclamation.src}
                          height="18px"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                        />
                      </Tooltip>
                    </p>

                    <input
                      style={{ width: "6%" }}
                      // ref={supplyRef}
                      type="checkbox"
                      className="form-ipt"
                      placeholder="1"
                      onChange={(e) => setFreeCheck(e.currentTarget.checked)}
                    />
                  </div>
                  <div className="form-btn-sec">
                    <button type="submit" className="create-btn">
                      Create
                    </button>
                    {/* <Wagmi quantity={supplyRef.current?.value }/> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreateNFT;
