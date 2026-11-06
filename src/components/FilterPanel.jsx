import React from 'react';
import { Filter, Layers, CheckCircle, Clock } from 'lucide-react';

const CATEGORIES = [
  { id: 'All', label: 'All Categories' },
  { id: 'Coding', label: 'Coding' },
  { id: 'Aptitude', label: 'Aptitude' },
  { id: 'HR', label: 'HR' },
  { id: 'Technical', label: 'Technical' },
];

const STATUSES = [
  { id: 'All', label: 'All', icon: Layers },
  { id: 'Pending', label: 'Pending', icon: Clock },
  { id: 'Completed', label: 'Completed', icon: CheckCircle },
];

export default function FilterPanel({
  selectedCategory,
  onSelectCategory,
  selectedStatus,
  onSelectStatus,
  counts,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-5 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Filters */}
        <div className="flex-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter By Category</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = counts?.categories ? counts.categories[cat.id] : undefined;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>{cat.label}</span>
                  {typeof count === 'number' && (
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        isActive
                          ? 'bg-indigo-700/60 text-white'
                          : 'bg-slate-200/80 text-slate-600'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider for mobile */}
        <div className="border-t border-slate-100 md:hidden" />

        {/* Status Filters */}
        <div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
            Status
          </div>
          <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200/80">
            {STATUSES.map((status) => {
              const isActive = selectedStatus === status.id;
              const StatusIcon = status.icon;

              return (
                <button
                  key={status.id}
                  type="button"
                  onClick={() => onSelectStatus(status.id)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all duration-150 focus:outline-none ${
                    isActive
                      ? 'bg-white text-indigo-700 shadow-sm font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <StatusIcon className="w-3.5 h-3.5" />
                  <span>{status.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

