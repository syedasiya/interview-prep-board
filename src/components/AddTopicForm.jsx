import React, { useState } from 'react';
import { PlusCircle, AlertCircle } from 'lucide-react';

const CATEGORIES = ['Coding', 'Aptitude', 'HR', 'Technical'];

export default function AddTopicForm({ onAddTopic }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Coding');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError('Please enter a topic title');
      return;
    }

    if (onAddTopic) {
      onAddTopic({
        title: trimmedTitle,
        category,
      });
    }

    setTitle('');
    setError('');
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 md:p-6 mb-6 transition-all duration-200 hover:shadow-md"
      noValidate
    >
      <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
        Add New Topic
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        {/* Topic Title Input */}
        <div className="md:col-span-7">
          <label
            htmlFor="topic-title"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5"
          >
            Topic Name
          </label>
          <div className="relative">
            <input
              id="topic-title"
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="e.g. Dynamic Programming, System Design, STAR Method..."
              className={`w-full px-4 py-2.5 rounded-lg border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition duration-150 ${
                error
                  ? 'border-red-400 focus:ring-red-200 bg-red-50/30'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100 bg-white'
              }`}
            />
          </div>
          {error && (
            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{error}</span>
            </p>
          )}
        </div>

        {/* Category Dropdown */}
        <div className="md:col-span-3">
          <label
            htmlFor="topic-category"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5"
          >
            Category
          </label>
          <select
            id="topic-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-800 bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition duration-150"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 md:pt-6">
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold shadow-sm shadow-indigo-200 hover:shadow-indigo-300 transition duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Topic</span>
          </button>
        </div>
      </div>
    </form>
  );
}

