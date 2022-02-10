import { useState, useEffect } from 'react';

export default function useGetAllProposals(hasClaimedNFT, voteModule) {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }
    // to grab the proposals.
    voteModule
      .getAll()
      .then((proposals) => {
        setProposals(proposals);
      })
      .catch((err) => {
        console.error("failed to get proposals", err);
      });
  }, [hasClaimedNFT, voteModule]);

  return [proposals, setProposals];
}