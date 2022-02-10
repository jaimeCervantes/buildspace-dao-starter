export default function ProposalsForm({ proposals, isVoting, hasVoted, onSubmit }) {
  return (
    <div>
      <h2>Active Proposals</h2>
      <form
        onSubmit={
          async (e) => await onSubmit(e)
        }
      >
        {proposals.map((proposal, index) => (
          <div key={proposal.proposalId} className="card">
            <h5>{proposal.description}</h5>
            <div>
              {proposal.votes.map((vote) => (
                <div key={vote.type}>
                  <input
                    type="radio"
                    id={proposal.proposalId + "-" + vote.type}
                    name={proposal.proposalId}
                    value={vote.type}
                    //default the "abstain" vote to checked
                    defaultChecked={vote.type === 2}
                  />
                  <label htmlFor={proposal.proposalId + "-" + vote.type}>
                    {vote.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button disabled={isVoting || hasVoted} type="submit">
          {isVoting
            ? "Voting..."
            : hasVoted
              ? "You Already Voted"
              : "Submit Votes"}
        </button>
        <small>
          This will trigger multiple transactions that you will need to
          sign.
        </small>
      </form>
    </div>
  );
}
