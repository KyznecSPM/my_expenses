'use client';

import { Tags } from '@/helpers/constants';
import { mockExpenses } from '@/helpers/mock';
import { createContext, useReducer, useContext, useCallback } from 'react';
import { v4 as uuid } from 'uuid';

export interface Expense {
  description: string;
  category: Tags;
  date: string;
  sum: string;
}

export interface ExpenseEntity extends Expense {
  id: string;
}

type State = ExpenseEntity[];

type ExpenseContextType = {
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  state: State;
};

const ExpenseContext = createContext<ExpenseContextType>({
  addExpense: () => {},
  deleteExpense: () => {},
  state: [],
});

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within a ExpenseProvider');
  }
  return context;
};

enum ActionTypes {
  ADD_EXPENSE = 'ADD_EXPENSE',
  DELETE_EXPENSE = 'DELETE_EXPENSE',
}

type AddExpenseAction = {
  type: ActionTypes.ADD_EXPENSE;
  payload: ExpenseEntity;
};

type DeleteExpenseAction = {
  type: ActionTypes.DELETE_EXPENSE;
  payload: string;
};

type Actions = AddExpenseAction | DeleteExpenseAction;

function reducer(state: State, action: Actions) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.ADD_EXPENSE:
      return [...state, payload];
    case ActionTypes.DELETE_EXPENSE:
      return state.filter((expense) => expense.id !== payload);
    default:
      return state;
  }
}

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, mockExpenses);

  const addExpense = useCallback(
    (expense: Expense) =>
      dispatch({
        type: ActionTypes.ADD_EXPENSE,
        payload: { ...expense, id: uuid() },
      }),
    []
  );

  const deleteExpense = useCallback(
    (id: string) => dispatch({ type: ActionTypes.DELETE_EXPENSE, payload: id }),
    []
  );

  return (
    <ExpenseContext.Provider
      value={{
        addExpense,
        deleteExpense,
        state,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}
