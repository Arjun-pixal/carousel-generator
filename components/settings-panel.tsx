"use client"

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

interface SettingsPanelProps {
  designSettings: DesignSettings
  onSettingsChange: (settings: DesignSettings) => void
}

export default function SettingsPanel({ designSettings, onSettingsChange }: SettingsPanelProps) {
  const updateSettings = (updates: Partial<DesignSettings>) => {
    onSettingsChange({ ...designSettings, ...updates })
  }

  const updateFontSize = (type: keyof DesignSettings["fontSize"], size: string) => {
    updateSettings({
      fontSize: {
        ...designSettings.fontSize,
        [type]: size,
      },
    })
  }

  const fontSizeOptions = [
    { value: "text-sm", label: "Small" },
    { value: "text-base", label: "Medium" },
    { value: "text-lg", label: "Large" },
    { value: "text-xl", label: "Extra Large" },
    { value: "text-2xl", label: "2X Large" },
    { value: "text-3xl", label: "3X Large" },
  ]

  const fontFamilyOptions = [
    { value: "font-sans", label: "Sans Serif" },
    { value: "font-serif", label: "Serif" },
    { value: "font-mono", label: "Monospace" },
    { value: "font-poppins", label: "Poppins" },
    // { value: "font-nunito", label: "Nunito" },
  ]

  const layoutOptions = [
    { value: "centered", label: "Centered" },
    { value: "standard", label: "Standard" },
    {value: "right-aligned", label:"Right Aligned"}
    // { value: "left-aligned", label: "Left Aligned" },
    // { value: "minimal", label: "Minimal" },
  ]

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-6">Settings</h3>

      <div className="space-y-6">
        {/* Slide Layout */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Slide Layout</label>
          <select
            value={designSettings.slideLayout}
            onChange={(e) => updateSettings({ slideLayout: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {layoutOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Font Family */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Font Family</label>
          <select
            value={designSettings.fontFamily}
            onChange={(e) => updateSettings({ fontFamily: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {fontFamilyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Font Sizes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Font Sizes</label>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
              <select
                value={designSettings.fontSize.title}
                onChange={(e) => updateFontSize("title", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {fontSizeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Subtitle</label>
              <select
                value={designSettings.fontSize.subtitle}
                onChange={(e) => updateFontSize("subtitle", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {fontSizeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Content</label>
              <select
                value={designSettings.fontSize.content}
                onChange={(e) => updateFontSize("content", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {fontSizeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
