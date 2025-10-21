import React, { useState, useMemo, useEffect } from 'react';
import axios from '../../axios';
import {
  User,
  DollarSign,
  List,
  Calculator,
  Trash2,
  Loader2,
  RefreshCw,
} from 'lucide-react';
// Assuming you would use a library like Axios or the built-in fetch API in a real app.

// --- CONFIGURATION CONSTANTS ---
// In a real app, these would likely be environment variables
const MOCK_TOKEN = sessionStorage.getItem('auth_token'); // Placeholder: Replace with actual token from Auth state
const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Base path for Laravel API endpoints
const EXPENSES_API_URL = `${API_BASE_URL}/expenses`;
const USERS_API_URL = `${API_BASE_URL}/users`;
const CATEGORIES_API_URL = `${API_BASE_URL}/categories`;
// -------------------------------

/**
 * Custom component for a clean input field.
 */
const FormInput = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  icon: Icon,
  step = 'any',
}) => (
  <div className="flex flex-col space-y-1">
    <label htmlFor={id} className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="relative rounded-md shadow-sm">
      {Icon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      )}
      <input
        type={type}
        id={id}
        step={step}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`block w-full rounded-md border-gray-300 py-2 pr-4 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition duration-150 ${
          Icon ? 'pl-10' : 'pl-3'
        }`}
      />
    </div>
  </div>
);

/**
 * Main component for creating and splitting an expense.
 */
