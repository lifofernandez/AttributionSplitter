import React from 'react';
import { useSelector } from 'react-redux';

function NavBar({
  contractAddress,
}) {
  const {
    address,
    admin,
    minter,
    burner,
  } = useSelector((state) => state.UserReducer);
  return (
    <nav>
      <ul>
        <li>
          Hola!&nbsp;
          { address }
        </li>
        {admin && (
          <li>
            Sos admin!
          </li>
        )}
        {minter && (
          <li>
            Sos minter!
          </li>
        )}
        {burner && (
          <li>
            Sos burner!
          </li>
        )}
        <li>
          Contrato&nbsp;
          { contractAddress }
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
