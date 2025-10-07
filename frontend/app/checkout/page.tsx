'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Checkout() {
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Get research query from session storage
    const storedQuery = sessionStorage.getItem('researchQuery');
    if (storedQuery) {
      setQuery(storedQuery);
    } else {
      // Redirect back if no query found
      window.location.href = '/';
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !query.trim()) return;
    
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, email }),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        // Clear session storage and redirect to Stripe
        sessionStorage.removeItem('researchQuery');
        window.location.href = data.url;
      } else {
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full p-4 flex justify-between items-center border-b border-gray-200">
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <h1 className="text-xl font-bold text-gray-900">
            Super Deep Research
          </h1>
        </Link>
        <Link 
          href="/about" 
          className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
        >
          How this works
        </Link>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Almost there!
            </h2>
            <p className="text-gray-600">
              Just need your email to send you the research report.
            </p>
          </div>

          {/* Research Query Preview */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Your research query:</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-gray-800 leading-relaxed">{query}</p>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all text-lg"
                    required
                    disabled={isSubmitting}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    We'll send your PDF report to this email address in 3 days.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !email.trim()}
                  className="w-full bg-orange-400 hover:bg-orange-500 disabled:bg-gray-300 text-white font-bold py-4 px-6 rounded-xl transition-colors disabled:cursor-not-allowed text-lg shadow-sm"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    'Pay $1 & Start Research'
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Message Display */}
          {message && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {message}
              </div>
            </div>
          )}

          {/* Why $1 Explanation */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="font-medium text-blue-900 text-sm">Why do we charge $1?</h4>
                <p className="text-blue-800 text-sm mt-1">
                  The small fee helps prevent spam submissions and covers our research API costs, ensuring we can provide quality analysis for everyone.
                </p>
              </div>
            </div>
          </div>

          {/* Security Info */}
          <div className="mt-4 text-center">
            <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Secure payment via Stripe</span>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <Link 
              href="/" 
              className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
            >
              ← Back to edit your research query
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
