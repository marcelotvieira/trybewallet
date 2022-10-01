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

export { submitMail, currencies };
