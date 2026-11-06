import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('Interview Preparation Board - Full App with Nested Sub-tasks', () => {
  const initialTestTopics = [
    {
      id: '1',
      title: 'Binary Search Algorithm',
      category: 'Coding',
      isCompleted: true,
      subtasks: [
        { id: '1-1', name: 'Iterative implementation', isCompleted: true },
        { id: '1-2', name: 'Search in rotated sorted array', isCompleted: true },
      ],
    },
    {
      id: '2',
      title: 'Microservices vs Monolith',
      category: 'Technical',
      isCompleted: false,
      subtasks: [
        { id: '2-1', name: 'Understand 2PC and Saga pattern', isCompleted: false },
        { id: '2-2', name: 'Service discovery & API Gateway', isCompleted: false },
      ],
    },
    {
      id: '3',
      title: 'STAR Behavioral Scenarios',
      category: 'HR',
      isCompleted: false,
      subtasks: [
        { id: '3-1', name: 'Prepare leadership example', isCompleted: true },
        { id: '3-2', name: 'Prepare failure and learning example', isCompleted: false },
      ],
    },
    {
      id: '4',
      title: 'Time and Work Problems',
      category: 'Aptitude',
      isCompleted: true,
      subtasks: [
        { id: '4-1', name: 'Pipes and cisterns formulas', isCompleted: true },
      ],
    },
  ];

  it('renders initial state with topics and accurate progress dashboard based on auto-completion', () => {
    render(<App initialTopics={initialTestTopics} />);

    expect(screen.getByText('Interview Preparation Board')).toBeInTheDocument();

    // 2/4 topics completed = 50%
    expect(screen.getByText('2/4 Topics Completed')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();

    // Verify initial topics are visible
    expect(screen.getByText('Binary Search Algorithm')).toBeInTheDocument();
    expect(screen.getByText('Microservices vs Monolith')).toBeInTheDocument();
    expect(screen.getByText('STAR Behavioral Scenarios')).toBeInTheDocument();
    expect(screen.getByText('Time and Work Problems')).toBeInTheDocument();

    // Mini sub-task indicators
    expect(screen.getByText('2/2 Sub-tasks Done')).toBeInTheDocument();
    expect(screen.getByText('0/2 Sub-tasks Done')).toBeInTheDocument();
    expect(screen.getByText('1/2 Sub-tasks Done')).toBeInTheDocument();
    expect(screen.getByText('1/1 Sub-tasks Done')).toBeInTheDocument();
  });

  it('allows expanding an accordion, toggling sub-tasks, and triggers parent auto-completion', async () => {
    const user = userEvent.setup();
    render(<App initialTopics={initialTestTopics} />);

    // Topic 3 "STAR Behavioral Scenarios" is initially Pending (1/2 Sub-tasks Done)
    expect(screen.getByText('1/2 Sub-tasks Done')).toBeInTheDocument();

    // Expand topic 3 accordion
    const expandButtons = screen.getAllByRole('button', { name: /expand sub-tasks/i });
    await user.click(expandButtons[2]); // 3rd card

    // Verify sub-tasks are visible
    expect(screen.getByText('Prepare leadership example')).toBeInTheDocument();
    expect(screen.getByText('Prepare failure and learning example')).toBeInTheDocument();

    // Check off the remaining sub-task "Prepare failure and learning example"
    const pendingSubtaskCheckbox = screen.getByRole('checkbox', {
      name: /mark "Prepare failure and learning example" as completed/i,
    });
    expect(pendingSubtaskCheckbox).not.toBeChecked();

    await user.click(pendingSubtaskCheckbox);

    // Now all 2/2 subtasks are completed => Parent automatically becomes Completed!
    expect(screen.getAllByText('2/2 Sub-tasks Done')).toHaveLength(2);
    // Progress should update from 2/4 to 3/4 = 75%
    expect(screen.getByText('3/4 Topics Completed')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();

    // Uncheck one sub-task => Parent automatically reverts to Pending!
    await user.click(screen.getByRole('checkbox', {
      name: /mark "Prepare failure and learning example" as pending/i,
    }));

    expect(screen.getByText('1/2 Sub-tasks Done')).toBeInTheDocument();
    // Progress returns to 2/4 = 50%
    expect(screen.getByText('2/4 Topics Completed')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('allows adding a new sub-task to a topic and reverts completed parent to pending if new sub-task is incomplete', async () => {
    const user = userEvent.setup();
    render(<App initialTopics={initialTestTopics} />);

    // Topic 1 "Binary Search Algorithm" is initially Completed (2/2 Sub-tasks Done)
    const expandButtons = screen.getAllByRole('button', { name: /expand sub-tasks/i });
    await user.click(expandButtons[0]); // 1st card

    // Add a 3rd sub-task
    const subtaskInput = screen.getByPlaceholderText(/add a sub-task/i);
    const addSubtaskBtn = screen.getByRole('button', { name: /add sub-task/i });

    await user.type(subtaskInput, 'Find first and last position of element');
    await user.click(addSubtaskBtn);

    // Now it should be 2/3 Sub-tasks Done and parent reverts to Pending!
    expect(screen.getByText('2/3 Sub-tasks Done')).toBeInTheDocument();
    expect(screen.getByText('Find first and last position of element')).toBeInTheDocument();

    // Progress updates from 2/4 (50%) to 1/4 (25%)
    expect(screen.getByText('1/4 Topics Completed')).toBeInTheDocument();
    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  it('allows adding a new parent topic with initial empty sub-tasks', async () => {
    const user = userEvent.setup();
    render(<App initialTopics={initialTestTopics} />);

    const input = screen.getByLabelText(/topic name/i);
    const select = screen.getByLabelText(/category/i);
    const submitBtn = screen.getByRole('button', { name: /add topic/i });

    await user.type(input, 'Trie Prefix Trees');
    await user.selectOptions(select, 'Coding');
    await user.click(submitBtn);

    // Topic is added
    expect(screen.getByText('Trie Prefix Trees')).toBeInTheDocument();
    expect(screen.getByText('0/0 Sub-tasks Done')).toBeInTheDocument();

    // Total topics increased to 5, completed remains 2 (2/5 = 40%)
    expect(screen.getByText('2/5 Topics Completed')).toBeInTheDocument();
    expect(screen.getByText('40%')).toBeInTheDocument();
  });

  it('filters topics correctly by Category and auto-calculated Status (Completed / Pending)', async () => {
    const user = userEvent.setup();
    render(<App initialTopics={initialTestTopics} />);

    // Filter by Completed
    const completedFilterBtn = screen.getByRole('button', { name: /^completed/i });
    await user.click(completedFilterBtn);

    // Only topics that are 100% completed should appear
    expect(screen.getByText('Binary Search Algorithm')).toBeInTheDocument();
    expect(screen.getByText('Time and Work Problems')).toBeInTheDocument();
    expect(screen.queryByText('Microservices vs Monolith')).not.toBeInTheDocument();
    expect(screen.queryByText('STAR Behavioral Scenarios')).not.toBeInTheDocument();

    // Filter by Pending
    const pendingFilterBtn = screen.getByRole('button', { name: /^pending/i });
    await user.click(pendingFilterBtn);

    expect(screen.getByText('Microservices vs Monolith')).toBeInTheDocument();
    expect(screen.getByText('STAR Behavioral Scenarios')).toBeInTheDocument();
    expect(screen.queryByText('Binary Search Algorithm')).not.toBeInTheDocument();
    expect(screen.queryByText('Time and Work Problems')).not.toBeInTheDocument();
  });

  it('deletes a topic cleanly and updates metrics', async () => {
    const user = userEvent.setup();
    render(<App initialTopics={initialTestTopics} />);

    expect(screen.getByText('STAR Behavioral Scenarios')).toBeInTheDocument();

    const deleteBtn = screen.getByRole('button', {
      name: /delete "STAR Behavioral Scenarios"/i,
    });
    await user.click(deleteBtn);

    expect(screen.queryByText('STAR Behavioral Scenarios')).not.toBeInTheDocument();
    // 3 remaining topics, 2 completed = 67%
    expect(screen.getByText('2/3 Topics Completed')).toBeInTheDocument();
  });
});
