import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TopicList from '../TopicList';

describe('TopicList Component', () => {
  const sampleTopics = [
    {
      id: '1',
      title: 'Two Pointer Technique',
      category: 'Coding',
      isCompleted: true,
      subtasks: [{ id: 's1', name: 'Container with Most Water', isCompleted: true }],
    },
    {
      id: '2',
      title: 'Work-Life Balance Situational Question',
      category: 'HR',
      isCompleted: false,
      subtasks: [{ id: 's2', name: 'Prepare 2 anecdotes', isCompleted: false }],
    },
    {
      id: '3',
      title: 'Database Indexing (B-Trees)',
      category: 'Technical',
      isCompleted: false,
      subtasks: [],
    },
  ];

  it('renders all topics in the list', () => {
    render(
      <TopicList
        topics={sampleTopics}
        onDeleteTopic={vi.fn()}
        onAddSubtask={vi.fn()}
        onToggleSubtask={vi.fn()}
      />
    );

    expect(screen.getByText('Two Pointer Technique')).toBeInTheDocument();
    expect(screen.getByText('Work-Life Balance Situational Question')).toBeInTheDocument();
    expect(screen.getByText('Database Indexing (B-Trees)')).toBeInTheDocument();
  });

  it('displays empty state when no topics are provided', () => {
    render(
      <TopicList
        topics={[]}
        onDeleteTopic={vi.fn()}
        onAddSubtask={vi.fn()}
        onToggleSubtask={vi.fn()}
      />
    );

    expect(screen.getByText(/no topics found/i)).toBeInTheDocument();
    expect(
      screen.getByText(/try adjusting your filters or add a new topic above/i)
    ).toBeInTheDocument();
  });

  it('forwards callbacks when interacting with cards', async () => {
    const handleDelete = vi.fn();
    const handleToggleSubtask = vi.fn();
    const user = userEvent.setup();

    render(
      <TopicList
        topics={sampleTopics}
        onDeleteTopic={handleDelete}
        onAddSubtask={vi.fn()}
        onToggleSubtask={handleToggleSubtask}
      />
    );

    // Expand the second topic
    const expandButtons = screen.getAllByRole('button', { name: /expand sub-tasks/i });
    await user.click(expandButtons[1]);

    // Check subtask checkbox
    const subtaskCheckbox = screen.getByRole('checkbox', {
      name: /mark "Prepare 2 anecdotes" as completed/i,
    });
    await user.click(subtaskCheckbox);
    expect(handleToggleSubtask).toHaveBeenCalledWith('2', 's2');

    // Delete the first topic
    const deleteBtn = screen.getByRole('button', {
      name: /delete "Two Pointer Technique"/i,
    });
    await user.click(deleteBtn);
    expect(handleDelete).toHaveBeenCalledWith('1');
  });
});
