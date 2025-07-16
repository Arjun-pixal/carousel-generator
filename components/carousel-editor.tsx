"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Download, Move, Trash2 } from "lucide-react"
import SlideEditor from "@/components/slide-editor"
import CarouselPreview from "@/components/carousel-preview"
import ExportModal from "@/components/export-modal"

interface Slide {
  id: string
  title: string
  subtitle: string
  image: string | null
  backgroundColor: string
  backgroundType: "solid" | "gradient"
  gradientFrom: string
  gradientTo: string
}

interface CarouselEditorProps {
  onBackToHome: () => void
}

export default function CarouselEditor({ onBackToHome }: CarouselEditorProps) {
  const [slides, setSlides] = useState<Slide[]>([
    {
      id: "1",
      title: "Welcome to Your Carousel",
      subtitle: "Start creating amazing presentations",
      image: null,
      backgroundColor: "#3B82F6",
      backgroundType: "gradient",
      gradientFrom: "#3B82F6",
      gradientTo: "#8B5CF6",
    },
  ])
  const [activeSlideId, setActiveSlideId] = useState("1")
  const [showExportModal, setShowExportModal] = useState(false)

  const addSlide = () => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      title: "New Slide",
      subtitle: "Add your content here",
      image: null,
      backgroundColor: "#6366F1",
      backgroundType: "solid",
      gradientFrom: "#6366F1",
      gradientTo: "#8B5CF6",
    }
    setSlides([...slides, newSlide])
    setActiveSlideId(newSlide.id)
  }

  const updateSlide = (id: string, updates: Partial<Slide>) => {
    setSlides(slides.map((slide) => (slide.id === id ? { ...slide, ...updates } : slide)))
  }

  const deleteSlide = (id: string) => {
    if (slides.length > 1) {
      const newSlides = slides.filter((slide) => slide.id !== id)
      setSlides(newSlides)
      if (activeSlideId === id) {
        setActiveSlideId(newSlides[0].id)
      }
    }
  }

  const moveSlide = (fromIndex: number, toIndex: number) => {
    const newSlides = [...slides]
    const [movedSlide] = newSlides.splice(fromIndex, 1)
    newSlides.splice(toIndex, 0, movedSlide)
    setSlides(newSlides)
  }

  const activeSlide = slides.find((slide) => slide.id === activeSlideId) || slides[0]

  // Add dummy userProfile and designSettings for preview
  const dummyUserProfile = {
    name: "Alex Johnson",
    handle: "@alexjohnson",
    avatar: "/placeholder.svg",
  }
  const dummyDesignSettings = {
    backgroundElement: "dots",
    backgroundEnabled: true,
    colorPalette: 0,
    useCustomColors: false,
    customColors: ["#3B82F6", "#8B5CF6", "#EC4899"],
    fontSize: {
      title: "text-2xl",
      subtitle: "text-lg",
      content: "text-base",
    },
    fontFamily: "font-sans",
    slideLayout: "standard",
  }

  // Fix: CarouselPreview expects SlideData[], UserProfile, and DesignSettings.
  // But your slides array uses a different shape (with image, backgroundColor, etc).
  // You must map your Slide[] to SlideData[] for CarouselPreview.

  // Map slides to SlideData for CarouselPreview
  const slideData = slides.map((slide) => ({
    id: slide.id,
    title: slide.title,
    subtitle: slide.subtitle,
    content: "", // or use slide.image or other field if you want
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBackToHome}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Back to Home</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Carousel Editor
              </h1>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={addSlide}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Add Slide</span>
              </button>
              <button
                onClick={() => setShowExportModal(true)}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Slide List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Slides</h2>
                <span className="text-sm text-gray-500">{slides.length} slides</span>
              </div>

              <div className="space-y-3">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`relative group p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      activeSlideId === slide.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                    onClick={() => setActiveSlideId(slide.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-8 h-8 rounded-md flex-shrink-0"
                            style={{
                              background:
                                slide.backgroundType === "gradient"
                                  ? `linear-gradient(135deg, ${slide.gradientFrom}, ${slide.gradientTo})`
                                  : slide.backgroundColor,
                            }}
                          ></div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900 truncate">{slide.title}</p>
                            <p className="text-xs text-gray-500 truncate">{slide.subtitle}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            // Move slide logic would go here
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Move className="w-4 h-4" />
                        </button>
                        {slides.length > 1 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteSlide(slide.id)
                            }}
                            className="p-1 text-gray-400 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-lg opacity-0 transition-opacity">
                      {activeSlideId === slide.id && <div className="w-full h-full bg-blue-500 rounded-l-lg"></div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Editor */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Slide Editor */}
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold text-gray-900">Edit Slide</h2>
                </div>
                <div className="p-6">
                  <SlideEditor slide={activeSlide} onUpdate={(updates) => updateSlide(activeSlide.id, updates)} />
                </div>
              </div>

              {/* Preview */}
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
                </div>
                <div className="p-6">
                  <CarouselPreview
                    slides={slideData}
                    userProfile={dummyUserProfile}
                    designSettings={dummyDesignSettings}
                    isFullPreview={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && <ExportModal slides={slides} onClose={() => setShowExportModal(false)} />}
    </div>
  )
}
