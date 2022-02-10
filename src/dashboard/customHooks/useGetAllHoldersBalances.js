import { useState, useEffect } from 'react';

export default function useGetAllHoldersBalances(hasClaimedNFT, tokenModule) {
  const [memberTokenAmounts, setMemberTokenAmounts] = useState({});
  // This useEffect grabs the # of token each member holds.
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    tokenModule
      .getAllHolderBalances()
      .then((amounts) => {
        console.log("👜 Amounts", amounts)
        setMemberTokenAmounts(amounts);
      })
      .catch((err) => {
        console.error("failed to get token amounts", err);
      });
  }, [hasClaimedNFT, tokenModule]);

  return [memberTokenAmounts, setMemberTokenAmounts];
}