import React from 'react';
import { CheckCircle2, Clock, ListChecks, Award } from 'lucide-react';

export default function ProgressDashboard({ topics = [] }) {
  const total = topics.length;
  const completed = topics.filter((t) => t.isCompleted).length;
  const pending = total - completed;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-5 md:p-6 mb-6">
      {/* Header and Progress Percentage */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">
              Preparation Progress
            </h2>
            {percentage === 100 && total > 0 && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                <Award className="w-3.5 h-3.5" /> All Done!
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 font-medium">
            {completed}/{total} Topics Completed
          </p>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-3xl font-extrabold text-indigo-600 tracking-tight">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Visual Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden mb-6 p-0.5 border border-slate-200/70">
        <div
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Preparation completion progress"
          style={{ width: `${percentage}%` }}
          className={`h-full rounded-full transition-all duration-500 ease-out ${
            percentage === 100
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
              : 'bg-gradient-to-r from-indigo-500 to-violet-600'
          }`}
        />
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/60">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">
            <ListChecks className="w-3.5 h-3.5 text-slate-600" />
            <span>Total</span>
          </div>
          <div className="text-xl md:text-2xl font-bold text-slate-800">
            {total}
          </div>
        </div>

        <div className="bg-emerald-50/50 rounded-xl p-3 border border-emerald-100">
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Completed</span>
          </div>
          <div className="text-xl md:text-2xl font-bold text-emerald-700">
            {completed}
          </div>
        </div>

        <div className="bg-amber-50/50 rounded-xl p-3 border border-amber-100">
          <div className="flex items-center gap-2 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-1">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Pending</span>
          </div>
          <div className="text-xl md:text-2xl font-bold text-amber-700">
            {pending}
          </div>
        </div>
      </div>
    </div>
  );
}

