// components/CommentsSection.tsx
"use client";

import React, { useState } from "react";

// Define the shape of a comment for TypeScript
interface Comment {
  id: number;
  author: string;
  role: string; // e.g., "Health Economist"
  date: string;
  content: string;
  likes: number;
}

const CommentsSection: React.FC = () => {
  // Mock Data: Initial comments to populate the view
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Sarah Jenkins",
      role: "Policy Analyst",
      date: "Oct 24, 2023",
      content:
        "This framework for AI regulation is interesting, but I worry about the compliance costs for smaller rural hospitals. Has HTR modeled that specific impact?",
      likes: 12,
    },
    {
      id: 2,
      author: "Dr. Marcus Thorne",
      role: "Chief Medical Officer",
      date: "Oct 25, 2023",
      content:
        "Agreed with Sarah. The economic model needs to account for the implementation gap in non-academic centers. Great article otherwise.",
      likes: 8,
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const handlePostComment = () => {
    if (!newComment.trim()) return;

    const commentToAdd: Comment = {
      id: Date.now(),
      author: "Guest User", // In a real app, this comes from Auth
      role: "Reader",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      content: newComment,
      likes: 0,
    };

    setComments([commentToAdd, ...comments]);
    setNewComment("");
  };

  const handleLike = (id: number) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  return (
    <div className="mt-16 pt-10 border-t border-ui-border">
      {/* 1. SOCIAL SHARE HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h3 className="text-2xl font-bold text-text-heading">
          Discussion ({comments.length})
        </h3>
        <div className="flex space-x-3">
          <span className="text-sm font-semibold text-text-body self-center mr-2">
            Share this insight:
          </span>
          <button className="px-3 py-1 bg-surface border border-ui-border rounded text-sm text-text-body hover:bg-ui-bg-light hover:text-ui-primary transition">
            LinkedIn
          </button>
          <button className="px-3 py-1 bg-surface border border-ui-border rounded text-sm text-text-body hover:bg-ui-bg-light hover:text-ui-primary transition">
            X (Twitter)
          </button>
          <button className="px-3 py-1 bg-surface border border-ui-border rounded text-sm text-text-body hover:bg-ui-bg-light hover:text-ui-primary transition">
            Email
          </button>
        </div>
      </div>

      {/* 2. COMMENT INPUT */}
      <div className="mb-12 bg-surface-muted p-6 rounded-xl border border-ui-border">
        <label
          htmlFor="comment"
          className="block text-sm font-bold text-text-heading mb-2"
        >
          Join the conversation
        </label>
        <textarea
          id="comment"
          rows={3}
          className="w-full p-3 border border-ui-border rounded-lg bg-surface text-text-body focus:outline-none focus:ring-2 focus:ring-ui-primary/50 transition"
          placeholder="Add your perspective..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="mt-3 flex justify-end">
          <button
            onClick={handlePostComment}
            className="px-6 py-2 bg-ui-primary text-ui-text-on-primary font-bold rounded-lg hover:opacity-90 transition shadow-sm"
          >
            Post Comment
          </button>
        </div>
      </div>

      {/* 3. COMMENTS LIST */}
      <div className="space-y-8">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            {/* Avatar Placeholder */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-ui-bg-light flex items-center justify-center text-ui-primary font-bold">
              {comment.author.charAt(0)}
            </div>

            {/* Content */}
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-text-heading">
                  {comment.author}
                </span>
                <span className="text-xs px-2 py-0.5 bg-surface-muted border border-ui-border rounded text-text-body">
                  {comment.role}
                </span>
                <span className="text-sm text-text-body/60">
                  • {comment.date}
                </span>
              </div>

              <p className="text-text-body leading-relaxed mb-3">
                {comment.content}
              </p>

              {/* Interaction Buttons */}
              <div className="flex items-center gap-4 text-sm">
                <button
                  onClick={() => handleLike(comment.id)}
                  className="flex items-center gap-1 text-text-body hover:text-ui-primary transition group"
                >
                  <span className="group-hover:scale-110 transition">♥</span>{" "}
                  {comment.likes} Likes
                </button>
                <button className="text-text-body hover:text-ui-primary transition">
                  Reply
                </button>
                <button className="text-text-body hover:text-ui-primary transition">
                  Report
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
