import QRCode from "qrcode"

export async function generateQRCode(text: string): Promise<string> {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(text, {
      width: 200,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    })
    return qrCodeDataUrl
  } catch (error) {
    console.error("Error generating QR code:", error)
    throw error
  }
}

