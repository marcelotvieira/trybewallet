import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { submitMail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isButtonDisabled: true,

  };

  componentDidUpdate() {
    this.formValidate();
  }

  formValidate = () => {
    const { email, password, isButtonDisabled } = this.state;
    const mailReg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const minPasswordLength = 6;
    const isValid = mailReg.test(email) && password.length >= minPasswordLength;
    if (isButtonDisabled === isValid) {
      return this.setState({
        isButtonDisabled: !isValid,
      });
    }
  };

  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { email, password, isButtonDisabled } = this.state;
    const { mailDispatch, user: { logged } } = this.props;
    if (logged) return <Redirect to="/carteira" />;
    return (
      <div className="login">
        <form>
          <label htmlFor="email" aria-labelledby="email">
            Email:
            {' '}
            <input
              value={ email }
              id="email"
              name="email"
              type="email"
              data-testid="email-input"
              onChange={ this.onInputChange }
            />
          </label>

          <label htmlFor="password" aria-labelledby="password">
            Senha:
            {' '}
            <input
              value={ password }
              id="password"
              name="password"
              type="password"
              data-testid="password-input"
              onChange={ this.onInputChange }
            />
          </label>

          <button
            type="button"
            disabled={ isButtonDisabled }
            onClick={ () => { mailDispatch(email); } }
          >
            Entrar
          </button>

        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = (dispatch) => ({
  mailDispatch: (val) => dispatch(submitMail(val)),
});

Login.propTypes = {
  mailDispatch: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
    logged: PropTypes.bool,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
