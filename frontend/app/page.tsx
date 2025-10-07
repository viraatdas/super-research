'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [query, setQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSubmitting(true);
    
    // Store query in session storage and redirect to email page
    sessionStorage.setItem('researchQuery', query);
    window.location.href = '/checkout';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-medium text-gray-900 mb-6">
            Start a super deep research task
          </h1>
          <div className="text-left max-w-2xl mx-auto space-y-4">
            <p className="text-lg text-gray-600">
              I think that letting deep research run for a few days generates better results. 
            </p>
            <p className="text-lg text-gray-600">
              So lets scrape every inch of the internet and shove it down the LLM's throat and 
              keep on doing that until we are happy. 
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">          
          <div className="relative">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your research question..."
              className="w-full h-24 px-4 py-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all text-lg shadow-sm"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="flex items-center justify-end">
            <button
              type="submit"
              disabled={isSubmitting || !query.trim()}
              className="bg-orange-400 hover:bg-orange-500 disabled:bg-gray-300 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <span>{isSubmitting ? 'STARTING...' : 'START RESEARCH'}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </form>

        {message && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {message}
          </div>
        )}

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-8 text-sm text-gray-500">
            <Link href="/about" className="hover:text-gray-700 transition-colors">
              How this works
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-400">
          Research runs for 3 days automatically. No intervention needed.
        </div>
      </div>
    </div>
  );
}
