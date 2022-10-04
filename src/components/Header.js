import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { expenses, user } = this.props;
    console.log(expenses);
    const total = expenses.reduce((acc, curr) => {
      const { exchangeRates } = curr;
      const { ask } = exchangeRates[curr.currency];
      acc += (curr.value * ask);
      return acc;
    }, 0);

    return (
      <header className="header">
        <p data-testid="email-field">{ user.email }</p>
        <div className="header-wallet">
          <span data-testid="total-field">
            {parseFloat(total).toFixed(2)}
          </span>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ user, wallet: { expenses } }) => ({ expenses, user });

Header.propTypes = {
  user: PropTypes.shape().isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps, null)(Header);