const ExpenseSplitterForm = () => {
  // --- STATE FOR FORM DATA ---
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [debtors, setDebtors] = useState([]); // Array of { user_id: number, amount_owed: string }
  const [submissionMessage, setSubmissionMessage] = useState(null);

  // --- STATE FOR LIVE DATA ---
  const [users, setUsers] = useState([]); // This will hold all users/friends
  const [categories, setCategories] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // Will store { id: 1, name: "Alice" }
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
  // ------------------------------------------

  // --- CONSOLIDATED DATA FETCHING ---
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // 1. Fetch Users
        const usersResponse = await axios.get(USERS_API_URL);
        const fetchedUsers = usersResponse.data;

        // 2. Fetch Categories (using the original fetch for demonstration consistency)
        const categoriesResponse = await fetch(CATEGORIES_API_URL, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${MOCK_TOKEN}`,
          },
        });
        const fetchedCategories = await categoriesResponse.json();

        // 3. Update States
        setUsers(fetchedUsers);
        setCategories(fetchedCategories);

        // Assuming user ID 1 is the currently authenticated user
        // NOTE: In a real app, the current user ID should come from your Auth context/state.
        setCurrentUser(fetchedUsers.find((u) => u.id === 1));

        if (fetchedCategories.length > 0) {
          setCategoryId(fetchedCategories[0].id);
        }
      } catch (err) {
        setError(
          'Failed to load initial data. Check network connection or API setup.'
        );
        console.error('Fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    // Removed friends from dependency array as it was causing issues and is no longer needed.
  }, []);

  // Initialize debtors with the current user when data loads or amount changes
  useEffect(() => {
    if (currentUser && debtors.length === 0 && amount !== '') {
      setDebtors([
        {
          user_id: currentUser.id,
          amount_owed: (parseFloat(amount) || 0).toFixed(2),
        },
      ]);
    }
  }, [amount, currentUser]);

  // Memoized map for quick user lookup
  const userMap = useMemo(() => {
    return users.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {});
  }, [users]);

  // --- Debtor Management Functions (Rest of the component remains the same) ---

  const handleToggleDebtor = (userId) => {
    if (!currentUser) return;

    setDebtors((prevDebtors) => {
      const isSelected = prevDebtors.some((d) => d.user_id === userId);

      if (userId === currentUser.id) {
        // Payer must always be in the list
        return prevDebtors;
      }

      if (isSelected) {
        // Remove debtor
        return prevDebtors.filter((d) => d.user_id !== userId);
      } else {
        // Add debtor. Recalculate split based on new count.
        const newCount = prevDebtors.length + 1;
        const initialOwed = (parseFloat(amount || 0) / newCount).toFixed(2);

        // Simple initial split logic: redistribute equally among all current debtors
        const updatedDebtors = prevDebtors.map((d) => ({
          ...d,
          amount_owed: initialOwed.toString(),
        }));

        return [
          ...updatedDebtors,
          { user_id: userId, amount_owed: initialOwed.toString() },
        ];
      }
    });
  };

  const handleOwedAmountChange = (userId, newAmount) => {
    setDebtors((prevDebtors) =>
      prevDebtors.map((debtor) =>
        debtor.user_id === userId
          ? { ...debtor, amount_owed: newAmount }
          : debtor
      )
    );
  };

  // --- Submission Logic (Not changed) ---

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionMessage(null);

    if (!currentUser) {
      setSubmissionMessage({
        type: 'error',
        text: 'Payer information is missing.',
      });
      return;
    }

    const totalAmount = parseFloat(amount);
    const totalOwed = debtors.reduce(
      (sum, debtor) => sum + parseFloat(debtor.amount_owed || 0),
      0
    );

    // Simple validation check
    if (Math.abs(totalOwed - totalAmount) > 0.01) {
      setSubmissionMessage({
        type: 'error',
        text: `Error: Total owed amount ($${totalOwed.toFixed(
          2
        )}) must equal the total expense amount ($${totalAmount.toFixed(2)}).`,
      });
      return;
    }

    const payload = {
      amount: totalAmount.toFixed(2),
      description: description,
      user_id: currentUser.id, // Use the dynamically loaded current user ID
      category_id: categoryId,
      debtors: debtors.map((d) => ({
        user_id: d.user_id,
        amount_owed: parseFloat(d.amount_owed || 0).toFixed(2),
      })),
    };

    console.log('--- Sending Payload to API ---');
    console.log(JSON.stringify(payload, null, 2));

    // START REAL API CALL HERE
    // START REAL API CALL HERE
    try {
      setSubmissionMessage({ type: 'info', text: 'Submitting expense...' });

      // 1. CONVERT TO AXIOS.POST FOR RELIABILITY
      const response = await axios.post(EXPENSES_API_URL, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${MOCK_TOKEN}`,
        },
      });

      // Axios automatically checks for successful status codes (2xx)
      const result = response.data; // Axios returns the JSON body in .data

      // Remove the old fetch error handling block below since axios handles this.

      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

      setSubmissionMessage({
        type: 'success',
        text: 'Expense submitted successfully! (Payload logged to console)',
        data: result, // Use result (which is response.data)
      });

      // Clear the form after successful submission
      setAmount('');
      setDescription('');
      setDebtors([]);
    } catch (error) {
      // Axios errors often have a .response property
      const status = error.response?.status || 'Unknown';
      let message = `Failed to create expense. Status: ${status}.`;

      if (error.response?.data?.message) {
        // Use Laravel's error message if available
        message = error.response.data.message;
      } else if (status === 419) {
        message =
          "Request failed due to missing CSRF token. Please run 'php artisan route:clear' and try again.";
      }

      setSubmissionMessage({
        type: 'error',
        text: `API Error: ${message}`,
      });
    }
  };

  // Helper function for quick splitting
  const handleQuickSplit = () => {
    const total = parseFloat(amount) || 0;
    const count = debtors.length;

    if (count > 0 && total > 0) {
      const splitAmount = (total / count).toFixed(2);
      setDebtors((prevDebtors) =>
        prevDebtors.map((d) => ({ ...d, amount_owed: splitAmount }))
      );
    }
  };

  const totalOwedDisplay = debtors.reduce(
    (sum, debtor) => sum + parseFloat(debtor.amount_owed || 0),
    0
  );
  const isSplitEqual =
    Math.abs(totalOwedDisplay - (parseFloat(amount) || 0)) < 0.01;
  const isFormValid =
    description && amount && isSplitEqual && currentUser && debtors.length > 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mr-2" />
        <p className="text-lg text-gray-600">
          Loading user and category data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 p-8 flex items-center justify-center">
        <p className="text-lg text-red-700 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white p-6 sm:p-8 rounded-2xl shadow-2xl">
        <h2 className="flex items-center text-3xl font-bold text-gray-900 mb-6 border-b pb-3">
          <DollarSign className="w-7 h-7 text-indigo-500 mr-2" />
          Create New Expense (Payer: {currentUser?.name || 'Unknown'})
        </h2>

        {submissionMessage && (
          <div
            className={`p-4 mb-4 rounded-lg ${
              submissionMessage.type === 'success'
                ? 'bg-green-100 text-green-700'
                : submissionMessage.type === 'info'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            <p className="font-medium">{submissionMessage.text}</p>
            {submissionMessage.data && (
              <pre className="mt-2 text-xs bg-green-50 p-2 rounded overflow-auto">
                {JSON.stringify(submissionMessage.data, null, 2)}
              </pre>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Core Expense Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Total Amount"
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g., 45.50"
              icon={DollarSign}
            />

            <div className="flex flex-col space-y-1">
              <label
                htmlFor="category"
                className="text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <List className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <select
                  id="category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="block w-full rounded-md border-gray-300 py-[9px] pl-10 pr-4 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition duration-150"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <FormInput
            label="Description"
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What was this expense for?"
            icon={List}
          />

          {/* Section 2: Debtor Selection */}
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Who owes? (Split Details)
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {users.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => handleToggleDebtor(user.id)}
                  disabled={user.id !== currentUser?.id && !amount} // Disable adding non-payer if amount is empty
                  className={`flex items-center justify-center p-3 rounded-xl transition duration-200 text-sm font-medium ${
                    debtors.some((d) => d.user_id === user.id)
                      ? 'bg-indigo-500 text-white shadow-md hover:bg-indigo-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  } ${
                    user.id === currentUser?.id
                      ? 'ring-2 ring-indigo-500 ring-offset-2'
                      : ''
                  }`}
                >
                  <User className="w-4 h-4 mr-1" />
                  {user.name.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Split Amounts List */}
            <div className="space-y-3 p-4 bg-gray-50 rounded-xl shadow-inner">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <p className="text-sm font-semibold text-gray-600">User</p>
                <div className="flex items-center">
                  <p className="text-sm font-semibold text-gray-600 mr-2">
                    Amount Owed
                  </p>
                  <button
                    type="button"
                    onClick={handleQuickSplit}
                    className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full hover:bg-indigo-200 transition duration-150"
                    disabled={!amount || debtors.length === 0}
                    title="Even Split"
                  >
                    <Calculator className="w-4 h-4 inline mr-1" />
                    Split Evenly
                  </button>
                </div>
              </div>

              {debtors.map((debtor) => (
                <div
                  key={debtor.user_id}
                  className="flex items-center justify-between"
                >
                  <span className="font-medium text-gray-800 flex items-center">
                    {userMap[debtor.user_id]?.name}
                    {debtor.user_id === currentUser?.id && (
                      <span className="ml-2 text-xs text-indigo-500">
                        (Payer)
                      </span>
                    )}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500 font-semibold">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={debtor.amount_owed}
                      onChange={(e) =>
                        handleOwedAmountChange(debtor.user_id, e.target.value)
                      }
                      className="w-32 py-1 px-2 border rounded-md text-right focus:border-indigo-500 focus:ring-indigo-500"
                      disabled={!amount}
                    />
                    {debtor.user_id !== currentUser?.id && (
                      <button
                        type="button"
                        onClick={() => handleToggleDebtor(debtor.user_id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {debtors.length === 0 && (
                <p className="text-gray-500 text-sm italic py-2">
                  Select users above to start splitting.
                </p>
              )}
            </div>

            {/* Summary */}
            <div
              className={`mt-4 p-3 rounded-lg font-bold text-lg flex justify-between ${
                isSplitEqual
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              <span>Total Due / Expense:</span>
              <span>
                ${totalOwedDisplay.toFixed(2)} / $
                {parseFloat(amount || 0).toFixed(2)}
              </span>
            </div>
            {!isSplitEqual && (
              <p className="text-sm text-red-500 mt-2">
                Error: The split amount must exactly match the total expense
                amount.
              </p>
            )}
          </div>

          {/* Submission Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 rounded-xl text-white font-semibold transition duration-200 shadow-lg ${
              isFormValid
                ? 'bg-indigo-600 hover:bg-indigo-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Create Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseSplitterForm;
