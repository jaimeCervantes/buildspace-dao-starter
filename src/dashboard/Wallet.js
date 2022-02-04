import { useState } from 'react';

function Wallet( { address, connectWallet, setHasClaimedNFT, bundleDropModule }) {
  const [isClaiming, setIsClaiming] = useState(false);

  if (!address) {
    return(
      <div className="landing">
        <h1>Welcome to 🥑 Permaculture DAO</h1>
        <button
          onClick={() => connectWallet('injected')}
          className="btn-hero"
        >
          Connect your wallet
        </button>
      </div>
    );
  }

  const mintNft = () => {
    setIsClaiming(true);
    // Call bundleDropModule.claim("0", 1) to mint nft to user's wallet.
    bundleDropModule
    .claim("0", 1)
    .then(() => {
      setHasClaimedNFT(true);
      console.log(
        `🌊 Successfully Minted! Check it our on OpenSea: https://testnets.opensea.io/assets/${bundleDropModule.address.toLowerCase()}/0`
      );
    })
    .catch((err) => {
      console.error("failed to claim", err);
    })
    .finally(() => {
      setIsClaiming(false);
    });
  }

  return (
    <div className="mint-nft">
      <h1>Mint your free 🍏 Permaculture DAO Membership NFT</h1>
      <button
        disabled={isClaiming}
        onClick={() => mintNft()}
      >
        {isClaiming ? "Minting..." : "Mint your nft (FREE)"}
      </button>
    </div>
  );
}

export default Wallet;