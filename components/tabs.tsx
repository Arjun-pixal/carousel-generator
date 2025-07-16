"use client"

interface TabsProps {
  tabs: string[]
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <nav className="flex space-x-2 p-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`relative px-8 py-4 text-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 ${
            activeTab === tab
              ? "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-lg"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          {tab}
          {activeTab === tab && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full"></div>
          )}
        </button>
      ))}
    </nav>
  )
}
