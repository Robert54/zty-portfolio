'use client'

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const DownloadButtons = () => {
  const handleDownloadCV = (type) => {
    const link = document.createElement('a')
    
    if (type === 'ml') {
      link.href = 'https://drive.google.com/uc?export=download&id=1xdgWKS9uXmJwZacuutRQmtpXReTUKK5L'
      link.download = 'Tingyu_Zhang_ML_CV.pdf'
    } else {
      // link.href = 'https://drive.google.com/file/d/1q7ZIWir097x8XJhskl3S0BBtwOxuFtH9/view?usp=drive_link'
      // link.download = 'Tingyu_Zhang_FullStack_CV.pdf'
      link.href = 'https://drive.google.com/uc?export=download&id=1HqsDxIpKnOsYpMUk7PGGOv2mmhEpI4ID'
      link.download = 'Tingyu_Zhang_Resume.pdf'
    }

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex flex-col w-full gap-4">
      {/* <Button
        variant="outline"
        className="w-full uppercase flex items-center justify-center gap-2 h-11"
        onClick={() => handleDownloadCV('ml')}
      >
        <span>Machine Learning CV</span>
        <Download className="h-5 w-5" />
      </Button> */}
      <Button
        variant="outline"
        className="w-full uppercase flex items-center justify-center gap-2 h-11"
        onClick={() => handleDownloadCV('fullstack')}
      >
        <span>Resume</span>
        <Download className="h-5 w-5" />
      </Button>
    </div>
  )
}

export default DownloadButtons
