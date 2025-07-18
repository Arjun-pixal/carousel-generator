"use client"

import { useState, useRef, useEffect } from "react"
import { Wand2, Download, Eye, Settings, Palette, FileText, Menu, X } from "lucide-react"
import ContentEditor from "@/components/content-editor"
import SettingsPanel from "@/components/settings-panel"
import ThemePanel from "@/components/theme-panel"
import CarouselPreview from "@/components/carousel-preview"
import CarouselCard from "@/components/carousel-card"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import type { SlideData } from "./slide-types";


interface UserProfile {
  name: string
  handle: string
  avatar: string
}

interface DesignSettings {
  backgroundElement: string
  backgroundEnabled: boolean
  colorPalette: number
  useCustomColors: boolean
  customColors: string[]
  fontSize: {
    title: string
    subtitle: string
    content: string
  }
  fontFamily: string
  slideLayout: string
}

export default function CarouselGenerator() {
  // 1. All hooks at the top, always called in the same order
  const [isReady, setIsReady] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [activeTab, setActiveTab] = useState("Content");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "",
    handle: "",
    avatar: "",
  });
  const [designSettings, setDesignSettings] = useState<DesignSettings>({
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
    slideLayout: "centered",
  });
  const pdfSlidesRef = useRef<HTMLDivElement>(null);

  // 2. Only load data and render UI after client-side hydration
  useEffect(() => {
    // This runs only on the client
    const savedSlides = localStorage.getItem("carouselSlides");
    if (savedSlides) setSlides(JSON.parse(savedSlides));
    const savedProfile = localStorage.getItem("carouselUserProfile");
    if (savedProfile) setUserProfile(JSON.parse(savedProfile));
    const savedSettings = localStorage.getItem("carouselDesignSettings");
    if (savedSettings) setDesignSettings(JSON.parse(savedSettings));
    setIsReady(true);
  }, []);

  // 3. Save to localStorage on change
  useEffect(() => {
    if (!isReady) return;
    localStorage.setItem("carouselSlides", JSON.stringify(slides));
  }, [slides, isReady]);
  useEffect(() => {
    if (!isReady) return;
    localStorage.setItem("carouselUserProfile", JSON.stringify(userProfile));
  }, [userProfile, isReady]);
  useEffect(() => {
    if (!isReady) return;
    localStorage.setItem("carouselDesignSettings", JSON.stringify(designSettings));
  }, [designSettings, isReady]);

  // Generate a new slide from the prompt and append it
  const generateCarousel = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate async
    // Generate a short description for the subtitle
    let subtitle = "";
    const words = prompt.trim().split(/\s+/);
    if (words.length > 8) {
      subtitle = words.slice(0, 16).join(" ") + (words.length > 16 ? "..." : "");
    } else if (words.length > 0) {
      subtitle = prompt;
    } else {
      subtitle = "A new carousel slide";
    }
    const newSlide: SlideData = {
      id: `slide-${Date.now()}`,
      title: prompt.split(" ").slice(0, 8).join(" "), // Bold title from prompt
      subtitle,
      content: `This slide is about: ${prompt}`,
      author: userProfile.name,
      handle: userProfile.handle,
      avatar: userProfile.avatar,
      visible: true,
      // Optionally, you can add a background field if your SlideData supports it
      // background: getBackgroundForPrompt(prompt),
    };
    setSlides((prev) => {
      const updated = [...prev, newSlide];
      setSelectedSlideIndex(updated.length - 1); // Select the new slide
      return updated;
    });
    setPrompt("");
    setIsGenerating(false);
  };

  // Navigation handlers
  const goToPrevSlide = () => {
    setSelectedSlideIndex((idx) => (idx > 0 ? idx - 1 : idx));
  };
  const goToNextSlide = () => {
    setSelectedSlideIndex((idx) => (idx < slides.length - 1 ? idx + 1 : idx));
  };
  const goToSlide = (idx: number) => {
    console.log('goToSlide called with idx:', idx);
    setSelectedSlideIndex(idx);
  };

  const generateSlidesFromPrompt = (inputPrompt: string): SlideData[] => {
    // Clean and split prompt
    const trimmed = inputPrompt.trim();
    if (!trimmed) {
      return [
        {
          id: "slide-1",
          title: "Create Carousel",
          subtitle: "",
          content: "",
          author: userProfile.name,
          handle: userProfile.handle,
          avatar: userProfile.avatar,
          visible: true,
        },
      ];
    }
    // Split into words
    const words = trimmed.split(/\s+/);
    if (words.length <= 3) {
      // Short prompt: use as subheading
      return [
        {
          id: "slide-1",
          title: "Create Carousel",
          subtitle: trimmed,
          content: "",
          author: userProfile.name,
          handle: userProfile.handle,
          avatar: userProfile.avatar,
          visible: true,
        },
      ];
    }
    // Longer prompt: intelligently split
    // Heading: first 5-8 words
    const headingWords = words.slice(0, Math.min(8, Math.max(5, words.length)));
    const heading = headingWords.join(" ");
    // Subheading: next 8-15 words
    const subheadingStart = headingWords.length;
    const subheadingEnd = subheadingStart + Math.min(15, Math.max(8, words.length - subheadingStart));
    const subheadingWords = words.slice(subheadingStart, subheadingEnd);
    const subheading = subheadingWords.join(" ");
    // Content: rest
    const contentWords = words.slice(subheadingEnd);
    const content = contentWords.join(" ");
    return [
      {
        id: "slide-1",
        title: heading,
        subtitle: subheading,
        content: content,
        author: userProfile.name,
        handle: userProfile.handle,
        avatar: userProfile.avatar,
        visible: true,
      },
    ];
  };

  const tabs = [
    { id: "Content", icon: FileText, label: "Content" },
    { id: "Settings", icon: Settings, label: "Settings" },
    { id: "Theme", icon: Palette, label: "Theme" },
    // { id: "Preview", icon: Eye, label: "Preview" },
    { id: "Export", icon: Download, label: "Export" },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "Content":
        return (
          <ContentEditor
            slides={slides}
            onSlidesChange={setSlides}
            userProfile={userProfile}
            onUserProfileChange={setUserProfile}
          />
        )
      case "Settings":
        return <SettingsPanel designSettings={designSettings} onSettingsChange={setDesignSettings} />
      case "Theme":
        return <ThemePanel designSettings={designSettings} onSettingsChange={setDesignSettings} />
      case "Preview":
        return (
          <div className="flex justify-center items-center min-h-[520px]">
            <div className="w-full max-w-md">
              <CarouselPreview
                slides={slides}
                userProfile={userProfile}
                designSettings={designSettings}
                isFullPreview={true}
                // Show arrows for navigation in preview if more than one slide
                showArrows={slides.length > 1}
              />
            </div>
          </div>
        )
      case "Export":
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <button
              className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold"
              onClick={handleDownloadPDF}
            >
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </button>
            <p className="mt-4 text-gray-500 text-center">Download your carousel as a high-quality PDF.</p>
          </div>
        )
      default:
        return null
    }
  }

  async function handleDownloadPDF() {
    if (!slides.length) return;
    // Render each slide as an image and add to PDF
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [1080, 1080],
    });
    const slideNodes = pdfSlidesRef.current?.querySelectorAll(".pdf-slide");
    if (!slideNodes || slideNodes.length === 0) return;

    for (let i = 0; i < slideNodes.length; i++) {
      const node = slideNodes[i] as HTMLElement;
      // eslint-disable-next-line no-await-in-loop
      const canvas = await html2canvas(node, { background: "#fff", scale: 2, width: 1080, height: 1080 } as any);
      const imgData = canvas.toDataURL("image/png");
      if (i > 0) pdf.addPage([1080, 1080], "landscape");
      pdf.addImage(imgData, "PNG", 0, 0, 1080, 1080);
    }
    pdf.save("carousel.pdf");
  }

  // Handler for updating a field of the selected slide
  const updateSelectedSlide = (field: keyof SlideData, value: string) => {
    setSlides((prev) =>
      prev.map((slide, idx) =>
        idx === selectedSlideIndex ? { ...slide, [field]: value } : slide
      )
    );
  };

  // Handler for toggling visibility
  const toggleSlideVisibility = (idx: number) => {
    setSlides((prev) =>
      prev.map((slide, i) =>
        i === idx ? { ...slide, visible: !slide.visible } : slide
      )
    );
  };

  // Handler for deleting a slide
  const deleteSlide = (idx: number) => {
    if (slides.length <= 1) return;
    setSlides((prev) => {
      const newSlides = prev.filter((_, i) => i !== idx);
      // Adjust selected index if needed
      if (selectedSlideIndex >= newSlides.length) {
        setSelectedSlideIndex(newSlides.length - 1);
      }
      return newSlides;
    });
  };

  // Handler for adding a new slide
  const addSlide = () => {
    const newSlide: SlideData = {
      id: `slide-${Date.now()}`,
      title: "New Slide",
      subtitle: "Add your subtitle here",
      content: "Add your content here",
      author: userProfile.name,
      handle: userProfile.handle,
      avatar: userProfile.avatar,
      visible: true,
    };
    setSlides((prev) => {
      const updated = [...prev, newSlide];
      setSelectedSlideIndex(updated.length - 1); // select the new slide
      return updated;
    });
  };

  // 4. Do not render any UI until isReady is true
  if (!isReady) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Carousel Generator
              </h1>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Desktop download button */}
            {/* <button
              className="hidden lg:flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              onClick={handleDownloadPDF}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </button> */}
          </div>
        </div>
      </header>

      {/* Prompt Section */}
      <section className="bg-white border-b">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Generate Your Carousel</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enter a topic or paste your content below and we'll create a beautiful carousel presentation for you.
            </p>
          </div> */}

          <div className="max-w-xl mx-auto relative">
            {/* Overlay spinner when generating */}
            {isGenerating && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 rounded-xl animate-fadeIn">
                <svg className="w-10 h-10 animate-spin text-blue-500 mb-2" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <span className="text-blue-700 font-bold text-lg animate-pulse">Generating Carousel...</span>
              </div>
            )}
            <form
              className={`flex items-center bg-blue-50 border-2 border-blue-200 rounded-xl px-3 py-1.5 shadow-sm transition-all duration-300 focus-within:shadow-lg hover:shadow-lg relative overflow-hidden ${isGenerating ? 'pointer-events-none' : ''}`}
              onSubmit={e => { e.preventDefault(); generateCarousel(); }}
            >
              {/* Shimmer effect */}
              {isGenerating && (
                <div className="absolute inset-0 z-10 pointer-events-none">
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-100 to-transparent animate-shimmer" style={{backgroundSize:'200% 100%'}}></div>
                </div>
              )}
              <span className="mr-3 flex items-center">
                <span className={`w-4 h-4 rounded-full border-2 border-blue-300 bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center ${isGenerating ? 'animate-ping' : 'animate-pulse'}`}></span>
              </span>
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter a topic for your carousel..."
                className={`flex-1 border-none outline-none text-base bg-transparent focus:ring-0 focus:outline-none transition-all duration-200 placeholder-gray-500 ${isGenerating ? 'bg-blue-100 animate-pulse' : ''}`}
                disabled={isGenerating}
              />
              <button
                type="submit"
                disabled={!prompt.trim() || isGenerating}
                className={`ml-3 px-4 py-2 rounded-lg font-bold text-white uppercase tracking-wide flex items-center justify-center whitespace-nowrap shadow-md transition-all duration-200 relative overflow-hidden ${!prompt.trim() || isGenerating
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "button-wave-bg hover:scale-105 focus:scale-105 animate-floatSoft"
                  }`}
                style={!prompt.trim() || isGenerating ? {} : {}}
              >
                {isGenerating ? (
                  <svg className="w-5 h-5 mr-2 animate-spin text-blue-500" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                ) : (
                  <Wand2 className="w-5 h-5 mr-2" />
                )}
                {isGenerating ? 'Generating...' : 'Generate Carousel'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full px-2 sm:px-4 lg:px-8 py-4 flex flex-col animate-fadeIn animate-floatSoft">
        {/* Side-by-side main area, responsive */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full min-h-[500px]">
          {/* Live Preview (left, slightly smaller) */}
          <div className="w-full md:flex-[0.9] min-h-[300px] md:min-h-[600px] h-auto md:h-[650px] bg-white rounded-xl shadow-md p-2 md:p-6 flex flex-col justify-between mb-4 md:mb-0 transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Live Preview</h3>
            {(() => { console.log('Live Preview selectedSlideIndex:', selectedSlideIndex, 'slide:', slides[selectedSlideIndex]); return null })()}
            {slides.length > 0 ? (
              <>
                <CarouselPreview
                  slides={[slides[selectedSlideIndex]]}
                  userProfile={userProfile}
                  designSettings={designSettings}
                  isFullPreview={true}
                />
                {/* Navigation controls */}
                <div className="flex items-center justify-center gap-2 md:gap-4 mt-4">
                  <button onClick={goToPrevSlide} disabled={selectedSlideIndex === 0} className="px-2 md:px-3 py-1 rounded bg-gray-200 disabled:opacity-50">Prev</button>
                  <div className="flex gap-1">
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => goToSlide(idx)}
                        className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${selectedSlideIndex === idx ? 'bg-blue-500' : 'bg-gray-300'}`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                  <button onClick={goToNextSlide} disabled={selectedSlideIndex === slides.length - 1} className="px-2 md:px-3 py-1 rounded bg-gray-200 disabled:opacity-50">Next</button>
                </div>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center text-gray-400">No slides</div>
            )}
          </div>
          {/* Tabbed Controls (right, slightly larger, scrollable) */}
          <div className="w-full md:flex-[1.1] min-h-[300px] md:min-h-[600px] h-auto md:h-[650px] bg-white rounded-xl shadow-md p-0 flex flex-col overflow-auto transition-all duration-300">
            {/* Tabs */}
            <div className="border-b px-6 pt-6 bg-white rounded-t-2xl">
              <nav className="flex space-x-1 p-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
            {/* Tab Content */}
            <div className="flex-1 p-8 overflow-y-auto animate-fadeIn">
              {activeTab === "Content" && slides.length > 0 && (
                <>
                  {/* Profile Editing Section */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
                    <div className="flex items-center space-x-4 mb-2">
                      <label className="relative cursor-pointer">
                        <img
                          src={userProfile.avatar}
                          alt="Profile"
                          className="w-16 h-16 rounded-full object-cover border"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={async e => {
                            const file = e.target.files?.[0];
                            if (file) {
                              try {
                                const resized = await resizeImage(file, 96); // 96px max
                                setUserProfile({
                                  ...userProfile,
                                  avatar: resized,
                                });
                              } catch (err: any) {
                                alert(err.message || "Failed to process image.");
                              }
                            }
                          }}
                        />
                      </label>
                    </div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={userProfile.name}
                      onChange={e => setUserProfile({ ...userProfile, name: e.target.value })}
                      className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <label className="block text-sm font-medium text-gray-700 mb-1">Profile ID</label>
                    <input
                      type="text"
                      value={userProfile.handle}
                      onChange={e => setUserProfile({ ...userProfile, handle: e.target.value })}
                      className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="@username"
                    />
                  </div>
                  {/* Slide Editing Section */}
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={slides[selectedSlideIndex].title}
                    onChange={e => updateSelectedSlide("title", e.target.value)}
                    className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={slides[selectedSlideIndex].subtitle}
                    onChange={e => updateSelectedSlide("subtitle", e.target.value)}
                    className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea
                    value={slides[selectedSlideIndex].content}
                    onChange={e => updateSelectedSlide("content", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </>
              )}
              {activeTab === "Settings" && (
                <SettingsPanel designSettings={designSettings} onSettingsChange={setDesignSettings} />
              )}
              {activeTab === "Theme" && (
                <ThemePanel designSettings={designSettings} onSettingsChange={setDesignSettings} />
              )}
              {activeTab === "Export" && (
                <div className="flex flex-col items-center justify-center min-h-[300px]">
                  <button
                    className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold"
                    onClick={handleDownloadPDF}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download PDF
                  </button>
                  <p className="mt-4 text-gray-500 text-center">Download your carousel as a high-quality PDF.</p>
                </div>
              )}
            </div>
          </div>

        </div>
        {/* Vertical Thumbnail Preview Bar (below both panels) */}
        <div className="mt-4 w-full relative">
          <div className="relative flex items-center">
            {/* Thumbnails Scroll Row */}
            <div
              id="thumb-scroll-vertical"
              className="flex flex-row items-end space-x-3 overflow-x-auto scrollbar-hide rounded-xl p-2 md:p-4 shadow-md min-w-[320px] md:min-w-[900px] w-full"
              style={{ scrollBehavior: 'smooth' }}
            >
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`relative flex-shrink-0 w-40 h-40 md:w-34 md:h-44 rounded-xl border flex flex-col items-center justify-between p-2 bg-white shadow group cursor-pointer transition-all duration-200 hover:scale-105 animate-fadeIn animate-floatSoft ${index === selectedSlideIndex ? 'ring-2 ring-blue-500 border-blue-500 shadow-lg' : 'border-gray-200'} ${!slide.visible ? 'opacity-60' : ''}`}
                  style={{ aspectRatio: '9/16', minWidth: 80, maxWidth: 120, background: (slide as any).background ? `${(slide as any).background}11` : '#f3f4f6' }}
                  onClick={() => goToSlide(index)}
                >
                  {/* Top-right icons */}
                  <div className="absolute top-1 right-1 flex flex-col space-y-1 z-10">
                    <button
                      className="text-gray-400 hover:text-blue-500 transition bg-white/80 rounded-full p-0.5"
                      onClick={e => { e.stopPropagation(); toggleSlideVisibility(index); }}
                      title={slide.visible ? 'Hide slide' : 'Show slide'}
                      tabIndex={-1}
                    >
                      {slide.visible ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.269-2.943-9.543-7a9.96 9.96 0 012.181-3.307M9.88 9.88A3 3 0 0014.12 14.12M3 3l18 18" /></svg>
                      )}
                    </button>
                    {slides.length > 1 && (
                      <button
                        className="text-gray-400 hover:text-red-600 transition bg-white/80 rounded-full p-0.5"
                        onClick={e => { e.stopPropagation(); deleteSlide(index); }}
                        title="Delete slide"
                        tabIndex={-1}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 3h4a1 1 0 011 1v1H9V4a1 1 0 011-1z" /></svg>
                      </button>
                    )}
                  </div>
                  {/* Mini Slide Preview Content */}
                  <div className="flex flex-col items-center justify-center w-full h-full px-1 py-1">
                    <div className="w-full flex-1 flex flex-col justify-center items-center overflow-hidden">
                      <div className="text-[10px] md:text-xs font-bold text-blue-700 truncate w-full text-center mb-0.5">{slide.title || `Slide ${index + 1}`}</div>
                      <div className="text-[9px] md:text-xs text-gray-500 truncate w-full text-center mb-0.5">{slide.subtitle}</div>
                      <div className="text-[9px] text-gray-700 line-clamp-2 w-full text-center mb-0.5">{slide.content}</div>
                    </div>
                    <div className="flex items-center justify-center mt-auto w-full pt-1">
                      <img
                        src={slide.avatar}
                        alt={slide.author}
                        className="w-5 h-5 rounded-full border-2 border-blue-200 object-cover mr-1"
                      />
                      <span className="text-[9px] text-gray-700 font-medium truncate">{slide.author || ''}</span>
                    </div>
                  </div>
                </div>
              ))}
              {/* Add new slide card */}
              <button
                className="flex-shrink-0 w-40 h-40 md:w-44 md:h-44 flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-xl bg-blue-50 hover:bg-blue-100 transition group focus:outline-none hover:scale-105"
                onClick={addSlide}
                title="Add new slide"
                style={{ aspectRatio: '9/16', minWidth: 80, maxWidth: 120 }}
              >
                <span className="text-2xl md:text-3xl text-blue-400 group-hover:text-blue-600">+</span>
                <span className="mt-1 text-xs md:text-sm text-blue-500 font-medium">Add Slide</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden PDF slides for export */}
      <div ref={pdfSlidesRef} style={{ position: "absolute", left: "-9999px", top: 0, width: 1080, zIndex: -1 }}>
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className="pdf-slide"
            style={{
              width: 1080,
              height: 1080,
              background: "#fff",
              display: "flex",
              alignItems: "stretch",
              justifyContent: "stretch",
              padding: 0,
              margin: 0,
              boxSizing: "border-box",
            }}
          >
            <CarouselPreview
              slides={[slide]}
              userProfile={userProfile}
              designSettings={designSettings}
              isFullPreview={true}
              forceFullSize={true}
            />
          </div>
        ))}
      </div>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent>
          <DialogTitle className="sr-only">Full Carousel Preview</DialogTitle>
          <CarouselPreview
            slides={slides}
            userProfile={userProfile}
            designSettings={designSettings}
            isFullPreview={true}
          />
          <button onClick={handleDownloadPDF} className="btn btn-success mt-4">Download as PDF</button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function resizeImage(file: File, maxSize = 96): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const reader = new FileReader();
    reader.onload = (e) => {
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Could not get canvas context"));
        ctx.drawImage(img, 0, 0, width, height);
        // Lower quality for smaller size
        const dataUrl = canvas.toDataURL("image/jpeg", 0.5);
        // Check size (100KB limit)
        const sizeKB = Math.round((dataUrl.length * 3) / 4 / 1024);
        if (sizeKB > 100) {
          return reject(new Error("Image is too large after resizing. Please choose a smaller image."));
        }
        resolve(dataUrl);
      };
      img.onerror = reject;
      if (e.target && typeof e.target.result === "string") {
        img.src = e.target.result;
      } else {
        reject(new Error("Invalid image data"));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
