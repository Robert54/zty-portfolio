// components/DownloadButtons.jsx
'use client';

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const DownloadButtons = () => {
  const handleDownloadCV = (type) => {
    // Create a link element
    const link = document.createElement('a');
    
    // Set the appropriate URL based on CV type
    if (type === 'ml') {
      link.href = 'https://drive.google.com/file/d/1xdgWKS9uXmJwZacuutRQmtpXReTUKK5L/view?usp=sharing';
      link.download = 'Tingyu_Zhang_ML_CV.pdf';
    } else {
      link.href = 'https://drive.google.com/file/d/1q7ZIWir097x8XJhskl3S0BBtwOxuFtH9/view?usp=drive_link';
      link.download = 'Tingyu_Zhang_FullStack_CV.pdf';
    }

    // Append to document, trigger click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex gap-4">
      <Button
        variant="outline"
        size="lg"
        className="uppercase flex items-center gap-2"
        onClick={() => handleDownloadCV('ml')}
      >
        <span>ML CV</span>
        <Download className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="uppercase flex items-center gap-2"
        onClick={() => handleDownloadCV('fullstack')}
      >
        <span>Full Stack CV</span>
        <Download className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default DownloadButtons;