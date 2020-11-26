import React, {
  useState,
} from 'react';

function AdminRoleForm({
  tutorialToken,
  minterRoleKey,
  burnerRoleKey,
  adminAddress,
}) {
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('minter');
  const [roleGranted, setRoleGranted] = useState(null);
  const [roleGrantedSuccess, setRoleGrantedSuccess] = useState(null);
  const [roleRevoked, setRoleRevoked] = useState(null);
  const [roleRevokedSuccess, setRoleRevokedSuccess] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [sending, setSending] = useState(null);
  const [sent, setSent] = useState(null);
  const [hashSent, setHashSent] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [confirmed, setConfirmed] = useState(null);
  const [confNumber, setConfNumber] = useState(null);
  const [latestBlock, setLatestBlock] = useState(null);
  const [txError, setTxError] = useState(null);

  async function grantRoleHandle(e) {
    e.preventDefault();
    const { web3 } = window;
    if (!web3.utils.isAddress(address)) {
      setAddressError('Invalid address');
      return;
    }
    setSending(false);
    setSent(false);
    setHashSent(false);
    setReceipt(false);
    setConfirmed(false);
    setConfNumber(false);
    setLatestBlock(false);
    setConfirmed(false);
    if (role === 'minter') {
      tutorialToken.methods.grantRole(minterRoleKey, address).send({ from: adminAddress })
        .once('sending', (payload) => {
          console.log(payload);
          setSending(true);
        })
        .once('sent', (payload) => {
          console.log(payload);
          setSending(false);
          setSent(true);
        })
        .once('transactionHash', (hash) => {
          setHashSent(hash);
        })
        .once('receipt', (rec) => {
          setSent(false);
          const { blockHash } = rec;
          setReceipt(blockHash);
        })
        .on('confirmation', (confNum, rec, latestBlockHash) => {
          setConfirmed(true);
          setConfNumber(confNum);
          const { blockHash } = rec;
          setReceipt(blockHash);
          setLatestBlock(latestBlockHash);
        })
        .on('error', (error) => {
          setTxError(error);
        })
        .then((rec) => {
          const { blockHash } = rec;
          setReceipt(blockHash);
          setRoleGrantedSuccess(true);
          setRoleGranted(role);
        });
    } else if (role === 'burner') {
      await tutorialToken.methods.grantRole(burnerRoleKey, address).send({ from: adminAddress })
        .once('sending', (payload) => {
          console.log(payload);
          setSending(true);
        })
        .once('sent', (payload) => {
          console.log(payload);
          setSending(false);
          setSent(true);
        })
        .once('transactionHash', (hash) => {
          setHashSent(hash);
        })
        .once('receipt', (rec) => {
          setSent(false);
          const { blockHash } = rec;
          setReceipt(blockHash);
        })
        .on('confirmation', (confNum, rec, latestBlockHash) => {
          setConfirmed(true);
          setConfNumber(confNum);
          const { blockHash } = rec;
          setReceipt(blockHash);
          setLatestBlock(latestBlockHash);
        })
        .on('error', (error) => {
          setTxError(error);
        })
        .then((rec) => {
          const { blockHash } = rec;
          setReceipt(blockHash);
          setRoleGrantedSuccess(true);
          setRoleGranted(role);
        });
    }
  }

  async function revokeRoleHandle(e) {
    e.preventDefault();
    const { web3 } = window;
    if (!web3.utils.isAddress(address)) {
      setAddressError('Invalid address');
      return;
    }
    if (role === 'minter') {
      const result = await tutorialToken.methods.revokeRole(minterRoleKey, address).send();
      setRoleRevokedSuccess(result);
      if (result) {
        setRoleRevoked(role);
      }
    } else if (role === 'burner') {
      const result = await tutorialToken.methods.revokeRole(burnerRoleKey, address);
      setRoleRevokedSuccess(result);
      if (result) {
        setRoleRevoked(role);
      }
    }
  }

  return (
    <>
      <form>
        <input type="text" name="submitAddres" onChange={(e) => setAddress(e.target.value)} />
        <select name="roles" id="roles" onChange={(e) => setRole(e.target.value)}>
          <option value="minter">Minter</option>
          <option value="burner">Burner</option>
        </select>
        <button onClick={grantRoleHandle} type="submit">Grant Role</button>
        <button onClick={revokeRoleHandle} type="submit">Revoke Role</button>
      </form>
      {addressError && (
        <p> Invalid address </p>
      )}
      {sending && (
        <p>Sending ... </p>
      )}
      {sent && (
        <p>Sent!... </p>
      )}
      {hashSent && (
        <p>
          hash&nbsp;
          {hashSent}
        </p>
      )}
      {receipt && (
        <p>
          receipt&nbsp;
          {receipt}
        </p>
      )}
      {confirmed && (
        <p>
          Confirmation Number:&nbsp;
          {confNumber}
          <br />
          Receipt&nbsp;
          {receipt}
          <br />
          Latest block hash:&nbsp;
          {latestBlock}
        </p>
      )}
      {txError && (
        <p>
          {txError}
        </p>
      )}
      {roleGrantedSuccess && (
        <p>
          {roleGranted}
          &nbsp;granted to&nbsp;
          {address}
        </p>
      )}
      {roleRevokedSuccess && (
        <p>
          {roleRevoked}
          &nbsp;revoked from&nbsp;
          {address}
        </p>
      )}
    </>
  );
}

export default AdminRoleForm;
