// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  email: '',
  logged: false,
};

export default function user(state = INITIAL_STATE, action) {
  if (action.type === 'EMAIL') {
    return ({
      ...state,
      email: action.email,
      logged: action.email !== '',
    });
  }
  return state;
}
