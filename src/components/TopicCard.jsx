import React, { useState } from 'react';
import {
  Trash2,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  Plus,
  ListTodo,
} from 'lucide-react';

const CATEGORY_STYLES = {
  Coding: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    dot: 'bg-blue-500',
  },
  Aptitude: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
    dot: 'bg-purple-500',
  },
  HR: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500',
  },
  Technical: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
  },
};

export default function TopicCard({
  topic,
  onDeleteTopic,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [subtaskInput, setSubtaskInput] = useState('');

  const subtasks = topic.subtasks || [];
  const totalSubtasks = subtasks.length;
  const completedSubtasks = subtasks.filter((st) => st.isCompleted).length;

  const categoryStyle = CATEGORY_STYLES[topic.category] || {
    bg: 'bg-slate-50',
    text: 'text-slate-700',
    border: 'border-slate-200',
    dot: 'bg-slate-400',
  };

  const handleAddSubtaskSubmit = (e) => {
    e.preventDefault();
    const trimmed = subtaskInput.trim();
    if (!trimmed) return;

    if (onAddSubtask) {
      onAddSubtask(topic.id, trimmed);
    }
    setSubtaskInput('');
  };

  return (
    <div
      className={`rounded-xl border transition-all duration-200 overflow-hidden ${
        topic.isCompleted
          ? 'bg-slate-50/60 border-slate-200'
          : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm'
      }`}
    >
      {/* Top Header Row (Accordion Trigger) */}
      <div className="p-4 sm:p-4.5 flex items-center justify-between gap-3">
        {/* Clickable Header Info Area */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-1 min-w-0 cursor-pointer select-none"
        >
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            {/* Category Badge */}
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${categoryStyle.dot}`} />
              {topic.category}
            </span>

            {/* Auto-calculated Parent Completion Status Badge */}
            {topic.isCompleted ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Completed
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                <Clock className="w-3 h-3 text-slate-400" />
                Pending
              </span>
            )}

            {/* Mini Progress Indicator */}
            <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
              <ListTodo className="w-3 h-3 text-slate-400" />
              <span>
                {completedSubtasks}/{totalSubtasks} Sub-tasks Done
              </span>
            </span>
          </div>

          <h3
            className={`text-base font-semibold leading-snug break-words transition-colors duration-150 ${
              topic.isCompleted
                ? 'line-through text-slate-400 font-medium'
                : 'text-slate-800'
            }`}
          >
            {topic.title}
          </h3>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Accordion Expand / Collapse Button */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Collapse sub-tasks' : 'Expand sub-tasks'}
            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            title={isExpanded ? 'Collapse sub-tasks' : 'Expand sub-tasks'}
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {/* Delete Topic Button */}
          <button
            type="button"
            onClick={() => onDeleteTopic(topic.id)}
            aria-label={`Delete "${topic.title}"`}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            title="Delete topic"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Collapsible Accordion Content */}
      {isExpanded && (
        <div className="border-t border-slate-100 bg-slate-50/70 p-4 sm:p-5">
          <div className="max-w-3xl">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>Sub-tasks Checklist</span>
              <span className="text-slate-400 font-normal">
                {completedSubtasks} of {totalSubtasks} completed
              </span>
            </h4>

            {/* Sub-tasks list */}
            {subtasks.length === 0 ? (
              <div className="text-xs text-slate-400 italic py-2 px-1 mb-3">
                No sub-tasks yet. Add one below!
              </div>
            ) : (
              <ul className="space-y-2 mb-4">
                {subtasks.map((subtask) => (
                  <li
                    key={subtask.id}
                    className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-white border border-slate-200/80 hover:border-slate-300 transition"
                  >
                    <label className="flex items-center gap-2.5 flex-1 min-w-0 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={subtask.isCompleted}
                        onChange={() => onToggleSubtask(topic.id, subtask.id)}
                        aria-label={
                          subtask.isCompleted
                            ? `Mark "${subtask.name}" as pending`
                            : `Mark "${subtask.name}" as completed`
                        }
                        className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span
                        className={`text-sm break-words select-none ${
                          subtask.isCompleted
                            ? 'line-through text-slate-400'
                            : 'text-slate-700 font-medium'
                        }`}
                      >
                        {subtask.name}
                      </span>
                    </label>

                    {onDeleteSubtask && (
                      <button
                        type="button"
                        onClick={() => onDeleteSubtask(topic.id, subtask.id)}
                        aria-label={`Delete sub-task "${subtask.name}"`}
                        className="p-1 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded transition"
                        title="Delete sub-task"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {/* Add Sub-task Input Form */}
            <form onSubmit={handleAddSubtaskSubmit} className="flex gap-2">
              <input
                type="text"
                value={subtaskInput}
                onChange={(e) => setSubtaskInput(e.target.value)}
                placeholder="Add a sub-task (e.g. solve 3 practice problems)..."
                aria-label="New sub-task name"
                className="flex-1 px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg placeholder-slate-400 text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
              />
              <button
                type="submit"
                aria-label="Add sub-task"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-semibold rounded-lg shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
