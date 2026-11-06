import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import FilterPanel from '../FilterPanel';

describe('FilterPanel Component', () => {
  const defaultProps = {
    selectedCategory: 'All',
    onSelectCategory: vi.fn(),
    selectedStatus: 'All',
    onSelectStatus: vi.fn(),
    counts: {
      total: 10,
      completed: 4,
      pending: 6,
      categories: {
        All: 10,
        Aptitude: 2,
        Coding: 4,
        HR: 2,
        Technical: 2,
      },
    },
  };

  it('renders all category and status filter options', () => {
    render(<FilterPanel {...defaultProps} />);

    // Check categories
    expect(screen.getByRole('button', { name: /all categories/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /coding/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /aptitude/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /hr/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /technical/i })).toBeInTheDocument();

    // Check status options
    expect(screen.getByRole('button', { name: /^all$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pending/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /completed/i })).toBeInTheDocument();
  });

  it('highlights the active category and status', () => {
    render(
      <FilterPanel
        {...defaultProps}
        selectedCategory="Coding"
        selectedStatus="Pending"
      />
    );

    const codingBtn = screen.getByRole('button', { name: /coding/i });
    expect(codingBtn).toHaveAttribute('aria-pressed', 'true');

    const pendingBtn = screen.getByRole('button', { name: /pending/i });
    expect(pendingBtn).toHaveAttribute('aria-pressed', 'true');

    const allCatBtn = screen.getByRole('button', { name: /all categories/i });
    expect(allCatBtn).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls onSelectCategory when a category button is clicked', async () => {
    const handleCategory = vi.fn();
    const user = userEvent.setup();

    render(
      <FilterPanel
        {...defaultProps}
        onSelectCategory={handleCategory}
      />
    );

    await user.click(screen.getByRole('button', { name: /technical/i }));
    expect(handleCategory).toHaveBeenCalledWith('Technical');
  });

  it('calls onSelectStatus when a status button is clicked', async () => {
    const handleStatus = vi.fn();
    const user = userEvent.setup();

    render(
      <FilterPanel
        {...defaultProps}
        onSelectStatus={handleStatus}
      />
    );

    await user.click(screen.getByRole('button', { name: /completed/i }));
    expect(handleStatus).toHaveBeenCalledWith('Completed');
  });
});

