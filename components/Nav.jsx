// 'use client'

// import React from "react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { Home, FileText, Briefcase, Mail } from "lucide-react"
// import AudioControls from "./AudioControls"

// const links = [
//   { name: "Home", path: "/", icon: Home },
//   { name: "Resume", path: "/resume", icon: FileText },
//   { name: "Project", path: "/project", icon: Briefcase },
//   { name: "Contact", path: "/contact", icon: Mail }
// ]

// const Nav = () => {
//   const pathname = usePathname()

//   return (
//     <nav className="flex items-center justify-between w-full">
//       <div className="flex gap-8">
//         {links.map((link) => {
//           const Icon = link.icon
//           return (
//             <Link
//               href={link.path}
//               key={link.path}
//               scroll={false}
//               className={`
//                 flex items-center gap-2 
//                 capitalize font-medium 
//                 transition-all duration-300
//                 hover:text-accent relative
//                 ${link.path === pathname ? "text-accent" : "text-white/70"}
//               `}
//             >
//               <Icon size={18} />
//               {link.name}
//               {link.path === pathname && (
//                 <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent" />
//               )}
//             </Link>
//           )
//         })}
//       </div>
//       <div className="ml-auto pl-8">
//         <AudioControls />
//       </div>
//     </nav>
//   )
// }

// export default Nav
'use client'

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Briefcase, Mail } from "lucide-react";
import AudioControls from "./AudioControls";

const links = [
  { name: "Home", path: "/", icon: Home },
  { name: "Resume", path: "/resume", icon: FileText },
  { name: "Project", path: "/project", icon: Briefcase },
  { name: "Contact", path: "/contact", icon: Mail }
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between w-full relative z-20">
      <div className="flex gap-8">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              href={link.path}
              key={link.path}
              scroll={false}
              className={`
                flex items-center gap-2 
                capitalize font-medium 
                transition-all duration-300
                hover:text-accent relative
                ${link.path === pathname ? "text-accent" : "text-white/70"}
              `}
            >
              <Icon size={18} />
              {link.name}
              {link.path === pathname && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent" />
              )}
            </Link>
          );
        })}
      </div>
      <div className="ml-auto pl-8">
        <AudioControls />
      </div>
    </nav>
  );
};

export default Nav;