import React, { useState, useEffect } from 'react';
import ProgressDashboard from './components/ProgressDashboard';
import AddTopicForm from './components/AddTopicForm';
import FilterPanel from './components/FilterPanel';
import TopicList from './components/TopicList';
import { Sparkles, GraduationCap } from 'lucide-react';

export const INITIAL_TOPICS = [
  {
    id: '1',
    title: 'Two Pointers & Sliding Window Patterns',
    category: 'Coding',
    isCompleted: true,
    subtasks: [
      { id: '1-1', name: 'Solve Container With Most Water', isCompleted: true },
      { id: '1-2', name: 'Solve Minimum Window Substring', isCompleted: true },
    ],
  },
  {
    id: '2',
    title: 'High-Level System Design: Rate Limiter & Caching',
    category: 'Technical',
    isCompleted: false,
    subtasks: [
      { id: '2-1', name: 'Compare Token Bucket vs Leaky Bucket algorithms', isCompleted: true },
      { id: '2-2', name: 'Design Redis Cache-Aside & Eviction Policy', isCompleted: false },
    ],
  },
  {
    id: '3',
    title: 'STAR Method Behavioral Responses',
    category: 'HR',
    isCompleted: true,
    subtasks: [
      { id: '3-1', name: 'Draft story: Handling tight deadlines under pressure', isCompleted: true },
      { id: '3-2', name: 'Draft story: Resolving technical disagreements', isCompleted: true },
    ],
  },
  {
    id: '4',
    title: 'Probability & Quantitative Problems',
    category: 'Aptitude',
    isCompleted: false,
    subtasks: [
      { id: '4-1', name: 'Bayes Theorem practice problems', isCompleted: false },
      { id: '4-2', name: 'Combinatorics & Permutations test', isCompleted: false },
    ],
  },
  {
    id: '5',
    title: 'Graph Traversals: BFS, DFS & Dijkstra',
    category: 'Coding',
    isCompleted: false,
    subtasks: [
      { id: '5-1', name: 'Implement BFS shortest path in unweighted graph', isCompleted: true },
      { id: '5-2', name: 'Topological Sort for Course Schedule', isCompleted: false },
    ],
  },
];

