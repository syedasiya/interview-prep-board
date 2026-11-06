import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TopicCard from '../TopicCard';

describe('TopicCard Component - Accordion & Nested Sub-tasks', () => {
  const mockTopic = {
    id: 'topic-1',
    title: 'Dynamic Programming & Memoization',
    category: 'Coding',
    isCompleted: false,
    subtasks: [
      { id: 'sub-1', name: 'Fibonacci with Memoization', isCompleted: true },
      { id: 'sub-2', name: '0/1 Knapsack Problem', isCompleted: false },
    ],
  };

  it('renders default collapsed state with title, category, and mini progress indicator', () => {
    render(
      <TopicCard
        topic={mockTopic}
        onDeleteTopic={vi.fn()}
        onAddSubtask={vi.fn()}
        onToggleSubtask={vi.fn()}
      />
    );

    // Topic title & category
    expect(screen.getByText('Dynamic Programming & Memoization')).toBeInTheDocument();
    expect(screen.getByText('Coding')).toBeInTheDocument();

    // Mini progress indicator
    expect(screen.getByText(/1\/2 sub-tasks done/i)).toBeInTheDocument();

    // Status indicator
    expect(screen.getByText(/pending/i)).toBeInTheDocument();

    // Subtasks list should be hidden initially
    expect(screen.queryByText('Fibonacci with Memoization')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/add a sub-task/i)).not.toBeInTheDocument();

    // Accordion toggle button has aria-expanded="false"
    const expandBtn = screen.getByRole('button', { name: /expand sub-tasks/i });
    expect(expandBtn).toHaveAttribute('aria-expanded', 'false');
  });

  it('expands accordion to reveal sub-tasks and add sub-task input when clicked', async () => {
    const user = userEvent.setup();
    render(
      <TopicCard
        topic={mockTopic}
        onDeleteTopic={vi.fn()}
        onAddSubtask={vi.fn()}
        onToggleSubtask={vi.fn()}
      />
    );

    const expandBtn = screen.getByRole('button', { name: /expand sub-tasks/i });
    await user.click(expandBtn);

    // Now subtasks and input should be visible
    expect(expandBtn).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Fibonacci with Memoization')).toBeInTheDocument();
    expect(screen.getByText('0/1 Knapsack Problem')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/add a sub-task/i)).toBeInTheDocument();

    // Click again to collapse
    await user.click(expandBtn);
    expect(expandBtn).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Fibonacci with Memoization')).not.toBeInTheDocument();
  });

  it('calls onToggleSubtask when a sub-task checkbox is toggled', async () => {
    const handleToggleSubtask = vi.fn();
    const user = userEvent.setup();

    render(
      <TopicCard
        topic={mockTopic}
        onDeleteTopic={vi.fn()}
        onAddSubtask={vi.fn()}
        onToggleSubtask={handleToggleSubtask}
      />
    );

    // Expand
    await user.click(screen.getByRole('button', { name: /expand sub-tasks/i }));

    // Toggle the pending subtask
    const checkbox = screen.getByRole('checkbox', {
      name: /mark "0\/1 Knapsack Problem" as completed/i,
    });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(handleToggleSubtask).toHaveBeenCalledTimes(1);
    expect(handleToggleSubtask).toHaveBeenCalledWith('topic-1', 'sub-2');
  });

  it('allows adding a new sub-task and resets input field', async () => {
    const handleAddSubtask = vi.fn();
    const user = userEvent.setup();

    render(
      <TopicCard
        topic={mockTopic}
        onDeleteTopic={vi.fn()}
        onAddSubtask={handleAddSubtask}
        onToggleSubtask={vi.fn()}
      />
    );

    // Expand accordion
    await user.click(screen.getByRole('button', { name: /expand sub-tasks/i }));

    const input = screen.getByPlaceholderText(/add a sub-task/i);
    const addBtn = screen.getByRole('button', { name: /add sub-task/i });

    // Try empty submit - should not call handleAddSubtask
    await user.click(addBtn);
    expect(handleAddSubtask).not.toHaveBeenCalled();

    // Type valid subtask and click Add
    await user.type(input, 'Longest Common Subsequence');
    await user.click(addBtn);

    expect(handleAddSubtask).toHaveBeenCalledTimes(1);
    expect(handleAddSubtask).toHaveBeenCalledWith(
      'topic-1',
      'Longest Common Subsequence'
    );
    expect(input).toHaveValue('');
  });

  it('displays completed badge when 100% of subtasks are checked', () => {
    const completedTopic = {
      id: 'topic-2',
      title: 'STAR Method Behavioral',
      category: 'HR',
      isCompleted: true,
      subtasks: [
        { id: 'sub-1', name: 'Situation & Task examples', isCompleted: true },
        { id: 'sub-2', name: 'Action & Result metrics', isCompleted: true },
      ],
    };

    render(
      <TopicCard
        topic={completedTopic}
        onDeleteTopic={vi.fn()}
        onAddSubtask={vi.fn()}
        onToggleSubtask={vi.fn()}
      />
    );

    expect(screen.getByText(/2\/2 sub-tasks done/i)).toBeInTheDocument();
    expect(screen.getByText(/^completed$/i)).toBeInTheDocument();
  });

  it('handles empty subtasks gracefully', async () => {
    const user = userEvent.setup();
    const emptySubtasksTopic = {
      id: 'topic-3',
      title: 'New Unexplored Topic',
      category: 'Aptitude',
      isCompleted: false,
      subtasks: [],
    };

    render(
      <TopicCard
        topic={emptySubtasksTopic}
        onDeleteTopic={vi.fn()}
        onAddSubtask={vi.fn()}
        onToggleSubtask={vi.fn()}
      />
    );

    expect(screen.getByText(/0\/0 sub-tasks done/i)).toBeInTheDocument();

    // Expand
    await user.click(screen.getByRole('button', { name: /expand sub-tasks/i }));
    expect(screen.getByText(/no sub-tasks yet/i)).toBeInTheDocument();
  });

  it('calls onDeleteTopic when delete button is clicked', async () => {
    const handleDeleteTopic = vi.fn();
    const user = userEvent.setup();

    render(
      <TopicCard
        topic={mockTopic}
        onDeleteTopic={handleDeleteTopic}
        onAddSubtask={vi.fn()}
        onToggleSubtask={vi.fn()}
      />
    );

    const deleteBtn = screen.getByRole('button', {
      name: /delete "Dynamic Programming & Memoization"/i,
    });
    await user.click(deleteBtn);

    expect(handleDeleteTopic).toHaveBeenCalledWith('topic-1');
  });
});
