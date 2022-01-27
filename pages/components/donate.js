import { useState } from "react";
import { ethers } from "ethers";

const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
  }
};

 function Donate() {

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData(e.target);

    await startPayment({
      ether: data.get("ether"),
      addr: "0x6032DEd1D330d0672253BDfC9a56C971DeE0683F"
    });
  };

  return (
    <div className="pt-20 ">    
    <form className="m-4" onSubmit={handleSubmit}>
      <div className=" w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-slate-100">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Donate ETH to the Force
          </h1>
          <div className="">
            <div className="my-3">
              <input
                name="ether"
                type="text"
                className="input input-bordered block w-full focus:ring bg-slate-200 p-3 rounded-full focus:outline-none"
                placeholder="Amount in ETH"
              />
            </div>
          </div>
        </main>
        <footer className="p-4">
          <div className="bg-gray-200 duration-500 hover:bg-yellow-400 rounded-full p-2">
          <button
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
          >
            Donate
          </button>
          </div>
        </footer>
      </div>
    </form>
    </div>
  );
}

export default Donate;