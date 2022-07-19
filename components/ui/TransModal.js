import React from "react";
import Modal from "react-bootstrap/Modal";
import { Alert, Button } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CreateNftModal = ({
  transHash,
  confirmation,
  success,
  contractAddress,
  errorMessage,
  show,
}) => {
  console.log(show);
  const newUrl = "https://mumbai.polygonscan.com/tx/" + transHash;
  // console.log(props)
  return (
    <Modal
      style={{ color: "Yellow" }}
      show={show}
      size="lg"
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Transaction Window
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="container itmes-center text-center">
        {transHash !== null ? (
          <h4>Transaction Hash: </h4>
        ) : (
          <h3>Waiting for confirmation</h3>
        )}

        <div className="text-break">
          {transHash}
          {contractAddress !== null ? (
            <div
              className="text-break border"
              style={{ borderColer: "yellow" }}
            >
              <h6>Here is your contractAddress:</h6>
              {contractAddress}
              <CopyToClipboard
                text={contractAddress}
                // onCopy={() => this.setState({copied: true})}
              >
                <button
                  className="btn btn-outline-light "
                  style={{ fontWeight: "900" }}
                >
                  Copy to clipboard{" "}
                </button>
              </CopyToClipboard>
            </div>
          ) : (
            ""
          )}

          <Alert variant="Danger">{errorMessage}</Alert>

          {success ? (
            <a
              className="btn btn-outline-light"
              href={newUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on polygonscan
            </a>
          ) : (
            ""
          )}

          {success ? "" : <Spinner size="lg" animation="border" />}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CreateNftModal;
