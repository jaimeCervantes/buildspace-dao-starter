import { useState } from 'react';
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from '@3rdweb/sdk';
import { UnsupportedChainIdError } from "@web3-react/core";
import Wallet from './dashboard/Wallet.js';
import useGetAllClaimerAddresses from './dashboard/customHooks/useGetAllClaimerAddresses.js';
import useGetAllHoldersBalances from './dashboard/customHooks/useGetAllHoldersBalances.js';
import useMemberList from './dashboard/customHooks/useMemberList';
import useHasClaimedNFT from './dashboard/customHooks/useHasClaimedNFT.js';
import useSigner from './dashboard/customHooks/useSigner.js';
import useGetAllProposals from './dashboard/customHooks/useGetAllProposals.js';
import useHasVoted from './dashboard/customHooks/useHasVoted.js';
import MemberList from './dashboard/MemberList.js';
import ProposalsForm from './dashboard/ProposalsForm.js';
import submitVotes from './dashboard/submitVotes.js';

const sdk = new ThirdwebSDK('rinkeby');
const bundleDropModule = sdk.getBundleDropModule('0x989BAd4F17E96d38a1B073CcE2461f9722f2282c');
const tokenModule = sdk.getTokenModule('0x22308c5a6B8C32ccf865574Fcb0546c6924F7241');
const voteModule = sdk.getVoteModule('0x1D845D7CA43E640E9c7bA6555aD4A889BA7DFC44');

function App() {
  const { connectWallet, address, error, provider } = useWeb3();
  useSigner(sdk, provider);
  const [hasClaimedNFT, setHasClaimedNFT] = useHasClaimedNFT(address, bundleDropModule);
  const [memberAddresses] = useGetAllClaimerAddresses(hasClaimedNFT, bundleDropModule);
  const [memberTokenAmounts] = useGetAllHoldersBalances(hasClaimedNFT, tokenModule);
  const memberList = useMemberList(memberAddresses, memberTokenAmounts);
  const [proposals] = useGetAllProposals(hasClaimedNFT, voteModule);
  const [hasVoted, setHasVoted] = useHasVoted(hasClaimedNFT, address, proposals[0], voteModule);
  const [isVoting, setIsVoting] = useState(false);

  if (error instanceof UnsupportedChainIdError ) {
    return (
      <div className="unsupported-network">
        <h2>Please connect to Rinkeby</h2>
        <p>
          This dapp only works on the Rinkeby network, please switch networks
          in your connected wallet.
        </p>
      </div>
    );
  }

  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>🥝 Permaculture DAO</h1>
        <p>Congratulations on being a member</p>
        <div>
            <MemberList members={memberList}></MemberList>
            <ProposalsForm
              proposals={proposals}
              isVoting={isVoting}
              hasVoted={hasVoted}
              onSubmit={
                (e) => submitVotes({
                  proposals,
                  address,
                  setIsVoting,
                  setHasVoted,
                  tokenModule,
                  voteModule
                }, e)
              }
            >
            </ProposalsForm>
        </div>
      </div>
    );
  };

  return (
    <Wallet
      setHasClaimedNFT={setHasClaimedNFT}
      bundleDropModule={bundleDropModule}
      connectWallet={connectWallet}
      address={address}
    ></Wallet>
  );

}

export default App;