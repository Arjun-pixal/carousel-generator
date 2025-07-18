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

interface ThemePanelProps {
  designSettings: DesignSettings
  onSettingsChange: (settings: DesignSettings) => void
}

export default function ThemePanel({ designSettings, onSettingsChange }: ThemePanelProps) {
  const updateSettings = (updates: Partial<DesignSettings>) => {
    onSettingsChange({ ...designSettings, ...updates })
  }

  const backgroundElements = [
    { value: "dots", label: "Dots" },
    { value: "grid", label: "Grid" },
    { value: "waves", label: "Waves" },
    { value: "circles", label: "Circles" },
    { value: "triangles", label: "Triangles" },
    { value: "blobs", label: "Blobs" },
  ]

  const colorPalettes = [
    { name: "Indigo black White", colors: ["#6366F1", "#000000", "#F1F5F9"] },//1
    { name: "Rose Dark Purple", colors: ["#F43F5E", "#6B21A8", "#F8FAFC"] },//2
    { name: "Navy Teal Ice", colors: ["#0F172A", "#14B8A6", "#E0F2FE"] },//3
    { name: "Red Soft light", colors: ["#EF4444", "#FB7185", "#ADD8E6"] },//4
    { name: "Cool Gray Yellow", colors: ["#4B5563", "#9CA3AF", "#FEFCE8"] },//5
    { name: "Cyan Light", colors: ["#06B6D4", "#67E8F9", "#ECFEFF"] },//6
    { name: "Deep Navy Ice", colors: ["#0F172A", "#1E3A8A", "#ECFEFF"] },//7
    { name: "Blush Pastel", colors: ["#F43F5E", "#0F172A", "#FEF2F2"] },//8
    // { name: "Brown Gray Cream", colors: ["#78350F", "#D6D3D1", "#E7E5E4"] },//9
    { name: "Sky Indigo Blue", colors: ["#6366F1", "#60A5FA", "#DBEAFE"] },//10
    { name: "Red Deep Blush", colors: ["#B91C1C", "#991B1B", "#FEE2E2"] },//11
    { name: "Slate Blue Mist", colors: ["#1E293B", "#3B82F6", "#E0F2FE"] },//12
    { name: "Amber Emerald Light", colors: ["#F59E0B", "#10B981", "#FEFCE8"] },//13
    { name: "Emerald Amber Cream", colors: ["#10B981", "#F59E0B", "#FEF3C7"] },//14
    { name: "Burgundy Crimson Rose", colors: ["#7C2D12", "#BE185D", "#FECACA"] },//15
    // { name: "Warm Brown Yellow", colors: ["#78350F", "#92400E", "#FDE68A"] },//16
    { name: "Sky Blue Tint", colors: ["#1E3A8A", "#3B82F6", "#DBEAFE"] },//17
    { name: "Crimson Amber Cream", colors: ["#BE185D", "#F59E0B", "#FEF3C7"] },//18
    { name: "Soft Red Tones", colors: ["#B91C1C", "#DC2626", "#FCA5A5"] },//19
    { name: "Purple Violet Light", colors: ["#4C1D95", "#7C3AED", "#DDD6FE"] },//20
    { name: "Burnt Orange Light", colors: ["#78350F", "#92400E", "#FDE68A"] },//21
    { name: "Red Navy Mist", colors: ["#B91C1C", "#0F172A", "#E2E8F0"] },//22
    { name: "Violet Purple Lilac", colors: ["#9333EA", "#8B5CF6", "#E9D5FF"] },//23
    // { name: "Golden Brown Pale", colors: ["#7C2D12", "#A16207", "#FDE68A"] },//24
  ];



  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-6">Theme</h3>

      <div className="space-y-6">
        {/* Background Design Elements */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Background Design Elements</label>
          <div className="flex items-center space-x-4 mb-3">
            <select
              value={designSettings.backgroundElement}
              onChange={(e) => updateSettings({ backgroundElement: e.target.value })}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {backgroundElements.map((element) => (
                <option key={element.value} value={element.value}>
                  {element.label}
                </option>
              ))}
            </select>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={designSettings.backgroundEnabled}
                onChange={(e) => updateSettings({ backgroundEnabled: e.target.checked })}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Enable</span>
            </label>
          </div>
        </div>

        {/* Color Palette */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700">Color Palette</label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={designSettings.useCustomColors}
                onChange={(e) => updateSettings({ useCustomColors: e.target.checked })}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Custom Colors</span>
            </label>
          </div>
          {!designSettings.useCustomColors ? (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
    {colorPalettes.map((palette, idx) => (
      <button
        key={palette.name}
        onClick={() => updateSettings({ colorPalette: idx })}
        className={
          "relative p-1 border flex items-center w-full h-10 shadow-sm transition rounded " +
          (designSettings.colorPalette === idx
            ? "border-blue-500 ring-2 ring-blue-200 shadow-lg"
            : "border-gray-200 bg-gray-200 hover:border-blue-300")
        }
      >
        <div className="flex w-full h-6 overflow-hidden rounded">
          {palette.colors.map((color, i) => (
            <div
              key={i}
              className="flex-1 h-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </button>
    ))}
  </div>
) : (
  <div className="space-y-4">
    <div className="flex flex-wrap gap-4">
      {designSettings.customColors.map((color, index) => {
        const labels = ["Primary", "Secondary", "Accent"]

        return (
          <div key={index} className="flex items-start gap-2 w-full sm:w-auto">
            <div className="flex flex-col items-start space-y-1">
              <label className="text-sm text-gray-700 font-medium">
                {labels[index] || `Color ${index + 1}`}
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => {
                    const newColors = [...designSettings.customColors]
                    newColors[index] = e.target.value
                    updateSettings({ customColors: newColors })
                  }}
                  className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={color}
                  readOnly
                  className="w-24 px-2 py-1 text-sm border border-gray-300 rounded bg-gray-50 text-gray-800"
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  </div>
)}


        </div>
      </div>
    </div>
  )
}
