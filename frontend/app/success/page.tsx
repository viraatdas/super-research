import Link from 'next/link';

export default function Success() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-medium text-gray-900 mb-4">
          Research Started!
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Your research task is now running. You'll receive the PDF report in your email within 3 days.
        </p>
        
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="font-medium text-gray-900 mb-4">What happens next?</h2>
          <div className="space-y-3 text-sm text-gray-600 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 text-xs font-semibold">1</span>
              </div>
              <span>System processes your research question automatically</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 text-xs font-semibold">2</span>
              </div>
              <span>3 days of continuous research and analysis</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 text-xs font-semibold">3</span>
              </div>
              <span>PDF report delivered to your email automatically</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
          >
            <span>Start Another Research</span>
          </Link>
          
          <div className="text-sm text-gray-500">
            <Link href="/about" className="hover:text-gray-700 transition-colors">
              Learn more about our process
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
