import React from 'react';
import ExpensesLoader from '../ExpensesLoader/ExpensesLoader';
import './Expenses.css';

const Expenses = () => {
  return (
    <div className="expenses-container">
      <ExpensesLoader></ExpensesLoader>
    </div>
  );
};

export default Expenses;
