import $ from 'jquery'
import Link from 'next/link'
import React,{ useEffect,useState} from 'react'
import Logo from '../../public/Logo.png'
import MetaMaskLg from '../../public/meta-mask-lg.png'
// import { useEffect, useState } from 'react'
// import ethLogo from "/ethLogo.s"
import { Collapse } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap'
import { connect } from '../web/connect'
// import { Collapse } from 'react-bootstrap'
import { useRouter } from "next/router";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'

const NavBar = () => {
  const { data, isError, isLoading } = useAccount()
  const router = useRouter();

  const [account,setAccount] = useState( data?.address);
  console.log(data?.address)

// useEffect(()=>{
// console.log(router.pathname + account);
// if(typeof window.ethereum !== 'undefined'){
// if(window.ethereum.selectedAddress !== null){



// }

// }
// // connect(setAccount)
// },[])

// useEffect(()=>{
// if (typeof window.ethereum !== 'undefined'){
// window.ethereum.on('accountsChanged', function (accounts) {
//   connect(setAccount)
// });
// }

// },[])
// function connectWallet(e) {
//   e.preventDefault();
//   connect(setAccount)
// }
  // function navActive(){

  //   $(document).ready(function() {
  //     $('navbar-nav').on('click', 'a', function(){
  //     $('.navbar-nav a.active').removeClass('active');
  //     $(this).addClass('active')
      
  //   });

  // });
  // }


   useEffect(() => {
  //  navActive()
  if(data?.address){

    localStorage.setItem("address",data?.address);
  }

   }, 
   
   []);

  const [open, setOpen] = useState(false);

  return (
   

  <header>

  <nav className="navbar navbar-expand-lg navbar-light top-nav">
  <div className="container">
  <Link href="/">

        <a className="navbar-brand" ><img src={Logo.src} className="logo" /></a>
  </Link>
        <button  className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"  aria-label="Toggle navigation"
         onClick={() => setOpen(!open)}
         aria-controls="example-collapse-text"
         aria-expanded={open}  >
          <span className="navbar-toggler-icon"></span>
        </button>
 
        <Collapse   in={open}>
        <div style={{width: '100vw'}} className=" navbar-collapse" id="navbarNav">

          <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-tabs">
            <li className="nav-item">
              <Link href="/">
              <a className={router.pathname=='/'?"nav-link active " :"nav-link "}aria-current="page" >MARKETPLACE</a>
              </Link>
            </li>
            
            
            { data?.address  && <li className="nav-item">
              <Link href={"/assets/"+ data?.address}>
              <a className={router.pathname=='/assets/[uid]' ?"nav-link active " :"nav-link "} >MY NFTS</a>
              </Link>
            </li>}



        { data?.address &&
              <li className="nav-item dropdown">


              <Dropdown>

  <Dropdown.Toggle variant="success" className={router.pathname=='/create/collection'|| router.pathname=='/create/createpage' ?"nav-link dropdown-toggle active " :"nav-link dropdown-toggle "} id="dropdown-basic navbarDropdown">
  CREATE
  </Dropdown.Toggle>

  <Dropdown.Menu>

      <Link  href="/create/nft">
    <li id="link-list">
      Create NFT
      </li>
      </Link>


    <Link   href="/create/collection">
    <li style={{borderTop: '1px solid #2b2b2b'}} id="link-list">
      Create Collection
    </li>
      </Link>

    
  </Dropdown.Menu>
</Dropdown>





      </li>
            }
           {data?.address && 
           
           <li className="nav-item dropdown">


           <Dropdown>

<Dropdown.Toggle variant="success" className={router.pathname=='/playlist/sound'|| router.pathname=='/playlist/video' ?"nav-link dropdown-toggle active " :"nav-link dropdown-toggle "} id="dropdown-basic navbarDropdown">
Playlist
</Dropdown.Toggle>

<Dropdown.Menu>

   <Link  href={"/playlist/sound/"+ data?.address}>
 <li id="link-list" >
   Music
   </li>
   </Link>


 <Link  href={"/playlist/video/"+data?.address}  >
 <li  id="link-list" >
   Video
 </li>
   </Link>

 
</Dropdown.Menu>
</Dropdown>





   </li>
         
         
         
           }
             {/* <!-- <li className="nav-item">
              <a className="nav-link" href="nft-page.html">CREATE</a>
            </li> --> */}
            </ul>

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
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
            
              if (!mounted || !account || !chain) {
                return (
                  <button className="btn wallet-btn" onClick={openConnectModal} type="button">
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button className="btn wallet-btn" onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  {/* <button
                  className="btn wallet-btn"
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                  >
                   
                  </button> */}

                  <button  className="btn meta-btn text-break" style={{height:"auto", color:"#ffc107"}} onClick={openAccountModal} type="button"><img className="icon " src={MetaMaskLg.src}/>
                    {account.address}
                 
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
          {/* <form className="d-flex"> */}
           {/* { account === null ? <div  className="d-flex" style={{alignItems: '', width: ''}}> 

             <button  onClick={connectWallet} className="btn wallet-btn" >Connect Wallet</button> 
             
           </div>
            
            :   <button  style={{height:"auto", color:"#ffc107"}}className="btn meta-btn text-break" > <img className="icon " src={MetaMaskLg.src}/>{account || "uhwuh8**********kjksd" } </button>
           } */}
          {/* </form> */}
        </div>
            </Collapse>
      </div>
    </nav>
  </header>



  )
}


export default NavBar

