import { useEffect } from "react";

export default function useSigner(sdk, provider) {
  // The signer is required to sign transactions on the blockchain.
  // Without it we can only read data, not write.
  const signer = provider ? provider.getSigner() : undefined;

  useEffect(() => {
    // enables us to interact with our deployed contract!
    sdk.setProviderOrSigner(signer);
  }, [signer, sdk]);
}