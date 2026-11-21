import Image from "next/image";
import { FaAddressCard, FaEnvelope, FaFilePdf, FaPhoneAlt } from "react-icons/fa";

// Temporary page for an expo: reached by QR code / NFC tag, not linked from the nav.
export const metadata = {
  metadataBase: new URL("https://www.tingyuzhang.com"),
  title: "Tingyu Zhang | AGM business card",
  description:
    "Business card for Tingyu Zhang, Data Scientist at AGM (Advanced Global Manufacturing).",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Tingyu Zhang | AGM business card",
    description: "Data Scientist, AGM (Advanced Global Manufacturing)",
    images: [{ url: "/card/tingyu-zhang-card-front.jpg", width: 1600, height: 914 }],
  },
};

const actions = [
  {
    label: "Save contact",
    sub: "保存联系人",
    href: "/card/tingyu-zhang.vcf",
    icon: FaAddressCard,
    primary: true,
  },
  {
    label: "Card PDF",
    sub: "下载名片",
    href: "/card/Tingyu-Zhang-AGM-Business-Card.pdf",
    icon: FaFilePdf,
    newTab: true,
  },
  {
    label: "Call",
    sub: "+1 323-943-5582",
    href: "tel:+13239435582",
    icon: FaPhoneAlt,
  },
  {
    label: "Email",
    sub: "tingyu@agminc.net",
    href: "mailto:tingyu@agminc.net",
    icon: FaEnvelope,
  },
];

export default function Card() {
  return (
    <section className="py-6 xl:py-12">
      <div className="container mx-auto max-w-[760px] flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-2xl xl:text-3xl font-semibold">Tingyu Zhang</h1>
          <p className="text-white/60 mt-1 text-sm xl:text-base">
            Data Scientist · AGM (Advanced Global Manufacturing)
          </p>
        </div>

        <Image
          src="/card/tingyu-zhang-card-front.jpg"
          alt="Business card of Tingyu Zhang, Data Scientist at AGM, with phone, email and Atlanta office address"
          width={1600}
          height={914}
          priority
          sizes="(max-width: 790px) 100vw, 760px"
          className="w-full h-auto rounded-xl shadow-2xl ring-1 ring-white/10"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map(({ label, sub, href, icon: Icon, primary, newTab }) => (
            <a
              key={label}
              href={href}
              {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-colors duration-300 ${
                primary
                  ? "bg-accent text-primary hover:bg-accent-hover"
                  : "bg-[#27272c] text-white hover:text-accent"
              }`}
            >
              <Icon className="text-xl shrink-0" />
              <span className="flex flex-col min-w-0">
                <span className="font-semibold">{label}</span>
                <span
                  className={`text-xs truncate ${primary ? "text-primary/70" : "text-white/60"}`}
                >
                  {sub}
                </span>
              </span>
            </a>
          ))}
        </div>

        <Image
          src="/card/tingyu-zhang-card-back.jpg"
          alt="Back of the card: AGM, Advanced Global Manufacturing logo"
          width={1600}
          height={914}
          sizes="(max-width: 790px) 100vw, 760px"
          className="w-full h-auto rounded-xl ring-1 ring-white/10"
        />
      </div>
    </section>
  );
}
