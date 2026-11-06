import React from 'react';
import TopicCard from './TopicCard';
import { BookOpen } from 'lucide-react';

export default function TopicList({
  topics,
  onDeleteTopic,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask,
}) {
  if (!topics || topics.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-dashed border-slate-300 p-8 text-center my-4">
        <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
          <BookOpen className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-700 mb-1">
          No topics found
        </h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          Try adjusting your filters or add a new topic above to continue your interview prep.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {topics.map((topic) => (
        <TopicCard
          key={topic.id}
          topic={topic}
          onDeleteTopic={onDeleteTopic}
          onAddSubtask={onAddSubtask}
          onToggleSubtask={onToggleSubtask}
          onDeleteSubtask={onDeleteSubtask}
        />
      ))}
    </div>
  );
}
