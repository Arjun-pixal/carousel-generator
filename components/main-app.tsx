"use client"

import { useState } from "react"
import Tabs from "@/components/tabs"
import ThemePanel from "@/components/theme-panel"
import CarouselCard from "@/components/carousel-card"
import TextSplitter from "@/components/text-splitter"
import { Download, Palette, Zap } from "lucide-react"


export default function MainApp() {
  const [activeTab, setActiveTab] = useState("Theme")
  const [selectedPalette, setSelectedPalette] = useState(0)
  const [backgroundElement, setBackgroundElement] = useState("Dots")
  const [backgroundEnabled, setBackgroundEnabled] = useState(true)
  const [useCustomColors, setUseCustomColors] = useState(false)
  const [slides, setSlides] = useState([
    {
      heading: "Transform Your LinkedIn Presence",
      subheading: "Create engaging carousel posts that drive real results",
      bodyText:
        "Stand out in the LinkedIn feed with professionally designed carousel posts. Our smart generator helps you create content that captures attention and drives meaningful engagement with your audience.",
      profileName: "Arjun V R",
      profileHandle: "@arjunvr",
    },
  ])
  const [currentSlide, setCurrentSlide] = useState(0)

  const tabs = ["Content", "Settings", "Theme", "Preview", "Download"]

  const handleContentGenerated = (content: { heading: string; subheading: string; bodyText: string }) => {
    setSlides((prev) => {
      const updated = [...prev]
      updated[currentSlide] = { ...updated[currentSlide], ...content }
      return updated
    })
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "Content":
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Content Generator</h2>

            {/* Text Splitter Section */}
            <div className="mb-10">
              <TextSplitter onContentGenerated={handleContentGenerated} />
            </div>

            {/* Manual Content Editing */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">Fine-tune Your Content</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3 text-gray-700">Heading</label>
                  <input
                    type="text"
                    value={slides[currentSlide].heading}
                    onChange={(e) =>
                      setSlides((prev) => {
                        const updated = [...prev]
                        updated[currentSlide] = { ...updated[currentSlide], heading: e.target.value }
                        return updated
                      })
                    }
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg"
                    placeholder="Enter your compelling heading"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-3 text-gray-700">Subheading</label>
                  <input
                    type="text"
                    value={slides[currentSlide].subheading}
                    onChange={(e) =>
                      setSlides((prev) => {
                        const updated = [...prev]
                        updated[currentSlide] = { ...updated[currentSlide], subheading: e.target.value }
                        return updated
                      })
                    }
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your subheading"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-3 text-gray-700">Body Text</label>
                  <textarea
                    value={slides[currentSlide].bodyText}
                    onChange={(e) =>
                      setSlides((prev) => {
                        const updated = [...prev]
                        updated[currentSlide] = { ...updated[currentSlide], bodyText: e.target.value }
                        return updated
                      })
                    }
                    rows={5}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your main content"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-3 text-gray-700">Profile Name</label>
                    <input
                      type="text"
                      value={slides[currentSlide].profileName}
                      onChange={(e) =>
                        setSlides((prev) => {
                          const updated = [...prev]
                          updated[currentSlide] = { ...updated[currentSlide], profileName: e.target.value }
                          return updated
                        })
                      }
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-3 text-gray-700">Profile Handle</label>
                    <input
                      type="text"
                      value={slides[currentSlide].profileHandle}
                      onChange={(e) =>
                        setSlides((prev) => {
                          const updated = [...prev]
                          updated[currentSlide] = { ...updated[currentSlide], profileHandle: e.target.value }
                          return updated
                        })
                      }
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="@yourhandle"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case "Settings":
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Export Settings</h2>
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                <h3 className="font-semibold mb-4 text-lg">Format Options</h3>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="format" value="png" className="mr-3 w-4 h-4" defaultChecked />
                    <span className="text-gray-700">PNG (High Quality, Transparent Background)</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="format" value="jpg" className="mr-3 w-4 h-4" />
                    <span className="text-gray-700">JPG (Smaller File Size)</span>
                  </label>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
                <h3 className="font-semibold mb-4 text-lg">Dimensions</h3>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                  <option>1080x1080 (LinkedIn Square)</option>
                  <option>1080x1350 (LinkedIn Portrait)</option>
                  <option>1200x630 (LinkedIn Article)</option>
                  <option>1024x1024 (Custom Square)</option>
                </select>
              </div>
            </div>
          </div>
        )
      case "Theme":
        return (
          <ThemePanel
            designSettings={{
              backgroundElement,
              backgroundEnabled,
              colorPalette: selectedPalette,
              useCustomColors,
              customColors: [],
              fontSize: { title: "", subtitle: "", content: "" },
              fontFamily: "",
              slideLayout: "",
            }}
            onSettingsChange={(settings) => {
              setBackgroundElement(settings.backgroundElement)
              setBackgroundEnabled(settings.backgroundEnabled)
              setSelectedPalette(settings.colorPalette)
              setUseCustomColors(settings.useCustomColors)
            }}
          />
        )
      case "Preview":
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Full Preview</h2>
            <div className="flex justify-center relative">
              <div className="w-full max-w-md">
                <CarouselCard
                  selectedPalette={selectedPalette}
                  backgroundElement={backgroundElement}
                  backgroundEnabled={backgroundEnabled}
                  content={slides[currentSlide]}
                  onContentChange={(newContent) => {
                    setSlides((prev) => {
                      const updated = [...prev]
                      updated[currentSlide] = { ...updated[currentSlide], ...newContent }
                      return updated
                    })
                  }}
                />
                {/* Show arrows if more than one slide */}
                {slides.length > 1 && (
                  <>
                    <button
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow transition"
                      onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                      aria-label="Previous Slide"
                    >
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M13 17l-5-5 5-5" />
                      </svg>
                    </button>
                    <button
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow transition"
                      onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                      aria-label="Next Slide"
                    >
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 7l5 5-5 5" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>
            {/* Optional: show slide indicators */}
            {slides.length > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                {slides.map((_, idx) => (
                  <span
                    key={idx}
                    className={`inline-block w-3 h-3 rounded-full ${
                      idx === currentSlide ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )
      case "Download":
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Download Your Carousel</h2>
            <div className="text-center space-y-8">
              <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 p-8 rounded-xl border border-purple-200">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Your Carousel is Ready!</h3>
                <p className="text-gray-600 mb-8 text-lg">
                  Download your professionally designed carousel and share it on LinkedIn to boost your engagement.
                </p>
                <button className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Download High-Quality Image
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Download className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">High Resolution</h4>
                  <p className="text-sm text-gray-600">Perfect quality for LinkedIn</p>
                </div>
                <div className="p-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Palette className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Professional Design</h4>
                  <p className="text-sm text-gray-600">Optimized for engagement</p>
                </div>
                <div className="p-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Instant Ready</h4>
                  <p className="text-sm text-gray-600">No watermarks or branding</p>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Carousel Generator
          </h1>
        </div>
      </header>

      {/* Sticky Tabs */}
      <div className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 p-6">
          {/* Left Panel - Tab Content */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">{renderTabContent()}</div>

          {/* Right Panel - Live Preview */}
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Live Preview</h3>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500 font-medium">Live Updates</span>
              </div>
            </div>
            <div className="flex justify-center relative">
              <div className="w-full max-w-md">
                <CarouselCard
                  selectedPalette={selectedPalette}
                  backgroundElement={backgroundElement}
                  backgroundEnabled={backgroundEnabled}
                  content={slides[currentSlide]}
                  onContentChange={(newContent) => {
                    setSlides((prev) => {
                      const updated = [...prev]
                      updated[currentSlide] = { ...updated[currentSlide], ...newContent }
                      return updated
                    })
                  }}
                />
                {/* Show arrows if more than one slide */}
                {slides.length > 1 && (
                  <>
                    <button
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow transition"
                      onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                      aria-label="Previous Slide"
                    >
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M13 17l-5-5 5-5" />
                      </svg>
                    </button>
                    <button
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow transition"
                      onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                      aria-label="Next Slide"
                    >
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 7l5 5-5 5" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>
            {/* Optional: show slide indicators */}
            {slides.length > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                {slides.map((_, idx) => (
                  <span
                    key={idx}
                    className={`inline-block w-3 h-3 rounded-full ${
                      idx === currentSlide ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
