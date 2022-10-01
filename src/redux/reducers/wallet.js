// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
};

export default function currencies(state = INITIAL_STATE, action) {
  console.log(action);
  if (action.type === 'CURRENCIES') {
    return ({
      ...state,
      currencies: action.currencies,
    });
  }
  return state;
}
