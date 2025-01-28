import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ColorPicker } from "./ColorPicker"
import Image from "next/image"
import { toast } from "@/components/ui/use-toast"

interface CustomBrandingProps {
  branding: {
    logo: string
    primaryColor: string
    secondaryColor: string
  }
  onUpdate: (branding: { logo: string; primaryColor: string; secondaryColor: string }) => void
}

export function CustomBranding({ branding, onUpdate }: CustomBrandingProps) {
  const [logo, setLogo] = useState(branding.logo)
  const [primaryColor, setPrimaryColor] = useState(branding.primaryColor)
  const [secondaryColor, setSecondaryColor] = useState(branding.secondaryColor)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setPrimaryColor(branding.primaryColor)
    setSecondaryColor(branding.secondaryColor)
  }, [branding.primaryColor, branding.secondaryColor])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate({ logo, primaryColor, secondaryColor })
    toast({
      title: "Branding Updated",
      description: "Your custom branding has been successfully updated.",
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB.",
          variant: "destructive",
        })
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setLogo(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-red-800">Custom Branding</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="logo" className="text-lg font-medium text-red-800">
              Logo
            </Label>
            <div className="flex items-center space-x-4">
              <div className="relative w-32 h-32 rounded-full overflow-hidden bg-red-100 border-4 border-red-300">
                {logo ? (
                  <Image src={logo || "/placeholder.svg"} alt="Uploaded logo" layout="fill" objectFit="cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-red-400">No logo</div>
                )}
              </div>
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="bg-white hover:bg-red-50 text-red-600 border-red-300"
              >
                Upload Image
              </Button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-lg font-medium text-red-800">Primary Color</Label>
            <ColorPicker color={primaryColor} onChange={setPrimaryColor} />
          </div>
          <div className="space-y-2">
            <Label className="text-lg font-medium text-red-800">Secondary Color</Label>
            <ColorPicker color={secondaryColor} onChange={setSecondaryColor} />
          </div>
          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
            Update Branding
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

