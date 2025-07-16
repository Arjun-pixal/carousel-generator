"use client"



import { useState, useEffect } from "react"
import { ChevronDown, Sparkles, ImageIcon, Download, Palette, ArrowRight } from "lucide-react"

interface LandingPageProps {
  onGetStarted: () => void
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden flex items-center justify-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div
            className={`transform transition-all duration-1000 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <div className="flex items-center justify-center mb-8">
              <Sparkles className="w-12 h-12 text-yellow-400 mr-4 animate-spin" />
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white">
                Carousel
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {" "}
                  Generator
                </span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Create stunning, professional carousel presentations in minutes. Design beautiful slides with our
              intuitive editor and export them in multiple formats.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <div className="flex items-center text-gray-300 text-base sm:text-lg">
                <ImageIcon className="w-5 h-5 mr-3 text-blue-400" />
                <span>Visual Editor</span>
              </div>
              <div className="flex items-center text-gray-300 text-base sm:text-lg">
                <Palette className="w-5 h-5 mr-3 text-purple-400" />
                <span>Custom Themes</span>
              </div>
              <div className="flex items-center text-gray-300 text-base sm:text-lg">
                <Download className="w-5 h-5 mr-3 text-pink-400" />
                <span>Multiple Formats</span>
              </div>
            </div>

            <button
              onClick={onGetStarted}
              className="group relative px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-lg sm:text-xl font-bold rounded-full hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25"
            >
              <span className="relative z-10 flex items-center">
                Generate My Carousel
                <ArrowRight className="w-5 h-5 ml-3" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Scroll Indicator */}
          <div
            className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <button onClick={scrollToFeatures} className="text-white hover:text-blue-300 transition-colors">
              <ChevronDown className="w-8 h-8 animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to Create
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Amazing Carousels
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Our powerful editor gives you all the tools to design professional carousel presentations that captivate
              your audience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Visual Editor</h3>
              <p className="text-gray-600">
                Intuitive drag-and-drop interface with real-time preview. Create beautiful slides without any design
                experience.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border border-purple-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Custom Themes</h3>
              <p className="text-gray-600">
                Choose from beautiful pre-designed themes or create your own with custom colors and gradients.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-2xl border border-pink-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-6">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Export Options</h3>
              <p className="text-gray-600">
                Export your carousels as high-quality PNG, JPG, or PDF files. Perfect for social media and
                presentations.
              </p>
            </div>
          </div>

          {/* Preview Carousel Illustration */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">See It In Action</h3>
              <p className="text-lg text-gray-600">Here's what your carousels will look like</p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide">
                {[1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-80 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="h-full flex flex-col justify-between">
                      <div>
                        <h4 className="text-2xl font-bold mb-4">Slide {index}</h4>
                        <p className="text-blue-100 text-lg">
                          Beautiful carousel slide with custom content and professional design.
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full"></div>
                        <div>
                          <div className="text-sm font-semibold">Your Brand</div>
                          <div className="text-xs text-blue-200">Professional Content</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
