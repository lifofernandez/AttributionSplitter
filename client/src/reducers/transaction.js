const initialState = {
  sending: false,
  sent: null,
  receipt: null,
  error: null,
};

const Transaction = (state = initialState, action) => {
  switch (action.type) {
  case 'SENDING':
    return ({
      ...state,
      sending: true,
      sent: false,
    });
  case 'SENT':
    return ({
      ...state,
      sending: false,
      sent: true,
    });
  default:
    return state;
  }
};

export default Transaction;
