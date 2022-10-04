import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExp, editExp } from '../redux/actions';

class Table extends Component {
  handleDelete = ({ target: { id } }) => {
    const { expenses, deleteDispatch } = this.props;
    const newExpenses = expenses.filter((item) => item.id !== Number(id));
    console.log('DELETAAAAANDO');
    deleteDispatch(newExpenses);
  };

  handleEdit = ({ target: { id } }) => {
    const { expenses, editDispatch } = this.props;
    const currExpense = expenses.find((exp) => exp.id === Number(id));
    editDispatch(currExpense);
  };

  render() {
    const { expenses } = this.props;
    const buttomKeysCuot = 50;

    const tableItems = expenses.map((element) => {
      const {
        value,
        description,
        method,
        currency,
        tag,
        id,
        exchangeRates,
      } = element;

      const currAsk = exchangeRates[currency].ask;
      const convertedValue = currAsk * value;

      return (
        <tr key={ id }>
          <td className="sm-font">{ description }</td>
          <td className="sm-font">{ tag }</td>
          <td className="sm-font">{ method }</td>
          <td>{ parseFloat(Number(value)).toFixed(2) }</td>
          <td className="sm-font">{ exchangeRates[currency].name }</td>
          <td>{ parseFloat(Number(currAsk)).toFixed(2) }</td>
          <td>{ parseFloat(Number(convertedValue)).toFixed(2) }</td>
          <td>Real</td>
          <td>
            <button
              data-testid="edit-btn"
              key={ id + buttomKeysCuot }
              id={ id }
              type="button"
              onClick={ this.handleEdit }
            >
              Editar

            </button>
            <button
              data-testid="delete-btn"
              key={ id }
              id={ id }
              type="button"
              onClick={ this.handleDelete }
            >
              Excluir

            </button>
          </td>
        </tr>
      );
    });

    return (
      <table className="table">
        <thead>
          <tr key="1">
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>{ tableItems }</tbody>
      </table>

    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteDispatch: (val) => dispatch(deleteExp(val)),
  editDispatch: (val) => dispatch(editExp(val)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  deleteDispatch: PropTypes.func.isRequired,
  editDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
