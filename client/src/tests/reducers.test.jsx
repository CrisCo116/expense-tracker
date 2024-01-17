import { loginReducer, signupReducer, expensesReducer } from './reducers';
import * as actions from '../utils/actions';

import { render, screen, fireEvent } from '@testing-library/react';
import Expenses from './Expenses';
import { createStore } from "redux";

describe('Expenses', () => {

  const store = createStore(expensesReducer);
  
  it.todo('adds expense to store', () => {

    // Render component with store
    render(
      <Provider store={store}>
        <Expenses />  
      </Provider>
    );

    // Dispatch action to add expense
    store.dispatch(addExpense({
      amount: 50,
      description: 'Lunch' 
    }));

    // Assert store was updated
    expect(store.getState()).toEqual([{
      amount: 50, 
      description: 'Lunch'
    }]);

  });

  it.todo('requires expense amount', () => {
      render(<Expenses />);
      fireEvent.change(screen.getByLabelText('Where did you spend this money?'), { target: { value: 'Groceries' } });
      fireEvent.click(screen.getByText('Add Expense'));
      expect(screen.getByText('Amount is required')).toBeInTheDocument();
    });

it.todo('adds new expense on submit', async () => {
  render(<Expenses />);
  fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '50' } });
  fireEvent.change(screen.getByLabelText('Where did you spend this money?'), { target: { value: 'Groceries' } });
  fireEvent.click(screen.getByText('Add Expense'));

  const rows = await screen.findAllByRole('row');
  expect(rows).toHaveLength(2); // initial row + new row
  expect(screen.getByText('$50')).toBeInTheDocument();
  expect(screen.getByText('Groceries')).toBeInTheDocument();
});

it.todo('requires expense description', () => {
  render(<Expenses />);
  fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '50' } });
  fireEvent.click(screen.getByText('Add Expense'));
  expect(screen.getByText('Description is required')).toBeInTheDocument();
});

it.todo('clears expenses on logout', () => {
  render(<Expenses />);
  
  // Add expense
  fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '50' } });
  fireEvent.change(screen.getByLabelText('Where did you spend this money?'), { target: { value: 'Groceries' } });
  fireEvent.click(screen.getByText('Add Expense'));

  // Logout
  fireEvent.click(screen.getByText('Logout'));
  
  const rows = screen.getAllByRole('row');
  expect(rows).toHaveLength(1); // only initial row
});

it.todo('displays error on failed add', async () => {
  server.use(rest.post('/expenses', (req, res, ctx) => {
    return res(ctx.status(500));
  }));

  render(<Expenses />);

  fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '50' } });
  fireEvent.change(screen.getByLabelText('Where did you spend this money?'), { target: { value: 'Groceries' } });
  fireEvent.click(screen.getByText('Add Expense'));

  expect(await screen.findByText('Failed to add expense')).toBeInTheDocument();
});

it.todo('updates expense on update click', async () => {
  render(<Expenses />);
  
  // Add initial expense
  fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '50' } });
  fireEvent.change(screen.getByLabelText('Where did you spend this money?'), { target: { value: 'Groceries' } });
  fireEvent.click(screen.getByText('Add Expense'));

  // Update expense
  fireEvent.click(screen.getByText('Update'));
  fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '60' } });
  fireEvent.click(screen.getByText('Add Expense'));

  expect(screen.getByText('$60')).toBeInTheDocument();
});

it.todo('deletes expense on delete click', async () => {
  render(<Expenses />);
  
  // Add initial expense
  fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '50' } });
  fireEvent.change(screen.getByLabelText('Where did you spend this money?'), { target: { value: 'Groceries' } });
  fireEvent.click(screen.getByText('Add Expense'));

  // Delete expense
  fireEvent.click(screen.getByText('Delete'));
  const rows = await screen.findAllByRole('row');
  expect(rows).toHaveLength(1); // only initial row
});

});

describe('signupReducer', () => {
    it.todo('should return user on signup success', () => {
        const user = {id: 1, name: 'John'};
        expect(signupReducer({}, {
          type: 'SIGNUP_SUCCESS',
          user
        })).toEqual({
          user,
          error: null
        });
      });
    
      it.todo('should return error on signup failure', () => {
        const error = 'Signup failed';
        expect(signupReducer({}, {
          type: 'SIGNUP_ERROR',
          error
        })).toEqual({
          user: null,
          error
        });
      });
});

describe('loginReducer', () => {

  it.todo('handles login success', () => {
    const user = {id: 1, name: 'John'};

    const newState = loginReducer({}, actions.loginSuccess(user));

    expect(newState).toEqual({
      user,
      error: null
    });
  });

    it.todo('should handle login success with additional user fields', () => {
        expect(
          loginReducer({}, {
            type: 'LOGIN_SUCCESS',
            user: {id: 1, name: 'Jane', email: 'jane@test.com'}
          })
        ).toEqual({
          user: {id: 1, name: 'Jane', email: 'jane@test.com'},
          error: null
        });
      });

  it.todo('should handle login error with custom error message', () => {
    expect(
      loginReducer({}, {
        type: 'LOGIN_ERROR',
        error: 'Incorrect password'
      })
    ).toEqual({
      user: null,
      error: 'Incorrect password'
    });
  });
});