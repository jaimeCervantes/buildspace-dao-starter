import { useState, useEffect } from "react";

export default function useGetAllClaimerAddresses(hasClaimedNFT, bundleDropModule) {
  const [memberAddresses, setMemberAddresses] = useState([]);
  // This useEffect grabs all the addresses of our members holding our NFT.
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }
    
    // Just like we did in the 7-airdrop-token.js file! Grab the users who hold our NFT
    // with tokenId 0.
    bundleDropModule
      .getAllClaimerAddresses("0")
      .then((addresses) => {
        console.log("🚀 Members addresses", addresses)
        setMemberAddresses(addresses);
      })
      .catch((err) => {
        console.error("failed to get member list", err);
      });
  }, [hasClaimedNFT]);

  return [memberAddresses, setMemberAddresses];
}