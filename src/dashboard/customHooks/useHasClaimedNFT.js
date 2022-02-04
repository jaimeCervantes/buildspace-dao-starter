import { useState, useEffect } from 'react';

function useHasClaimedNFT(address, bundleDropModule) {
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  useEffect(() => {
    if (!address) {
      return;
    }

    bundleDropModule
      .balanceOf(address, "0")
      .then((balance) => {
        // If balance is greater than 0, they have our NFT!
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("🌟 this user has a membership NFT!")
        } else {
          setHasClaimedNFT(false);
          console.log("😭 this user doesn't have a membership NFT.")
        }
      })
      .catch((error) => {
        setHasClaimedNFT(false);
        console.error("failed to nft balance", error);
      });

  }, [address, bundleDropModule]);

  return [hasClaimedNFT, setHasClaimedNFT];
}

export default useHasClaimedNFT;