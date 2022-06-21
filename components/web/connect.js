import ab from "../../public/abi/DaFactory.json";
import ab2 from "../../public/abi/DaAuction.json";
const { abi2 } = ab2;
const { abi } = ab;
import {useContract} from "wagmi";
const chainId = 4; // Polygon Mainnet
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import axios from "axios";
const factoryAddress = "0x001dB788405Ae02120704517d59A3161d8DE7111";

const auctionAddress = "0x1eDaf380AC7664380131E3e6BfE04bb46dd5b83E";
let provider;
let web3;
let account;
let auctionContract;
// let factoryContract;
let gasFees = "300000";





// export async function connect(setAccounts, setConnectMessage) {
//   try {
//     if (typeof window.ethereum !== "undefined") {
//       ///////////////Creating Metamask provider/////////////////////////
//       const accounts = await ethereum.request({
//         method: "eth_requestAccounts",
//       });
//       provider = await detectEthereumProvider();
//       console.log("MetaMask is installed!");
//     } else {
//       //////////////Create WalletConnect Provider////////////////////////

//       console.log("Wallet connect has been initialised");
//       provider = new WalletConnectProvider({
//         infuraId: "b4e2f0e57620408ebd82740df745f1a4",
//         rpc: {
//           4: "https://rinkeby.infura.io/v3/b4e2f0e57620408ebd82740df745f1a4",
//           80001:
//             "https://rpc-mumbai.maticvigil.com/v1/cb75b7548c2e412612d0d7658c884a4b2df438d4",
//           43113: "https://api.avax-test.network/ext/bc/C/rpc",
//         },
//       });
//       if (setConnectMessage) {
//         setConnectMessage(null);
//       }
//       ///////////////  Enable session (triggers QR Code modal)
//       await provider.enable();
//     }
//   } catch (err) {
//     if (setConnectMessage) {
//       setConnectMessage(err.message);
//     }
//     console.log(err.message);
//   }
//   try {
//     web3 = new Web3(provider);
//     const accounts = await web3.eth.getAccounts();
//     account = accounts[0];
//     sessionStorage.setItem("userAddress", account);
//     if (setAccounts) {
//       setAccounts(account);
//     }
//     factoryContract = new web3.eth.Contract(abi, factoryAddress);
//     auctionContract = new web3.eth.Contract(abi2, auctionAddress);
//     const bal = await factoryContract.methods.owner().call();
//     console.log(bal);
//     console.log(account);

//     // setBalance("Balance : " + parseFloat(maticBal).toFixed("3"));
//   } catch (err) {
//     // console.log();

//     if (window.ethereum.networkVersion !== chainId) {
//       try {
//         await window.ethereum.request({
//           method: "wallet_switchEthereumChain",
//           params: [{ chainId: web3.utils.toHex(chainId) }],
//         });
//       } catch (err) {
//         // This error code indicates that the chain has not been added to MetaMask.
//         if (err.code === 4902) {
//           await window.ethereum.request({
//             method: "wallet_addEthereumChain",
//             params: [
//               {
//                 chainName: "Ethereum",
//                 chainId: web3.utils.toHex(chainId),
//                 nativeCurrency: {
//                   name: "Ethereum",
//                   decimals: 18,
//                   symbol: "ETH",
//                 },
//                 rpcUrls: ["https://rinkeby.infura.io/v3/"],
//               },
//             ],
//           });
//         }
//       }
//     }

//     if (setConnectMessage) {
//       setConnectMessage("Please connect to Avax mainnet ");
//     }
//     console.log(err, "this");
//   }
// }




