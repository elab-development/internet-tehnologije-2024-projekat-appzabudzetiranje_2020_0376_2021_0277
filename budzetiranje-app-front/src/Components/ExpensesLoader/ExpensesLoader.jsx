import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DollarSign, User, List, Loader2 } from 'lucide-react';

// --- CONFIGURATION ---
const API_BASE_URL = 'http://127.0.0.1:8000/api';
// Assuming you have an endpoint that returns all expenses with their attached users
const EXPENSES_WITH_USERS_API_URL = `${API_BASE_URL}/expenses?include=users`;
// NOTE: You might need to adjust your Laravel controller to automatically load the 'users' relationship.
// In your Laravel controller, use: Expense::with('users')->get();
// ---------------------

const ExpensesLoader = () => {
  // Tailwind CSS CDN Injection (kept as is) ---
  useEffect(() => {
    // Check if the Tailwind script is already loaded to avoid duplicates
    if (!document.querySelector('script[src*="tailwindcss"]')) {
      const script = document.createElement('script');
      script.src = 'https://cdn.tailwindcss.com';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(EXPENSES_WITH_USERS_API_URL);
        setExpenses(response.data);
      } catch (err) {
        console.error('Error fetching expenses:', err);
        setError(
          'Failed to load expense data. Check API endpoint and CORS settings.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="w-6 h-6 animate-spin text-indigo-500 mr-2" />
        Loading expenses...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 p-4 border border-red-300 rounded">
        {error}
      </div>
    );
  }

  if (expenses.length === 0) {
    return <div className="text-gray-500 p-4">No expenses found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3 flex items-center">
        <DollarSign className="w-6 h-6 text-green-500 mr-2" />
        Expense Debt Summary
      </h2>

      <div className="space-y-8">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="p-5 border border-gray-200 rounded-xl bg-gray-50 hover:shadow-md transition duration-200"
          >
            {/* Expense Header */}
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-indigo-600 flex items-center">
                <List className="w-5 h-5 mr-2" />
                {expense.description || `Expense #${expense.id}`}
              </h3>
              <span className="text-2xl font-bold text-gray-900">
                {parseFloat(expense.amount_payed).toFixed(2)}rsd
              </span>
            </div>

            {/* Debtors List */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-600">
                Users who are part of this split:
              </p>

              {/* NOTE: The users collection comes from your Eloquent 'users' relationship */}
              {expense.users && expense.users.length > 0 ? (
                expense.users.map((user) => (
                  <div
                    key={user.id}
                    className="flex justify-between items-center p-3 rounded-lg bg-white shadow-sm"
                  >
                    <span className="font-medium text-gray-800 flex items-center">
                      <User className="w-4 h-4 mr-2 text-blue-500" />
                      {user.name}
                    </span>

                    {/* Accessing the custom pivot data: user.pivot.amount_owed */}
                    <span className="text-lg font-bold">
                      Owes:{' '}
                      <span className="text-red-500">
                        {parseFloat(user.pivot.amount_owed).toFixed(2)}rsd
                      </span>
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No users associated with this expense.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpensesLoader;
