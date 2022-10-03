// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

export default function currencies(state = INITIAL_STATE, action) {
  if (action.type === 'CURRENCIES') {
    return ({
      ...state,
      currencies: action.currencies,
    });
  }
  if (action.type === 'EXPENSES') {
    return ({
      ...state,
      expenses: [...state.expenses, action.expenses],
    });
  }
  if (action.type === 'TOTAL') {
    return ({
      ...state,
      total: state.total + action.total,
    });
  }
  return state;
}
