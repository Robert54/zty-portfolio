import Link from "next/link";

import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const socials = [
  { icon: <FaGithub />, path: "https://github.com/Robert54" },
  { icon: <FaLinkedinIn />, path: "https://www.linkedin.com/in/tingyu-zhang-b3357314a/" },
  { icon: <FaXTwitter />, path: "https://x.com/zty54" },
];

const Social = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return (
          <Link key={index} href={item.path} className={iconStyles}>
            {item.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Social;
