// Coloque aqui suas actions

const submitMail = (val) => ({
  type: 'EMAIL',
  email: val,
  logged: true,
});

const currencies = (val) => ({
  type: 'CURRENCIES',
  currencies: val,
});

const expenses = (val) => ({
  type: 'EXPENSES',
  expenses: val,
});

const total = (val) => ({
  type: 'TOTAL',
  total: val,
});

export { submitMail, currencies, expenses, total };
