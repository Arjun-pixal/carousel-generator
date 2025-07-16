"use client"

import type React from "react"

import { useState } from "react"
import { Upload } from "lucide-react"

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

interface SlideEditorProps {
  slide: Slide
  onUpdate: (updates: Partial<Slide>) => void
}

export default function SlideEditor({ slide, onUpdate }: SlideEditorProps) {
  const [showColorPicker, setShowColorPicker] = useState(false)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        onUpdate({ image: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const predefinedColors = ["#3B82F6", "#8B5CF6", "#EC4899", "#EF4444", "#F59E0B", "#10B981", "#6366F1", "#8B5A2B"]

  const predefinedGradients = [
    { from: "#3B82F6", to: "#8B5CF6", name: "Blue to Purple" },
    { from: "#EC4899", to: "#F59E0B", name: "Pink to Orange" },
    { from: "#10B981", to: "#3B82F6", name: "Green to Blue" },
    { from: "#8B5CF6", to: "#EC4899", name: "Purple to Pink" },
    { from: "#F59E0B", to: "#EF4444", name: "Orange to Red" },
    { from: "#6366F1", to: "#10B981", name: "Indigo to Green" },
  ]

  return (
    <div className="space-y-6">
      {/* Title Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={slide.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="Enter slide title"
        />
      </div>

      {/* Subtitle Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
        <textarea
          value={slide.subtitle}
          onChange={(e) => onUpdate({ subtitle: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
          placeholder="Enter slide subtitle"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
        <div className="relative">
          {slide.image ? (
            <div className="relative group">
              <img
                src={slide.image || "/placeholder.svg"}
                alt="Slide"
                className="w-full h-32 object-cover rounded-lg border border-gray-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <label className="cursor-pointer bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Change Image
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          )}
        </div>
      </div>

      {/* Background Options */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Background</label>

        {/* Background Type Toggle */}
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => onUpdate({ backgroundType: "solid" })}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              slide.backgroundType === "solid"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Solid Color
          </button>
          <button
            onClick={() => onUpdate({ backgroundType: "gradient" })}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              slide.backgroundType === "gradient"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Gradient
          </button>
        </div>

        {slide.backgroundType === "solid" ? (
          <div>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {predefinedColors.map((color) => (
                <button
                  key={color}
                  onClick={() => onUpdate({ backgroundColor: color })}
                  className={`w-12 h-12 rounded-lg border-2 transition-all duration-200 ${
                    slide.backgroundColor === color ? "border-gray-900 scale-110" : "border-gray-300 hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <input
              type="color"
              value={slide.backgroundColor}
              onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
              className="w-full h-12 rounded-lg border border-gray-300 cursor-pointer"
            />
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {predefinedGradients.map((gradient, index) => (
                <button
                  key={index}
                  onClick={() => onUpdate({ gradientFrom: gradient.from, gradientTo: gradient.to })}
                  className={`h-12 rounded-lg border-2 transition-all duration-200 ${
                    slide.gradientFrom === gradient.from && slide.gradientTo === gradient.to
                      ? "border-gray-900 scale-105"
                      : "border-gray-300 hover:scale-105"
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
                  }}
                  title={gradient.name}
                />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">From</label>
                <input
                  type="color"
                  value={slide.gradientFrom}
                  onChange={(e) => onUpdate({ gradientFrom: e.target.value })}
                  className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">To</label>
                <input
                  type="color"
                  value={slide.gradientTo}
                  onChange={(e) => onUpdate({ gradientTo: e.target.value })}
                  className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
