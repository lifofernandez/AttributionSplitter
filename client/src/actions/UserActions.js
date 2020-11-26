/* eslint-disable */
const setUserAddress = (address) => {
  return {
    type: 'SET_ADDRESS',
    payload: address
  }
}

const setIsAdmin = (hasAdminRole) => {
  return {
    type: 'IS_ADMIN',
    admin: hasAdminRole 
  }
}

const setMinterKey = (minter_key) => {
  return {
    type: 'SET_MINTER_KEY',
    payload: minter_key 
  }
}

const setBurnerKey = (burner_key) => {
  return {
    type: 'SET_BURNER_KEY',
    payload: burner_key 
  }
}

const setIsMinter = (hasMinterRole) => {
  return {
    type: 'IS_MINTER',
    minter: hasMinterRole,
  }
}

const setIsBurner = (hasBurnerRole) => {
  return {
    type: 'IS_BURNER',
    burner: hasBurnerRole,
  }
}

export {
  setUserAddress,
  setIsAdmin,
  setMinterKey,
  setBurnerKey,
  setIsMinter,
  setIsBurner,
};
