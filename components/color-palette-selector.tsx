"use client"

interface ColorPaletteSelectorProps {
  selectedPalette: number
  onPaletteSelect: (palette: number) => void
}

export default function ColorPaletteSelector({ selectedPalette, onPaletteSelect }: ColorPaletteSelectorProps) {
  const colorPalettes = [
    { colors: ["#8B5CF6", "#EC4899", "#F59E0B"], name: "Purple Sunset" },
    { colors: ["#3B82F6", "#10B981", "#F59E0B"], name: "Ocean Breeze" },
    { colors: ["#EF4444", "#F97316", "#FBBF24"], name: "Fire Glow" },
    { colors: ["#6366F1", "#8B5CF6", "#EC4899"], name: "Cosmic Purple" },
  ]

  return (
    <div className="grid grid-cols-4 gap-6 w-full min-w-0">
      {colorPalettes.map((palette, index) => (
        <button
          key={index}
          onClick={() => onPaletteSelect(index)}
          className={`group relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-110 ${
            selectedPalette === index
              ? "border-purple-600 shadow-xl ring-4 ring-purple-200"
              : "border-gray-200 hover:border-gray-300 hover:shadow-lg"
          }`}
          title={palette.name}
        >
          <div className="flex space-x-1 rounded-full overflow-hidden mb-3">
            {palette.colors.map((color, colorIndex) => (
              <div
                key={colorIndex}
                className="w-8 h-8 flex-1 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="text-xs text-gray-600 text-center font-medium truncate">{palette.name}</div>
          {selectedPalette === index && (
            <div className="absolute inset-0 bg-purple-600 bg-opacity-10 rounded-xl pointer-events-none"></div>
          )}
        </button>
      ))}
    </div>
  )
}
