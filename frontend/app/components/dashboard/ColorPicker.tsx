import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [inputColor, setInputColor] = useState(color)

  useEffect(() => {
    setInputColor(color)
  }, [color])

  const handleColorChange = (newColor: string) => {
    setInputColor(newColor)
    onChange(newColor)
  }

  return (
    <div className="flex items-center space-x-2">
      <Input
        type="color"
        value={inputColor}
        onChange={(e) => handleColorChange(e.target.value)}
        className="w-12 h-12 p-1 border-2 border-red-300 rounded-md cursor-pointer"
      />
      <Input
        type="text"
        value={inputColor}
        onChange={(e) => handleColorChange(e.target.value)}
        className="flex-grow border-red-300 focus:border-red-500 focus:ring-red-500"
      />
    </div>
  )
}

