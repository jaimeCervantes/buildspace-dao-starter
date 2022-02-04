import { useState, useEffect } from 'react';

export default function useGetAllProposals(hasClaimedNFT, voteModule) {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }
    // A simple call to voteModule.getAll() to grab the proposals.
    voteModule
      .getAll()
      .then((proposals) => {
        // Set state!
        setProposals(proposals);
        console.log("🌈 Proposals:", proposals)
      })
      .catch((err) => {
        console.error("failed to get proposals", err);
      });
  }, [hasClaimedNFT]);

  return [proposals, setProposals];
}