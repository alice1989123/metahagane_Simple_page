import Head from "next/head";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";

import styles from "../styles/Home.module.css";
import * as wasm from "@emurgo/cardano-serialization-lib-asmjs";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "./UI/Button/Button";
import Overlay from "./UI/Overlay/Overlay";
import { IoClose } from "react-icons/io5";
import sendAda from "../Cardano/sendLovelaces.mjs";
import { fullfillTransaction } from "../Cardano/Utils";

export default function Home() {
  const [showWalletPop, setShowWalletPop] = useState(false);
  const [wallets, setWallets] = useState([]);
  const [icons] = useState({
    eternl: "/assets/images/eternl.png",
    nami: "/assets/images/nami.svg",
    flint: "/assets/images/flint.svg",
    gerowallet: "/assets/images/gero.ico",
    typhoncip30: "/assets/images/typhon.png",
  });
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);

  const [conenctedWallet, setConnectedWallet] = useState(null);
  const cardano = typeof window !== "undefined" ? window?.cardano : "";
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.wallet) {
      connectWallet(localStorage.wallet);
    }
  }, [cardano]);

  const sendAdas = async (e) => {
    e.stopPropagation();
    try {
      setLoading(true);
      const wallet = await window.cardano[localStorage.wallet].enable();
      const addresses = await wallet.getUsedAddresses();
      const utxos = await wallet.getUtxos();

      const CBOR = await sendAda(addresses[0], utxos);
      console.log(CBOR);
      const witness = await wallet.signTx(CBOR, true);
      console.log("hey");
      const txBody = await fullfillTransaction(CBOR, witness);
      console.log(txBody);
      const txHash = await wallet.submitTx(txBody);
      console.log(txHash);
      setLoading(false);
      toast.success(
        "Your request for yout NFT-package has been succesfully submited"
      );
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Something went wrong. Please try again or contact support");
    }
  };

  const supportedWallets = [
    "eternl",
    "flint",
    "nami",
    "gerowallet",
    "typhoncip30",
  ];

  const walletNames = {
    nami: "Nami",
    eternl: "Eternl",
    flint: "Flint Wallet",
    gerowallet: "Gero Wallet",
    typhoncip30: "Typhon Wallet",
  };
  const popRef = useRef();

  const toggleWalletPop = () => {
    setShowWalletPop(!showWalletPop);
  };

  const handleClickOutside = (event) => {
    if (popRef.current && !popRef.current.contains(event.target)) {
      setShowWalletDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleWalletDropdown = () => {
    setShowWalletDropdown(!showWalletDropdown);
  };
  const connectWallet = async (wallet) => {
    const walletInstance = await window?.cardano[wallet].enable();
    const addr = await walletInstance.getUsedAddresses();
    if (!addr.length) {
      toast.error(
        `Please make sure you have some funds available in your wallet to proceed`,
        { theme: localStorage.theme }
      );
      return;
    }
    const walletAddr = wasm.Address.from_bytes(
      Buffer.from(addr[0], "hex")
    ).to_bech32();

    if (walletInstance) {
      setConnectedWallet({
        name: wallet,
        icon: await window.cardano[wallet].icon,
        instance: walletInstance,
        address: walletAddr,
      });

      localStorage.setItem("wallet", wallet);
      setShowWalletPop(false);
    }
  };

  const disconnectWallet = () => {
    localStorage.removeItem("wallet");
    setConnectedWallet(null);
    sessionStorage.walletInfoShown = false;
  };

  useEffect(() => {
    setWallets(
      supportedWallets.map((wallet, i) => {
        if (typeof window !== undefined) {
          return (
            <div
              className="text-gray px-5 pl-2 py-2 font-bold rounded-3xl shadow-button dark:shadow-button-dark text-sm border-2 border-transparent	 hover:border-slate-100		 cursor-pointer flex items-center gap-5 w-2/3"
              onClick={() => connectWallet(wallet)}
              key={`${wallet}+${i}`}
            >
              <div className="flex items-center rounded-full p-2 shadow-button-icon dark:shadow-button-icon-dark">
                <img src={icons[wallet]} alt={wallet} className="w-6" />
              </div>
              <span className="capitalize">{walletNames[wallet]}</span>
            </div>
          );
        }
      })
    );
  }, []);

  return (
    <>
      <div className="w-full flex flex-col justify-center	">
        <ToastContainer></ToastContainer>
        <div className="m-4 mt-10">
          <div className="flex flex-col items-end">
            <div className="       border-slate-100	      rounded-lg max-w-xs flex items-end">
              {conenctedWallet ? (
                <div
                  className="text-gray1 px-5 pl-2 py-2 font-bold rounded-3xl shadow-button dark:shadow-button-dark dark:text-white text-sm hover:shadow-button-hover cursor-pointer flex items-center justify-between gap-5 relative"
                  onClick={toggleWalletDropdown}
                >
                  <div className="flex items-center rounded-full p-2 shadow-button-icon dark:shadow-button-icon-dark">
                    <img
                      src={conenctedWallet.icon}
                      alt="icon"
                      className="w-4"
                    />
                  </div>
                  <span className="">
                    {conenctedWallet.address.slice(0, 5) +
                      "..." +
                      conenctedWallet.address.slice(
                        conenctedWallet.address.length - 4,
                        conenctedWallet.address.length
                      )}
                  </span>
                  {showWalletDropdown ? (
                    <div
                      className="w-[150%] bg-primary bg-white  absolute top-[110%] shadow-2xl z-[100] rounded-md p-4 right-0 flex flex-col gap-5"
                      ref={popRef}
                    >
                      <div className="flex gap-4 border-b border-gray3 pb-4">
                        <div className="flex items-center rounded-md p-2 shadow-button-icon dark:shadow-button-icon-dark w-fit">
                          <img
                            src={conenctedWallet.icon}
                            alt="icon"
                            className="w-7"
                          />
                        </div>
                        <div>
                          <div className="capitalize">
                            {walletNames[conenctedWallet.name]}
                          </div>
                          <div>
                            {conenctedWallet.address.slice(0, 10) +
                              "..." +
                              conenctedWallet.address.slice(
                                conenctedWallet.address.length - 7,
                                conenctedWallet.address.length
                              )}
                          </div>
                        </div>
                      </div>
                      <div
                        className="border border-gray3 rounded-lg w-full px-4 py-2 flex items-center gap-4 shadow cursor-pointer hover:shadow-md"
                        onClick={disconnectWallet}
                      >
                        <IoClose className="text-2xl border rounded-full dark:text-white" />
                        <span>Disconnect</span>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="  text-gray1 px-5 pl-2 py-2 font-bold rounded-3xl  border-2 border-slate-100	 text-sm  cursor-pointer flex items-center justify-between gap-5 relative">
                  <Button icon={AiOutlinePlus} onClick={toggleWalletPop}>
                    Connect
                  </Button>
                </div>
              )}
              {showWalletPop ? (
                <div className="fixed flex items-center justify-center w-screen h-screen left-0 top-0 z-[100]">
                  <Overlay onClick={toggleWalletPop} />
                  <div className="w-[400px] bg-white dark:bg-gray z-[100] shadow-lg rounded-md px-5 py-7 relative">
                    <div className="font-bold">Connect Wallet</div>
                    <div className="flex flex-col w-full gap-4 items-center py-10">
                      {wallets}
                    </div>
                    <div
                      className="w-9 h-9 rounded-full bg-primary dark:bg-gray dark:shadow-button-dark shadow-button hover:shadow-button-hover absolute right-3 top-3 cursor-pointer flex items-center justify-center"
                      onClick={toggleWalletPop}
                    >
                      <IoClose />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className=" w-full flex justify-center ">
          <div className="w-1/3 min-w-[400px]">
            <div
              className="product-box gradient-box flex justify-between flex-col bg-white shadow rounded transition hover:shadow-lg"
              data-aos="fade-up"
            >
              <div className="product-top relative bg-white">
                <div className="flex justify-center items-center product-image relative rounded overflow-hidden m-6 mb-8">
                  <img
                    className="w-full sm:h-90 rounded object-cover"
                    src="/Metahagane Packet.png"
                    alt="title"
                  />
                </div>
                <button
                  onClick={sendAdas}
                  className="product-meta absolute left-0 right-0 m-auto bottom-24 w-36 block text-white text-center font-body font-medium rounded py-2 px-4 transition-all duration-500 bg-gradient-to-tl from-indigo-500 via-purple-500 to-indigo-500 bg-size-200 bg-pos-0 hover:bg-pos-100"
                >
                  <img
                    className="w-4 h-4 inline-block mb-1"
                    src="assets/images/bid-icon2.svg"
                    alt="title"
                  />{" "}
                  Buy Now!
                </button>
                <div className="product-content px-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center"></div>
                    <div className="flex justify-center items-center"></div>
                  </div>
                  <div className="flex ">
                    <h3 className="font-display text-xl text-blueGray-900 font-bold transition hover:text-indigo-500">
                      <a href="item-single.html">
                        Metahagane - Series One 1 x Packet
                      </a>
                    </h3>
                    <span className="">
                      <img
                        className="w-3 h-3"
                        src="assets/images/verified-icon.svg"
                        alt="title"
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div className="product-bottom bg-white flex items-center flex-wrap justify-center pt-4 px-6 pb-6">
                <div>
                  <p className="font-body text-sm text-blueGray-600">
                    Current Price
                  </p>
                </div>
                <div className="text-center">
                  <p className="flex items-center font-body font-bold text-blueGray-900 my-1">
                    <img
                      className="w-5 h-5 inline-block mr-1"
                      src="assets/images/cardano.png"
                      alt="title"
                    />{" "}
                    20 ADA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