export default function App({ initialTopics = INITIAL_TOPICS }) {
  const [topics, setTopics] = useState(initialTopics);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Auto-Completion synchronization logic:
  // A parent topic automatically marks itself as isCompleted = true only when 100% of its sub-tasks are checked off.
  // If a user unchecks a sub-task, the parent topic reverts to isCompleted = false.
  useEffect(() => {
    setTopics((prevTopics) => {
      let changed = false;
      const nextTopics = prevTopics.map((topic) => {
        const subtasks = topic.subtasks || [];
        const isAutoCompleted =
          subtasks.length > 0 && subtasks.every((st) => st.isCompleted);

        if (topic.isCompleted !== isAutoCompleted) {
          changed = true;
          return { ...topic, isCompleted: isAutoCompleted };
        }
        return topic;
      });

      return changed ? nextTopics : prevTopics;
    });
  }, [topics]);

  // Callback to add a new topic
  const handleAddTopic = ({ title, category }) => {
    const newTopic = {
      id: Date.now().toString(),
      title,
      category,
      isCompleted: false,
      subtasks: [],
    };
    setTopics((prev) => [newTopic, ...prev]);
  };

  // Callback to delete a topic
  const handleDeleteTopic = (topicId) => {
    setTopics((prev) => prev.filter((t) => t.id !== topicId));
  };

  // Callback to add a sub-task to a specific topic
  const handleAddSubtask = (topicId, subtaskName) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) => {
        if (topic.id !== topicId) return topic;

        const newSubtask = {
          id: `${topicId}-sub-${Date.now()}`,
          name: subtaskName,
          isCompleted: false,
        };

        const updatedSubtasks = [...(topic.subtasks || []), newSubtask];
        const isAutoCompleted =
          updatedSubtasks.length > 0 &&
          updatedSubtasks.every((st) => st.isCompleted);

        return {
          ...topic,
          subtasks: updatedSubtasks,
          isCompleted: isAutoCompleted,
        };
      })
    );
  };

  // Callback to toggle sub-task completion and auto-update parent topic isCompleted
  const handleToggleSubtask = (topicId, subtaskId) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) => {
        if (topic.id !== topicId) return topic;

        const updatedSubtasks = (topic.subtasks || []).map((subtask) =>
          subtask.id === subtaskId
            ? { ...subtask, isCompleted: !subtask.isCompleted }
            : subtask
        );

        const isAutoCompleted =
          updatedSubtasks.length > 0 &&
          updatedSubtasks.every((st) => st.isCompleted);

        return {
          ...topic,
          subtasks: updatedSubtasks,
          isCompleted: isAutoCompleted,
        };
      })
    );
  };

  // Callback to delete a sub-task from a specific topic
  const handleDeleteSubtask = (topicId, subtaskId) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) => {
        if (topic.id !== topicId) return topic;

        const updatedSubtasks = (topic.subtasks || []).filter(
          (subtask) => subtask.id !== subtaskId
        );

        const isAutoCompleted =
          updatedSubtasks.length > 0 &&
          updatedSubtasks.every((st) => st.isCompleted);

        return {
          ...topic,
          subtasks: updatedSubtasks,
          isCompleted: isAutoCompleted,
        };
      })
    );
  };

  // Filter topics array based on active category and status
  const filteredTopics = topics.filter((topic) => {
    const matchesCategory =
      selectedCategory === 'All' || topic.category === selectedCategory;

    const matchesStatus =
      selectedStatus === 'All' ||
      (selectedStatus === 'Completed' && topic.isCompleted) ||
      (selectedStatus === 'Pending' && !topic.isCompleted);

    return matchesCategory && matchesStatus;
  });

  // Calculate statistics for filter badges
  const counts = {
    total: topics.length,
    completed: topics.filter((t) => t.isCompleted).length,
    pending: topics.filter((t) => !t.isCompleted).length,
    categories: {
      All: topics.length,
      Coding: topics.filter((t) => t.category === 'Coding').length,
      Aptitude: topics.filter((t) => t.category === 'Aptitude').length,
      HR: topics.filter((t) => t.category === 'HR').length,
      Technical: topics.filter((t) => t.category === 'Technical').length,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100/60 to-indigo-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* App Header */}
        <header className="mb-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between border-b border-slate-200/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2 border border-indigo-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ace Your Technical & HR Rounds with Sub-task Roadmaps</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center sm:justify-start gap-2.5">
              <GraduationCap className="w-8 h-8 text-indigo-600" />
              <span>Interview Preparation Board</span>
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Expand any topic to track nested sub-tasks. Topics auto-complete when 100% of sub-tasks are done!
            </p>
          </div>
        </header>

        {/* Progress Dashboard */}
        <ProgressDashboard topics={topics} />

        {/* Add Topic Form */}
        <AddTopicForm onAddTopic={handleAddTopic} />

        {/* Filter Panel */}
        <FilterPanel
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedStatus={selectedStatus}
          onSelectStatus={setSelectedStatus}
          counts={counts}
        />

        {/* Filtered Topic List */}
        <section aria-label="Topic List Section">
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Topics ({filteredTopics.length})
            </h2>
            {(selectedCategory !== 'All' || selectedStatus !== 'All') && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedStatus('All');
                }}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition"
              >
                Reset Filters
              </button>
            )}
          </div>

          <TopicList
            topics={filteredTopics}
            onDeleteTopic={handleDeleteTopic}
            onAddSubtask={handleAddSubtask}
            onToggleSubtask={handleToggleSubtask}
            onDeleteSubtask={handleDeleteSubtask}
          />
        </section>
      </div>
    </div>
  );
}
