import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProgressDashboard from '../ProgressDashboard';

describe('ProgressDashboard Component', () => {
  it('renders progress text, count, and progressbar accurately for non-empty topics', () => {
    const topics = [
      { id: '1', title: 'Two Sum', category: 'Coding', isCompleted: true },
      { id: '2', title: 'Binary Search', category: 'Coding', isCompleted: true },
      { id: '3', title: 'LRU Cache', category: 'Technical', isCompleted: true },
      { id: '4', title: 'Tell me about yourself', category: 'HR', isCompleted: false },
    ];

    render(<ProgressDashboard topics={topics} />);

    // Check count text: 3/4 completed
    expect(screen.getByText('3/4 Topics Completed')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();

    // Check progressbar accessibility attributes
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '75');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');

    // Stats cards
    expect(screen.getByText('4')).toBeInTheDocument(); // total
    expect(screen.getByText('3')).toBeInTheDocument(); // completed
    expect(screen.getByText('1')).toBeInTheDocument(); // pending
  });

  it('handles 0 total topics gracefully with 0% progress and no NaN', () => {
    render(<ProgressDashboard topics={[]} />);

    expect(screen.getByText('0/0 Topics Completed')).toBeInTheDocument();
    expect(screen.getByText('0%')).toBeInTheDocument();

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
  });

  it('handles 100% completion correctly', () => {
    const topics = [
      { id: '1', title: 'Two Sum', category: 'Coding', isCompleted: true },
      { id: '2', title: 'System Design', category: 'Technical', isCompleted: true },
    ];

    render(<ProgressDashboard topics={topics} />);

    expect(screen.getByText('2/2 Topics Completed')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '100');
  });
});
