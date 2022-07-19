import $ from "jquery";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "../../public/Logo.png";
import MetaMaskLg from "../../public/meta-mask-lg.png";
// import { useEffect, useState } from 'react'
// import ethLogo from "/ethLogo.s"
import { Collapse } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { connect } from "../web/connect";
// import { Collapse } from 'react-bootstrap'
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import dynamic from "next/dynamic";
// const { useAccount } = dynamic(() => import("wagmi"), { ssr: false });

const NavBar = () => {
  const account = useAccount();
  const router = useRouter();
  console.log();
  const [address, setAccount] = useState();
  console.log(address);

  useEffect(() => {
    if (account.address) {
      // localStorage.setItem("address", address);
      setAccount(account.address);
    }else(setAccount(null))
  }, [account?.address]);

  const [open, setOpen] = useState(false);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light top-nav">
        <div className="container">
          <Link href="/">
            <a className="navbar-brand">
              <img src={Logo.src} className="logo" />
            </a>
          </Link>
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-label="Toggle navigation"
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <Collapse in={open}>
            <div
              style={{ width: "100vw" }}
              className=" navbar-collapse"
              id="navbarNav"
            >
              <div className="navbar-nav me-auto mb-2 mb-lg-0 nav-tabs">
                <div className="nav-item">
                  <Link href="/">
                    <a
                      className={
                        router.pathname == "/"
                          ? "nav-link active "
                          : "nav-link "
                      }
                      aria-current="page"
                    >
                      MARKETPLACE
                    </a>
                  </Link>
                </div>

                {address && (
                  <div className="nav-item">
                    <Link href={"/assets/" + address}>
                      <a
                        className={
                          router.pathname == "/assets/[uid]"
                            ? "nav-link active "
                            : "nav-link "
                        }
                      >
                        MY NFTS
                      </a>
                    </Link>
                  </div>
                )}

                {address && (
                  <div className="nav-item dropdown">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="success"
                        className={
                          router.pathname == "/create/collection" ||
                          router.pathname == "/create/createpage"
                            ? "nav-link dropdown-toggle active "
                            : "nav-link dropdown-toggle "
                        }
                        id="dropdown-basic navbarDropdown"
                      >
                        CREATE
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Link href="/create/nft">
                          <div id="link-list">Create NFT</div>
                        </Link>

                        <Link href="/create/collection">
                          <div
                            style={{ borderTop: "1px sospand #2b2b2b" }}
                            id="link-list"
                          >
                            Create Collection
                          </div>
                        </Link>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                )}
                {address && (
                  <div className="nav-item dropdown">
                    <div className="nav-item">
                      <Link href={"/playlist/" + address}>
                        <a
                          className={
                            router.pathname == "/assets/[uid]"
                              ? "nav-link active "
                              : "nav-link "
                          }
                        >
                          Playlist
                        </a>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  mounted,
                }) => {
                  return (
                    <div
                      {...(!mounted && {
                        "aria-hidden": true,
                        style: {
                          opacity: 0,
                          pointerEvents: "none",
                          userSelect: "none",
                        },
                      })}
                    >
                      {(() => {
                        if (!mounted || !account || !chain) {
                          return (
                            <button
                              className="btn wallet-btn"
                              style={{ width: "100%" }}
                              onClick={openConnectModal}
                              type="button"
                            >
                              Connect Wallet
                            </button>
                          );
                        }

                        if (chain.unsupported) {
                          return (
                            <button
                              className="btn wallet-btn"
                              onClick={openChainModal}
                              type="button"
                            >
                              Wrong network
                            </button>
                          );
                        }

                        return (
                          <div style={{ display: "flex", gap: 12 }}>
                            <button
                              className="btn meta-btn text-break"
                              style={{ height: "auto", color: "#ffc107" }}
                              onClick={openAccountModal}
                              type="button"
                            >
                              <img className="icon " src={MetaMaskLg.src} />
                              {account.address}
                            </button>
                          </div>
                        );
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            </div>
          </Collapse>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
