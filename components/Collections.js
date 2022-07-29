import { LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ToggleButton, Modal } from "react-bootstrap";
import { useAppContext } from "../context/GlobalState";
import CollectionNft from "./ui/CollectionNft";
import {useRouter} from "next/router"
const Collections = ({ props }) => {
  const router = useRouter()
  function onBack() {
    router.back();
  }
  const { active, setActive } = useAppContext();
  const handleCloseModal = () => setActive(false);
  useEffect(() => {
    setActive(false);
  }, []);
  return (
    <div>
      <Modal
        show={active}
        onHide={handleCloseModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <LinearProgress
          style={{ width: "100%", height: "0.3rem" }}
          color="secondary"
        />
      </Modal>
      <div className="page-header">
        <section className="filter-page">
          <div className="container">
            <div className="row">
              <div className="right-side">
              <div style={{cursor:"pointer"}}className="back-btn d-flex" onClick={onBack}>
              <img src={"/arrow-left.svg"} />
              <h5 className="back-text text-white mt-2"> Back</h5>
            </div>
                <div className="card-head d-flex">
                  {/* // Lazy load the YouTube player */}

                  <CollectionNft props={props.data.checkdata} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Collections;
