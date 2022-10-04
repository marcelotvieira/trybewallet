import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { currencies, expenses, total, updateExp, editExp } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: '',
    tag: '',
    id: 0,
    exchangeRates: {},
  };

  componentDidMount() {
    this.fetchCurrencies();
  }

  setCurrencies = async (curr) => {
    const { currenciesDispatch } = this.props;
    const currenciesList = Object.keys(await curr);
    currenciesDispatch(currenciesList);
  };

  fetchCurrencies = async () => {
    const URL = 'https://economia.awesomeapi.com.br/json/all';
    const currenciesData = (await (await fetch(URL)).json());
    delete currenciesData.USDT;
    this.setCurrencies(await currenciesData);
  };

  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  setExpense = async () => {
    const exchangesURL = 'https://economia.awesomeapi.com.br/json/all';
    const { expensesDispatch, expenses: expData } = this.props;
    const exchangeRates = (await (await fetch(exchangesURL)).json());

    this.setState({ id: expData.length, exchangeRates }, () => {
      const { state } = this;
      expensesDispatch(state);
      this.clearForm();
    });
  };

  editExp = () => {
    const { updatedExp, expenses: currExpenses } = this.props;
    const { value, description, currency, tag, method, id } = this.state;
    const newExpenses = currExpenses.map((exp) => {
      if (exp.id === Number(id)) {
        exp.value = value;
        exp.description = description;
        exp.currency = currency;
        exp.tag = tag;
        exp.method = method;
      }
      return exp;
    });
    updatedExp(newExpenses);
  };

  clearForm = () => {
    this.setState({
      value: '',
      description: '',
      method: '',
      tag: '',
      exchangeRates: {},
      currency: 'USD',
      id: '',
    });
  };

  render() {
    const { currencies: currData, editExpense, editExp: edit } = this.props;
    const { value, description, currency, method, tag, id, exchangeRates } = this.state;
    console.log(id, exchangeRates);
    if (editExpense.value) {
      this.setState({ ...editExpense }, () => {
        edit('editing');
      });
    }
    return (
      <div className="wallet-form-contianer">
        <h2>Adicionar nova despesa:</h2>
        <form className="wallet-form">
          <label htmlFor="value" aria-labelledby="value">
            Valor:
            <input
              value={ value }
              type="number"
              id="value"
              name="value"
              data-testid="value-input"
              onChange={ this.onInputChange }
            />
          </label>

          <label htmlFor="description" aria-labelledby="description">
            Descrição:
            <input
              value={ description }
              type="text"
              id="description"
              name="description"
              data-testid="description-input"
              onChange={ this.onInputChange }
            />
          </label>

          <label htmlFor="currency" aria-labelledby="currency">
            Moeda:
            <select
              value={ currency }
              data-testid="currency-input"
              id="currency"
              name="currency"
              onChange={ this.onInputChange }
            >
              { currData.map((curr) => (
                <option
                  value={ curr }
                  key={ curr }
                >
                  {curr}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="payment" id="payment">
            Método de pagamento:
            <select
              value={ method }
              data-testid="method-input"
              name="method"
              id="method"
              onChange={ this.onInputChange }
            >
              <option value="Dinheiro" key="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito" key="Crédito">Cartão de crédito</option>
              <option value="Cartão de débito" key="Débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag" aria-labelledby="tag">
            Categoria:
            <select
              value={ tag }
              name="tag"
              id="tag"
              data-testid="tag-input"
              onChange={ this.onInputChange }
            >
              <option value="Alimentação" key="Alimentação">Alimentação</option>
              <option value="Lazer" key="Lazer">Lazer</option>
              <option value="Trabalho" key="Trabalho">Trabalho</option>
              <option value="Transporte" key="Transporte">Transporte</option>
              <option value="Saúde" key="Saúde">Saúde</option>

            </select>
          </label>

          <button
            type="button"
            onClick={ editExpense === 'editing' ? this.editExp : this.setExpense }
          >
            { editExpense === 'editing' ? 'Editar despesa' : 'Adicionar despesa'}
          </button>

        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet: {
  currencies: currList, expenses: exp, editExpense } }) => ({
  currencies: currList,
  expenses: exp,
  editExpense,

});

const mapDispatchToProps = (dispatch) => ({
  currenciesDispatch: (val) => dispatch(currencies(val)),
  expensesDispatch: (val) => dispatch(expenses(val)),
  totalDispatch: (val) => dispatch(total(val)),
  updatedExp: (val) => dispatch(updateExp(val)),
  editExp: (val) => dispatch(editExp(val)),
});

WalletForm.propTypes = {
  currenciesDispatch: propTypes.func.isRequired,
  currencies: propTypes.arrayOf(propTypes.string).isRequired,
  expenses: propTypes.arrayOf(propTypes.shape()).isRequired,
  expensesDispatch: propTypes.func.isRequired,
  editExp: propTypes.func.isRequired,
  editExpense: propTypes.shape().isRequired,
  updatedExp: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
