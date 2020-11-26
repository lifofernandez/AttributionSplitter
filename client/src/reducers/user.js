const initialState = {
  address: null,
  admin: null,
  minter_key: null,
  minter: null,
  burner_key: null,
  burner: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_ADDRESS':
    return ({
      ...state,
      address: action.payload,
    });
  case 'IS_ADMIN':
    return ({
      ...state,
      admin: action.admin,
    });
  case 'SET_MINTER_KEY':
    return ({
      ...state,
      minter_key: action.payload,
    });
  case 'SET_BURNER_KEY':
    return ({
      ...state,
      burner_key: action.payload,
    });
  case 'IS_MINTER':
    return ({
      ...state,
      minter: action.minter,
    });
  case 'IS_BURNER':
    return ({
      ...state,
      burner: action.burner,
    });
  default:
    return state;
  }
};

export default UserReducer;
