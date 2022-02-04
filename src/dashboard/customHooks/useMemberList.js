import { useMemo } from "react";
import { ethers } from "ethers";

export default function useMemberList(addresses, amounts) {
  // Now, we combine the memberAddresses and memberTokenAmounts into a single array
  const memberList = useMemo(() => {
    return addresses.map((address) => {
      return {
        address,
        tokenAmount: ethers.utils.formatUnits(
          // If the address isn't in memberTokenAmounts, it means they don't
          // hold any of our token.
          amounts[address] || 0,
          18,
        ),
      };
    });
  }, [addresses, amounts]);

  return memberList;
}