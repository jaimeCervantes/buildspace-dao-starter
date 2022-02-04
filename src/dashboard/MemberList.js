export default function MemberList({ members }) {

  return (
    <div>
      <h2>Member List</h2>
      <table className="card">
        <thead>
          <tr>
            <th>Address</th>
            <th>Token Amount</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => {
            return (
              <tr key={member.address}>
                <td className="word-break">{member.address}</td>
                <td>{member.tokenAmount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}