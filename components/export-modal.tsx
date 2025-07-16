

"use client"

import { useState } from "react"
import { X, Download, FileImage, FileText } from "lucide-react"

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

interface ExportModalProps {
  slides: Slide[]
  onClose: () => void
}

export default function ExportModal({ slides, onClose }: ExportModalProps) {
  const [exportFormat, setExportFormat] = useState<"png" | "jpg" | "pdf">("png")
  const [exportQuality, setExportQuality] = useState<"standard" | "high" | "ultra">("high")
  const [exportSize, setExportSize] = useState<"1080x1080" | "1200x630" | "1920x1080">("1080x1080")
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)

    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real implementation, you would:
    // 1. Create canvas elements for each slide
    // 2. Render the slide content to canvas
    // 3. Convert to the selected format
    // 4. Download the files

    setIsExporting(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Export Carousel</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Format Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Format</h3>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setExportFormat("png")}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  exportFormat === "png"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <FileImage className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-sm font-medium text-gray-900">PNG</div>
                <div className="text-xs text-gray-500">High quality, transparent</div>
              </button>

              <button
                onClick={() => setExportFormat("jpg")}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  exportFormat === "jpg"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <FileImage className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-sm font-medium text-gray-900">JPG</div>
                <div className="text-xs text-gray-500">Smaller file size</div>
              </button>

              <button
                onClick={() => setExportFormat("pdf")}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  exportFormat === "pdf"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <FileText className="w-8 h-8 mx-auto mb-2 text-red-600" />
                <div className="text-sm font-medium text-gray-900">PDF</div>
                <div className="text-xs text-gray-500">Multi-page document</div>
              </button>
            </div>
          </div>

          {/* Quality Settings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality</h3>
            <div className="grid grid-cols-3 gap-4">
              {["standard", "high", "ultra"].map((quality) => (
                <button
                  key={quality}
                  onClick={() => setExportQuality(quality as any)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    exportQuality === quality
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="text-sm font-medium text-gray-900 capitalize">{quality}</div>
                  <div className="text-xs text-gray-500">
                    {quality === "standard" && "Good for web"}
                    {quality === "high" && "Best balance"}
                    {quality === "ultra" && "Maximum quality"}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Size Settings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dimensions</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { size: "1080x1080", label: "Square", desc: "Instagram, LinkedIn" },
                { size: "1200x630", label: "Landscape", desc: "Facebook, Twitter" },
                { size: "1920x1080", label: "Widescreen", desc: "Presentations" },
              ].map(({ size, label, desc }) => (
                <button
                  key={size}
                  onClick={() => setExportSize(size as any)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    exportSize === size
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="text-sm font-medium text-gray-900">{label}</div>
                  <div className="text-xs text-gray-500">{size}</div>
                  <div className="text-xs text-gray-400">{desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview ({slides.length} slides)</h3>
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-gray-200"
                  style={{
                    background:
                      slide.backgroundType === "gradient"
                        ? `linear-gradient(135deg, ${slide.gradientFrom}, ${slide.gradientTo})`
                        : slide.backgroundColor,
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center text-white text-xs font-medium">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50 rounded-b-2xl">
          <div className="text-sm text-gray-600">
            {slides.length} slide{slides.length !== 1 ? "s" : ""} • {exportFormat.toUpperCase()} • {exportQuality}{" "}
            quality
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export Carousel
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
