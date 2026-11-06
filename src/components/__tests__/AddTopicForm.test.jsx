import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import AddTopicForm from '../AddTopicForm';

describe('AddTopicForm Component', () => {
  it('renders all form fields and submit button', () => {
    render(<AddTopicForm onAddTopic={vi.fn()} />);

    expect(screen.getByLabelText(/topic name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add topic/i })).toBeInTheDocument();

    // Check category dropdown options
    const select = screen.getByLabelText(/category/i);
    expect(select).toHaveValue('Coding');
    expect(screen.getByRole('option', { name: 'Aptitude' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Coding' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'HR' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Technical' })).toBeInTheDocument();
  });

  it('shows validation error and prevents submission when input is empty or whitespace', async () => {
    const handleAddTopic = vi.fn();
    const user = userEvent.setup();

    render(<AddTopicForm onAddTopic={handleAddTopic} />);

    const submitBtn = screen.getByRole('button', { name: /add topic/i });

    // Submit empty
    await user.click(submitBtn);

    expect(screen.getByText(/please enter a topic title/i)).toBeInTheDocument();
    expect(handleAddTopic).not.toHaveBeenCalled();

    // Submit with only spaces
    const input = screen.getByLabelText(/topic name/i);
    await user.type(input, '   ');
    await user.click(submitBtn);

    expect(screen.getByText(/please enter a topic title/i)).toBeInTheDocument();
    expect(handleAddTopic).not.toHaveBeenCalled();
  });

  it('submits valid topic data and resets input field', async () => {
    const handleAddTopic = vi.fn();
    const user = userEvent.setup();

    render(<AddTopicForm onAddTopic={handleAddTopic} />);

    const input = screen.getByLabelText(/topic name/i);
    const select = screen.getByLabelText(/category/i);
    const submitBtn = screen.getByRole('button', { name: /add topic/i });

    // Fill form
    await user.type(input, 'Binary Search Trees');
    await user.selectOptions(select, 'Technical');
    await user.click(submitBtn);

    expect(handleAddTopic).toHaveBeenCalledTimes(1);
    expect(handleAddTopic).toHaveBeenCalledWith({
      title: 'Binary Search Trees',
      category: 'Technical',
    });

    // Check that input is cleared
    expect(input).toHaveValue('');
    // Validation error should not be visible
    expect(screen.queryByText(/please enter a topic title/i)).not.toBeInTheDocument();
  });

  it('clears error message when user starts typing', async () => {
    const handleAddTopic = vi.fn();
    const user = userEvent.setup();

    render(<AddTopicForm onAddTopic={handleAddTopic} />);

    const submitBtn = screen.getByRole('button', { name: /add topic/i });
    await user.click(submitBtn);
    expect(screen.getByText(/please enter a topic title/i)).toBeInTheDocument();

    const input = screen.getByLabelText(/topic name/i);
    await user.type(input, 'A');
    expect(screen.queryByText(/please enter a topic title/i)).not.toBeInTheDocument();
  });
});

