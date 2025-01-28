import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

interface ThankYouTemplatesProps {
  templates: string[]
  onUpdate: (templates: string[]) => void
}

export function ThankYouTemplates({ templates, onUpdate }: ThankYouTemplatesProps) {
  const [newTemplate, setNewTemplate] = useState("")

  const handleAddTemplate = () => {
    if (newTemplate.trim()) {
      onUpdate([...templates, newTemplate.trim()])
      setNewTemplate("")
    }
  }

  const handleDeleteTemplate = (index: number) => {
    const updatedTemplates = templates.filter((_, i) => i !== index)
    onUpdate(updatedTemplates)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thank You Templates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {templates.map((template, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Textarea value={template} readOnly className="flex-grow" />
              <Button variant="destructive" onClick={() => handleDeleteTemplate(index)}>
                Delete
              </Button>
            </div>
          ))}
          <div className="space-y-2">
            <Label htmlFor="newTemplate">New Template</Label>
            <Textarea
              id="newTemplate"
              value={newTemplate}
              onChange={(e) => setNewTemplate(e.target.value)}
              placeholder="Enter your thank you message template here..."
            />
          </div>
          <Button onClick={handleAddTemplate}>Add Template</Button>
        </div>
      </CardContent>
    </Card>
  )
}

