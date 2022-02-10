import { useMemo } from "react";
import { ethers } from "ethers";

export default function useMemberList(addresses, amounts) {
  // Now, we combine the memberAddresses and memberTokenAmounts into a single array
  const memberList = useMemo(() => {
    return addresses.map((address) => {
      return {
        address,
        // If the address isn't in memberTokenAmounts, it means they don't
        // hold any of our token.
        tokenAmount: ethers.utils.formatUnits(amounts[address] || 0,18,),
      };
    });
  }, [addresses, amounts]);

  return memberList;
}