export async function mintNft(
  quantity,
  setModalShow,
  setTransHash,
  setConfirmation,
  setSuccess,
  setErrorMessage,
  name,
  description,
  externalLink,
  fileUrl,
  inputFields,
  fileType,provider,account
) {
  try {
    setModalShow(true);
  let  web3 = new Web3(provider);

   let  factoryContract = new web3.eth.Contract(abi, factoryAddress);
    
    const transaction = await factoryContract.methods
      .mint(quantity)
      .send({
        from: account,
        // value: tokenD.amount,
        gas: "3978671",
        gasLimit: "3998671",
      })
      .once("transactionHash", function (hash) {
        setTransHash(hash);
      })
      .on("confirmation", function (receipt) {
        setConfirmation(true);
        console.log(receipt, "This is confirmation");
      })
      .on("error", function (error) {
        setSuccess(true);
        console.error(error, "THis is error");
        if (
          error?.message?.includes(
            "MetaMask Tx Signature: User denied transaction signature."
          )
        ) {
          setModalShow(false);
        }
        setErrorMessage(
          "An error has occurred please check etherscan for full details."
        );
        setTimeout(function () {
          setModalShow(false);
        }, 5000);
      })
      .then(async function (receipt) {
        setSuccess(true);
        let mintingToken = await factoryContract.methods.tokenIndex().call();
        console.log(mintingToken);
        let data = {
          tokenId: mintingToken,
          nftIndexName: name,
          nftDescription: description,
          nftImage: fileUrl,
          imageType: fileType,
          totalSupply: quantity,
          externalLink: externalLink,
          userAddress: account,
          propertyArray: inputFields,
        };
        console.log(data);
        await axios.post("/api/mintpage", data);
        console.log(receipt, "This is success");

        // console.log(
        //   Object.values(receipt.events)[0].address,
        //   receipt.events.ChildCreated.returnValues._child
        // );
        // setContractAddress(Object.values(receipt.events)[0].address);
        setTimeout(function () {
          setModalShow(false);
          window.location.href = "/assets/" + account;
        }, 8000);
      });
  } catch (e) {
    console.log(e);
    setModalShow(false);
  }
}

export async function buy(
  tokenIndex,
  amount,
  setModalShow,
  setTransHash,
  setConfirmation,
  setSuccess,
  setErrorMessage
) {
  try {
    setModalShow(true);
    auctionContract = new web3.eth.Contract(abi2, auctionAddress);

    const transaction = await factoryContract.methods
      .buy(tokenIndex)
      .send({
        from: account,
        value: amount,
        gas: "3978671",
        gasLimit: "3998671",
      })
      .once("transactionHash", function (hash) {
        setTransHash(hash);
      })
      .on("confirmation", function (receipt) {
        setConfirmation(true);
        console.log(receipt, "This is confirmation");
      })
      .on("error", function (error) {
        setSuccess(true);
        console.error(error, "THis is error");
        if (
          error?.message?.includes(
            "MetaMask Tx Signature: User denied transaction signature."
          )
        ) {
          setModalShow(false);
        }
        setErrorMessage(
          "An error has occurred please check etherscan for full details."
        );
        setTimeout(function () {
          setModalShow(false);
        }, 5000);
      })
      .then(async function (receipt) {
        setSuccess(true);
        console.log(receipt, "This is success");

        setTimeout(function () {
          setModalShow(false);
        }, 8000);
      });
  } catch (e) {
    console.log(e);
  } 
}

export async function startSale(
  tokenIndex,
  tokenId,
  minAmount,
  startDate,
  endDate,
  radioValue,
  setModalShow,
  setTransHash,
  setConfirmation,
  setSuccess,
  setErrorMessage,
  startDat,
  endDat
) {
  try {
    let dat = {
      tokenId: tokenIndex,
      userAddress: account,
      auctionType: radioValue,
      startDate: startDat,
      endDate: endDat,
      minAmount: minAmount,
    };
    setSuccess(true);
    const response = await axios.post(
      "/api/nftpage/auction/startauction",
      dat
    );

    setModalShow(true);
    let amount = await web3.utils.toWei(minAmount, "ether");
    const block = await  web3.eth.getBlock("latest");
    const transaction = await auctionContract.methods
      .startListing(tokenIndex, amount, radioValue, startDate, endDate)
      .send({
        from: account,
        gas: "300000",
        gasLimit: block.gasLimit * 3,
      })
      .once("transactionHash", function (hash) {
        setTransHash(hash);
      })
      .on("confirmation", function (receipt) {
        setConfirmation(true);
        console.log(receipt, "This is confirmation");
      })
      .on("error", function (error) {
        setSuccess(true);
        console.error(error, "THis is error");
        if (
          error?.message?.includes(
            "MetaMask Tx Signature: User denied transaction signature."
          )
        ) {
          setModalShow(false);
        }
        setErrorMessage(
          "An error has occurred please check etherscan for full details."
        );
        setTimeout(function () {
          setModalShow(false);
        }, 5000);
      })
      .then(async function (receipt) {
        
        console.log(receipt, "This is success");

        setTimeout(function () {
          setModalShow(false);
        }, 8000);
      });
  } catch (e) {
    console.log(e);
  }
}

