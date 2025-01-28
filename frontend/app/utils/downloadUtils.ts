export function triggerDownload(content: string, fileName: string, mimeType: string) {
  try {
    const blob = new Blob([content], { type: mimeType })

    if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
      // For IE
      ;(window.navigator as any).msSaveOrOpenBlob(blob, fileName)
    } else {
      // For other browsers
      const link = document.createElement("a")
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob)
        link.setAttribute("href", url)
        link.setAttribute("download", fileName)
        link.style.visibility = "hidden"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      } else {
        console.error("File download not supported")
      }
    }
  } catch (error) {
    console.error("Error triggering download:", error)
  }
}

export function downloadCSV(content: string, fileName: string) {
  triggerDownload("\ufeff" + content, fileName, "text/csv;charset=utf-8;")
}

export function downloadHTML(content: string, fileName: string) {
  triggerDownload(content, fileName, "text/html;charset=utf-8;")
}

