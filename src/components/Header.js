import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { user } = this.props;
    return (
      <header>
        <p data-testid="email-field">{ user.email }</p>
        <span data-testid="total-field">0</span>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    logged: PropTypes.bool,
  }).isRequired,
};

export default connect(mapStateToProps, null)(Header);
