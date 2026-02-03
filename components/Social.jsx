import Link from "next/link";

import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const socials = [
  { icon: <FaGithub />, path: "https://github.com/Robert54", label: "GitHub" },
  { icon: <FaLinkedinIn />, path: "https://www.linkedin.com/in/tingyu-zhang-b3357314a/", label: "LinkedIn" },
  { icon: <FaXTwitter />, path: "https://x.com/zty54", label: "X (Twitter)" },
];

const Social = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return (
          <Link
            key={index}
            href={item.path}
            className={iconStyles}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
          >
            {item.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Social;
