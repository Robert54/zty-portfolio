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
      link.href = 'https://drive.google.com/file/d/1PY7GgkKeNeq2iNLcGbQmb6wITN1keUNG/view?usp=sharing';
      link.download = 'Tingyu_Zhang_ML_CV.pdf';
    } else {
      // link.href = 'https://drive.google.com/file/d/1eUNu0Ann-1VLdNcUshuxmIDWPXsNH8Lk/view?usp=sharing';
      // link.download = 'Tingyu_Zhang_FullStack_CV.pdf';
      link.href = 'https://drive.google.com/file/d/1HqsDxIpKnOsYpMUk7PGGOv2mmhEpI4ID/view?usp=sharing';
      link.download = 'Tingyu_Zhang_Resume.pdf'
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
        <span>Resume</span>
        <Download className="h-5 w-5" />
      </Button>
      {/* <Button
        variant="outline"
        size="lg"
        className="uppercase flex items-center gap-2"
        onClick={() => handleDownloadCV('fullstack')}
      >
        <span>Full Stack CV</span>
        <Download className="h-5 w-5" />
      </Button> */}
    </div>
  );
};

export default DownloadButtons;