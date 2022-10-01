import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { currencies } from '../redux/actions';

class WalletForm extends Component {
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

  render() {
    const { currencies: currData } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value" aria-labelledby="value">
            Valor:
            <input
              type="number"
              id="value"
              name="value"
              data-testid="value-input"
            />
          </label>

          <label htmlFor="description" aria-labelledby="description">
            Descrição:
            <input
              type="text"
              id="description"
              name="description"
              data-testid="description-input"
            />
          </label>

          <label htmlFor="currency" aria-labelledby="currency">
            Moeda:
            <select
              data-testid="currency-input"
              id="currency"
              name="currency"
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

          <label htmlFor="payment-method" id="payment-method">
            Método de pagamento:
            <select
              data-testid="method-input"
            >
              <option value="Dinheiro" key="Dinheiro">Dinheiro</option>
              <option value="Crédito" key="Crédito">Cartão de crédito</option>
              <option value="Débito" key="Débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag" aria-labelledby="tag">
            Categoria:
            <select
              data-testid="tag-input"
            >
              <option value="Alimentação" key="Alimentação">Alimentação</option>
              <option value="Lazer" key="Lazer">Lazer</option>
              <option value="Trabalho" key="Trabalho">Trabalho</option>
              <option value="Transporte" key="Transporte">Transporte</option>
              <option value="Saúde" key="Saúde">Saúde</option>

            </select>
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet: { currencies: currList } }) => ({
  currencies: currList,
});

const mapDispatchToProps = (dispatch) => ({
  currenciesDispatch: (val) => dispatch(currencies(val)),
});

WalletForm.propTypes = {
  currenciesDispatch: propTypes.func.isRequired,
  currencies: propTypes.arrayOf(propTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
