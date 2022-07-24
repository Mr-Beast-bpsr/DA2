import { PowerInputSharp } from "@material-ui/icons";
import axios from "axios";

import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";

// import { useRouter } from "next/router";
function MyVerticallyCenteredModal(props) {
  const router = useRouter();

  const [show, setShow] = useState(true);
  const [playlist, setPlaylist] = useState(null);
  const textInputRef = useRef();
  


  async function addToPlayList(e) {
    e.preventDefault();
    if (props?.address) {
      // console.log(nftContent.id);
   
      
   try{
    let add = await axios.post("/api/music/playlist/addtoplaylist", {
      nftId: props?.nftContent,
      userAddress: props?.address,
      playListId: e.currentTarget.value
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
     props.onHide()
   }catch(e){
    toast.error("Already in play list", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    
    }
      
      // setInPlaylist(true);
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


  async function createData(data) {
    try {
      const res = await axios.post("/api/music/playlist/createplaylist", data);
      const request = res.data;
      console.log(request);
      setShow(true);
      getAllplaylist();
    } catch (err) {
      console.log(err);
    }
  }

  async function getAllplaylist() {
    try {
      const res = await axios.post("/api/music/playlist/getAllPlaylist", {
        userAddress: router.query.address,
      });
      const request = res.data;
      console.log(request.data), "all play";
      setPlaylist(request.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllplaylist();
    console.log("here");
  }, [props.show]);
  async function onSubmitHandler(e) {
    e.preventDefault();
    const playListName = textInputRef.current.value;

    const data = {
      userAddress: props.address,
      playListName,
    };

    console.log(data, "this is text");
    createData(data);
  }

  function onClickHandler(e) {
    e.preventDefault();
    setShow(!show);
  }

  function onHideHandler(e) {
    e.preventDefault();
    setShow(true);
    props.onHide();
  }

  return (
    <div
      className="modal-header"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        float: "left",
        width: "100%",
      }}
    >
      <Modal
        id="content-setting"
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{
          color: "white",
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
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
        <Modal.Header
          style={{ color: "white", width: "100%", display: "flex" }}
        >
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ display: "flex" }}
          >
            <h6
              style={{
                marginBottom: "0px",
                display: "flex",
                fontSize: "1.4rem",
                alignItems: "center",
              }}
              id="modal-hpt"
            >
              {" "}
              Select Playlist
            </h6>
            <h3
              className="modal-marginset"
              id="modal-marginset "
              onClick={onHideHandler}
              style={{
                // marginLeft: "90px"
                cursor: "pointer",
                marginBottom: "0px",
                fontWeight: "400",
              }}
            >
              {" "}
              x{" "}
            </h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-1">
          <ul>
            {playlist
              ? playlist.map((item) => (
                  <li onClick={addToPlayList} value={item.id} key={item.id}>{item.playListName}</li>
                ))
              : ""}
          </ul>
          {show ? (
            <h5
              onClick={onClickHandler}
              style={{
                marginBottom: "0px",
                fontSize: "1.2rem",
                marginTop: "20px",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              Create Playlist +
            </h5>
          ) : (
            <div className="modal-ipt mt-3">
              <div className="modal-headings">
                <h6
                  style={{
                    textAlign: "left",
                    fontSize: "12px",
                    marginBottom: "2px",
                  }}
                >
                  Name
                </h6>
              </div>
              <input
                className="mdl-input"
                type="text"
                placeholder="Enter playlist name"
                ref={textInputRef}
              ></input>
              <div className="create-playlist">
                <button
                  onClick={onSubmitHandler}
                  type="submit"
                  className="btn btn-primary playlist-btn"
                >
                  CREATE
                </button>
              </div>
            </div>
          )}
        </Modal.Body>
        {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
      </Modal>
    </div>
  );
}

export default MyVerticallyCenteredModal;
