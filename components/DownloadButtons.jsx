// components/DownloadButtons.jsx
'use client';

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const DownloadButtons = () => {
  const handleDownloadCV = () => {
    // Create a link element pointing at the current resume
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/uc?export=download&id=1cun3ejGVLocAvZ9gmrJhvzhvsccmhluE';
    link.download = 'Tingyu_Zhang_Resume_2026.pdf';

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
        onClick={handleDownloadCV}
      >
        <span>Resume</span>
        <Download className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default DownloadButtons;
