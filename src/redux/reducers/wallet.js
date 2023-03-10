// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
  editExpense: {},
  updatedExp: [],
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
  if (action.type === 'DELETE') {
    return ({
      ...state,
      expenses: action.expense,
    });
  }
  if (action.type === 'EDIT') {
    return ({
      ...state,
      editExpense: action.editExpense,
    });
  }
  if (action.type === 'UPDATE') {
    return ({
      ...state,
      expenses: action.expenses,
    });
  }
  return state;
}
