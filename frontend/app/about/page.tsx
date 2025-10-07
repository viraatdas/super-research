import Link from 'next/link';
import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Link href="/" className="inline-block text-orange-500 hover:text-orange-600 mb-8">
            ← Back to Home
          </Link>
          
          <h1 className="text-4xl font-medium text-gray-900 mb-6">
            About Super Deep Research
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Automated deep research that runs for 3 days straight. No human intervention required.
          </p>
        </div>

        <div className="space-y-12">
          {/* Architecture Section */}
          <section className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-medium text-gray-900 mb-6">Research Architecture (lol)</h2>
            <div className="relative w-full rounded-lg overflow-hidden bg-gray-100">
              <Image
                src="/architecture-design.jpg"
                alt="Super Deep Research Architecture Design"
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
              />
            </div>
            <p className="text-gray-600 mt-4 text-center text-sm">
              Our research pipeline automatically processes your query through multiple stages of analysis
            </p>
          </section>

          {/* How It Works */}
          <section className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-medium text-gray-900 mb-6">How it works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 font-semibold">1</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Submit Query</h3>
                <p className="text-gray-600 text-sm">Enter your research question and pay $1</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 font-semibold">2</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">3 Days Processing</h3>
                <p className="text-gray-600 text-sm">System runs automatically, no human needed</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 font-semibold">3</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">PDF Delivered</h3>
                <p className="text-gray-600 text-sm">Comprehensive research report to your email</p>
              </div>
            </div>
          </section>

          {/* Why 3 Days */}
          <section className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-medium text-gray-900 mb-6">Why 3 days?</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">
                Idk. 3 days seemed like it would generate more dramatic results. 
              </p>
            </div>
          </section>

          {/* Simple Pricing */}
          <section className="bg-white rounded-xl p-8 shadow-sm text-center">
            <h2 className="text-2xl font-medium text-gray-900 mb-6">Simple Pricing</h2>
            <div className="inline-block bg-orange-50 rounded-lg p-6">
              <div className="text-4xl font-bold text-orange-600 mb-2">$1</div>
              <div className="text-gray-600">per research query</div>
            </div>
            <p className="text-gray-600 mt-6 max-w-md mx-auto">
              One flat rate. No subscriptions, no hidden fees. Pay only when you need research.
            </p>
          </section>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/"
            className="bg-orange-400 hover:bg-orange-500 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
          >
            <span>Start Research</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
