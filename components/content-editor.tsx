"use client"

import { Plus, Trash2, User } from "lucide-react"
import { SlideData } from "./slide-types";

interface UserProfile {
  name: string
  handle: string
  avatar: string
}

interface ContentEditorProps {
  slides: SlideData[]
  onSlidesChange: (slides: SlideData[]) => void
  userProfile: UserProfile
  onUserProfileChange: (profile: UserProfile) => void
}

export default function ContentEditor({
  slides,
  onSlidesChange,
  userProfile,
  onUserProfileChange,
}: ContentEditorProps) {
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
    }
    onSlidesChange([...slides, newSlide])
  }

  const updateSlide = (id: string, field: keyof SlideData, value: string) => {
    const updatedSlides = slides.map((slide) => (slide.id === id ? { ...slide, [field]: value } : slide))
    onSlidesChange(updatedSlides)
  }

  const deleteSlide = (id: string) => {
    if (slides.length > 1) {
      onSlidesChange(slides.filter((slide) => slide.id !== id))
    }
  }

  const generateSlidesFromPrompt = (inputPrompt: string): SlideData[] => {
    // Split by newlines or sentences
    const lines = inputPrompt
      .split(/\n|[.!?]+/)
      .map(l => l.trim())
      .filter(l => l.length > 0);

    // Heading: first line
    const heading = lines[0] || "Your Carousel";
    // Subheading: second line, or fallback
    const subheading = lines[1] || "A comprehensive guide";

    // Content: rest of the lines
    const contentLines = lines.slice(2).filter(l => l.length > 10); // skip very short/waste lines

    // Title slide
    const titleSlide: SlideData = {
      id: "title",
      title: heading,
      subtitle: subheading,
      content: "",
      author: userProfile.name,
      handle: userProfile.handle,
      avatar: userProfile.avatar,
      visible: true,
    };

    // Content slides
    const contentSlides: SlideData[] = contentLines.map((line, idx) => ({
      id: `slide-${idx + 1}`,
      title: `Point ${idx + 1}`,
      subtitle: line.substring(0, 50) + (line.length > 50 ? "..." : ""),
      content: line,
      author: userProfile.name,
      handle: userProfile.handle,
      avatar: userProfile.avatar,
      visible: true,
    }));

    return [titleSlide, ...contentSlides];
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-6">Content Editor</h3>

      {/* User Profile Section */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center mb-4">
          <User className="w-5 h-5 mr-2 text-gray-600" />
          <h4 className="font-medium text-gray-900">Profile Information</h4>
        </div>
        <div className="space-y-4">
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
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      onUserProfileChange({
                        ...userProfile,
                        avatar: ev.target?.result as string,
                      });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={userProfile.name}
              onChange={(e) => onUserProfileChange({ ...userProfile, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Handle</label>
            <input
              type="text"
              value={userProfile.handle}
              onChange={(e) => onUserProfileChange({ ...userProfile, handle: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="@username"
            />
          </div>
        </div>
      </div>

      {/* Slides Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900">Slides ({slides.length})</h4>
          <button
            onClick={addSlide}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Slide
          </button>
        </div>

        {slides.map((slide, index) => (
          <div key={slide.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600">Slide {index + 1}</span>
              {slides.length > 1 && (
                <button
                  onClick={() => deleteSlide(slide.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={slide.title}
                  onChange={(e) => updateSlide(slide.id, "title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={slide.subtitle}
                  onChange={(e) => updateSlide(slide.id, "subtitle", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  value={slide.content}
                  onChange={(e) => updateSlide(slide.id, "content", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
