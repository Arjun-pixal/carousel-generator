"use client"

import { useState } from "react"
import { Wand2, Sparkles, ArrowRight } from "lucide-react"

interface TextSplitterProps {
  onContentGenerated: (content: { heading: string; subheading: string; bodyText: string }) => void
}

export default function TextSplitter({ onContentGenerated }: TextSplitterProps) {
  const [inputText, setInputText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const generateCarousel = async () => {
    if (!inputText.trim()) return

    setIsGenerating(true)

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 1200))

    const content = smartTextSplit(inputText)
    onContentGenerated(content)

    setIsGenerating(false)
    setInputText("")
  }

  const smartTextSplit = (text: string) => {
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0)
    const lines = text.split("\n").filter((line) => line.trim().length > 0)

    // Extract heading - look for patterns that suggest a title
    let heading = ""
    const potentialHeadings = lines.filter(
      (line) =>
        line.length < 100 &&
        (line.includes(":") ||
          line.match(/^[A-Z]/) ||
          line.includes("**") ||
          line.includes("*") ||
          line.split(" ").length <= 8),
    )

    if (potentialHeadings.length > 0) {
      heading = potentialHeadings[0].replace(/[*:]/g, "").trim()
    } else if (sentences.length > 0) {
      heading = sentences[0].trim()
    }

    // Extract subheading - usually the next significant line or sentence
    let subheading = ""
    const remainingLines = lines.filter((line) => line !== potentialHeadings[0])
    if (remainingLines.length > 0) {
      subheading = remainingLines[0].trim()
    } else if (sentences.length > 1) {
      subheading = sentences[1].trim()
    }

    // Body text - everything else combined
    const usedText = [heading, subheading].join(" ")
    const bodyText = text.replace(usedText, "").trim()

    return {
      heading: heading || "Your Compelling Headline",
      subheading: subheading || "Engaging subheading that captures attention",
      bodyText: bodyText || "Your detailed content goes here with valuable insights and information.",
    }
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 p-8 rounded-xl border border-purple-200">
      <div className="flex items-center mb-6">
        <Wand2 className="w-7 h-7 text-purple-600 mr-3" />
        <h3 className="text-2xl font-bold text-gray-900">AI Content Generator</h3>
        <Sparkles className="w-5 h-5 text-yellow-500 ml-3 animate-pulse" />
      </div>

      <p className="text-gray-600 mb-6 text-lg">
        Enter a topic or paste your content below. Our AI will automatically structure it into a professional carousel
        format.
      </p>

      <div className="space-y-6">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter a topic for your carousel...

Examples:
• 5 Tips for Better LinkedIn Engagement
• How to Build a Personal Brand Online
• The Future of Remote Work in 2024

Or paste any existing content and we'll restructure it for maximum impact!"
          rows={8}
          className="w-full p-6 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none text-lg"
        />

        <button
          onClick={generateCarousel}
          disabled={!inputText.trim() || isGenerating}
          className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center ${
            !inputText.trim() || isGenerating
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 transform hover:scale-105 shadow-lg hover:shadow-xl"
          }`}
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
              Generating Your Carousel...
            </>
          ) : (
            <>
              Generate Carousel
              <ArrowRight className="w-5 h-5 ml-3" />
            </>
          )}
        </button>
      </div>

      {inputText.trim() && !isGenerating && (
        <div className="mt-6 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 mb-4 font-medium">Preview of generated structure:</p>
          <div className="space-y-3">
            <div>
              <span className="font-semibold text-purple-600">Heading:</span>{" "}
              <span className="text-gray-700">{smartTextSplit(inputText).heading}</span>
            </div>
            <div>
              <span className="font-semibold text-pink-600">Subheading:</span>{" "}
              <span className="text-gray-700">{smartTextSplit(inputText).subheading}</span>
            </div>
            <div>
              <span className="font-semibold text-blue-600">Body:</span>{" "}
              <span className="text-gray-700">{smartTextSplit(inputText).bodyText.substring(0, 120)}...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
