import { useState, useEffect } from "react";

export default function useHasVoted(hasClaimedNFT, address, firstProposal, voteModule) {
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    if (!firstProposal) {
      return;
    }

    voteModule
      .hasVoted(firstProposal.proposalId, address)
      .then((hasVoted) => {
        setHasVoted(hasVoted);
      })
      .catch((err) => {
        console.error("failed to check if wallet has voted", err);
      });
  }, [hasClaimedNFT, firstProposal, address, voteModule]);

  return [hasVoted, setHasVoted];
}