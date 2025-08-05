export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-semibold mr-3">
                {(process.env.BUSINESS_NAME || 'S').charAt(0)}
              </div>
              <span className="text-lg font-semibold text-gray-900">
                {process.env.BUSINESS_NAME || 'StaticFast'}
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
                Features
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
                Pricing
              </a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
                Contact
              </a>
              <a
                href={`tel:${process.env.PHONE}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              {process.env.HERO_BADGE_TEXT && (
                <div className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-8">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  {process.env.HERO_BADGE_TEXT}
                </div>
              )}
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {process.env.HERO_TITLE_LINE1 || 'Professional Websites'}{' '}
                <span className="text-blue-600">
                  {process.env.HERO_TITLE_LINE2 || 'That Convert'}
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
                {process.env.HERO_SUBTITLE || 'Get a stunning, high-converting website that grows your business. Built fast, optimized for results, designed to impress.'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a
                  href={`tel:${process.env.PHONE}`}
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Call {process.env.PHONE || 'Now'}
                </a>
                <a
                  href={`mailto:${process.env.EMAIL}`}
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Get Free Quote
                </a>
              </div>
              
              {/* Trust indicators */}
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="flex text-yellow-400 mr-2">★★★★★</div>
                  <span>4.9/5 rating</span>
                </div>
                <div>50+ successful projects</div>
                <div>24hr response time</div>
              </div>
            </div>
            
            {/* Right Visual */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                  <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=450&fit=crop&crop=entropy&cs=tinysrgb" 
                      alt="Professional Business Website Example"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">
                      Professional websites that convert visitors into customers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed Online
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional websites with all the features your business needs to grow and thrive.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-2xl mb-4">
                ⚡
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Fast Setup</h3>
              <p className="text-gray-600">
                Get online quickly with our streamlined process. No technical headaches, just results.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 text-2xl mb-4">
                📱
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Mobile Optimized</h3>
              <p className="text-gray-600">
                Perfect experience on every device. Your customers will love browsing your site.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 text-2xl mb-4">
                🎯
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Conversion Focused</h3>
              <p className="text-gray-600">
                Every element designed to turn visitors into customers. Proven layouts that work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your business needs. No hidden fees, just great value.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {process.env.SERVICE_1_NAME && (
              <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{process.env.SERVICE_1_NAME}</h3>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{process.env.SERVICE_1_PRICE}</div>
                  <div className="text-gray-500 mb-6">{process.env.SERVICE_1_DURATION}</div>
                  <p className="text-gray-600 mb-8">{process.env.SERVICE_1_DESCRIPTION}</p>
                  <a
                    href={`mailto:${process.env.EMAIL}?subject=Interested in ${process.env.SERVICE_1_NAME}`}
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            )}
            
            {process.env.SERVICE_2_NAME && (
              <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{process.env.SERVICE_2_NAME}</h3>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{process.env.SERVICE_2_PRICE}</div>
                  <div className="text-gray-500 mb-6">{process.env.SERVICE_2_DURATION}</div>
                  <p className="text-gray-600 mb-8">{process.env.SERVICE_2_DESCRIPTION}</p>
                  <a
                    href={`mailto:${process.env.EMAIL}?subject=Interested in ${process.env.SERVICE_2_NAME}`}
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            )}
            
            {process.env.SERVICE_3_NAME && (
              <div className="relative bg-white border-2 border-blue-500 rounded-xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    POPULAR
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{process.env.SERVICE_3_NAME}</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-1">{process.env.SERVICE_3_PRICE}</div>
                  <div className="text-gray-500 mb-6">{process.env.SERVICE_3_DURATION}</div>
                  <p className="text-gray-600 mb-8">{process.env.SERVICE_3_DESCRIPTION}</p>
                  <a
                    href={`mailto:${process.env.EMAIL}?subject=Interested in ${process.env.SERVICE_3_NAME}`}
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600">
              Real results from real businesses
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex text-yellow-400 mb-4">★★★★★</div>
              <p className="text-gray-600 mb-4">
                &ldquo;Professional, fast, and exactly what we needed. Our new website has increased our leads significantly.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold mr-3">
                  J
                </div>
                <div>
                  <div className="font-semibold text-gray-900">John Miller</div>
                  <div className="text-sm text-gray-500">Business Owner</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex text-yellow-400 mb-4">★★★★★</div>
              <p className="text-gray-600 mb-4">
                &ldquo;Outstanding service and support. They delivered exactly what they promised, on time and on budget.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold mr-3">
                  S
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah Chen</div>
                  <div className="text-sm text-gray-500">Restaurant Owner</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex text-yellow-400 mb-4">★★★★★</div>
              <p className="text-gray-600 mb-4">
                &ldquo;The best investment we&apos;ve made for our business. Professional design and great results.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold mr-3">
                  M
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Mike Rodriguez</div>
                  <div className="text-sm text-gray-500">Service Provider</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Contact us today for a free consultation. Let&apos;s discuss how we can help grow your business online.
          </p>
          
          <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {process.env.PHONE && (
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xl mx-auto mb-4">
                    📞
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                  <p className="text-gray-500 text-sm mb-3">Free consultation</p>
                  <a 
                    href={`tel:${process.env.PHONE}`} 
                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    {process.env.PHONE}
                  </a>
                </div>
              )}
              
              {process.env.EMAIL && (
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 text-xl mx-auto mb-4">
                    ✉️
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                  <p className="text-gray-500 text-sm mb-3">Quick response</p>
                  <a 
                    href={`mailto:${process.env.EMAIL}`} 
                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors break-all"
                  >
                    {process.env.EMAIL}
                  </a>
                </div>
              )}
              
              {process.env.ADDRESS && (
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 text-xl mx-auto mb-4">
                    📍
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Visit Us</h3>
                  <p className="text-gray-500 text-sm mb-3">Local service</p>
                  <p className="text-gray-900 font-medium">
                    {process.env.ADDRESS}
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${process.env.PHONE}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Call Now
              </a>
              <a
                href={`mailto:${process.env.EMAIL}?subject=Website Consultation Request`}
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Get Free Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-semibold mr-3">
                  {(process.env.BUSINESS_NAME || 'S').charAt(0)}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {process.env.BUSINESS_NAME || 'StaticFast'}
                </h3>
              </div>
              <p className="text-gray-600 max-w-md mx-auto">
                {process.env.BUSINESS_TAGLINE || 'Professional websites that help your business grow online.'}
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm">
              {process.env.PHONE && (
                <a href={`tel:${process.env.PHONE}`} className="text-gray-500 hover:text-gray-900 transition-colors">
                  📞 {process.env.PHONE}
                </a>
              )}
              {process.env.EMAIL && (
                <a href={`mailto:${process.env.EMAIL}`} className="text-gray-500 hover:text-gray-900 transition-colors">
                  ✉️ {process.env.EMAIL}  
                </a>
              )}
              {process.env.ADDRESS && (
                <span className="text-gray-500">📍 {process.env.ADDRESS}</span>
              )}
            </div>
            
            <div className="border-t border-gray-200 pt-8 text-sm text-gray-500">
              <p>&copy; 2025 {process.env.BUSINESS_NAME || 'StaticFast'}. All rights reserved.</p>
              <p className="mt-2">Built with StaticFast</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}