export async function bidOn(
  tokenIndex,
  tokenId,
  amount,
  auctionId,
  setModalShow,
  setTransHash,
  setConfirmation,
  setSuccess,
  setErrorMessage
) {
  try {
    setModalShow(true);
    auctionContract = new web3.eth.Contract(abi2, auctionAddress);

    const transaction = await auctionContract.methods
      .bid(tokenIndex, amountI)
      .send({
        from: account,
        gas: "155638",
        gasLimit: block.gasLimit * 2,
      })
      .once("transactionHash", function (hash) {
        setTransHash(hash);
      })
      .on("confirmation", function (receipt) {
        setConfirmation(true);
        console.log(receipt, "This is confirmation");
      })
      .on("error", function (error) {
        setSuccess(true);
        console.error(error, "THis is error");
        if (
          error?.message?.includes(
            "MetaMask Tx Signature: User denied transaction signature."
          )
        ) {
          setModalShow(false);
        }
        setErrorMessage(
          "An error has occurred please check etherscan for full details."
        );
        setTimeout(function () {
          setModalShow(false);
        }, 5000);
      })
      .then(async function (receipt) {
        setSuccess(true);
        console.log(receipt, "This is success");

        setTimeout(function () {
          setModalShow(false);
        }, 8000);
      });
  } catch (e) {
    console.log(e);
  }
}

export async function finalize(
  tokenIndex,
  tokenId,
  auctionId,
  collectionAddress,
  setModalShow,
  setTransHash,
  setConfirmation,
  setSuccess,
  setErrorMessage
) {
  try {
    setModalShow(true);
    auctionContract = new web3.eth.Contract(abi, auctionAddress);

    const res = await axios.post("/api/getbids", { auctionId: auctionId });
    let dataArr = res.data.data;
    if (dataArr.length <= 0) {
      setTransHash("No bids found");
      setTimeout(() => {
        setCloseModals(false);
        setTransHash(null);
        // window.reload.location()
      }, 4000);
      return;
    }
    let highestBidd = await contract.methods.highestBid(tokenIndex).call();
    let finalPrice = await web3.utils.fromWei(highestBidd.toString(), "ether");
    console.error(finalPrice);

    const block = await web3.eth.getBlock("latest");
    const transaction = await factoryContract.methods
      .finalizeAuction(collectionAddress, tokenIndex)
      .send({
        from: account,
        // value: tokenD.amount,
        gas: gasFees,
        gasLimit: block.gasLimit * 2,
      })
      .once("transactionHash", function (hash) {
        setTransHash(hash);
      })
      .on("confirmation", function (receipt) {
        setConfirmation(true);
        console.log(receipt, "This is confirmation");
      })
      .on("error", function (error) {
        setSuccess(true);
        console.error(error, "THis is error");
        if (
          error?.message?.includes(
            "MetaMask Tx Signature: User denied transaction signature."
          )
        ) {
          setModalShow(false);
        }
        setErrorMessage(
          "An error has occurred please check etherscan for full details."
        );
        setTimeout(function () {
          setModalShow(false);
        }, 5000);
      })
      .then(async function (receipt) {
        setSuccess(true);
        console.log(receipt, "This is success");

        setTimeout(function () {
          setModalShow(false);
        }, 8000);
      });
  } catch (e) {
    console.log(e);
  }
}
