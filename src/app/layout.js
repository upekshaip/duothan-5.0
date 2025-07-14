import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/components.css";
import "@/styles/fonts.css";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://sudojet.com"),
  keywords: ["keywords"],
  title: {
    default: "SudoJet",
    home: "%s | SudoJet",
  },
  openGraph: {
    description:
      "SudoJet is a simple and fast way to create your documentations.",
    images: ["https://sudojet.com/logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className={inter.className + " min-h-screen"}>
          <Script
            src="https://cdn.lordicon.com/lordicon.js"
            strategy="beforeInteractive" // Ensures the script loads before page renders
          />
          <NextTopLoader
            color="#2299DD"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          />
          <div className="mx-auto max-w-screen-2xl" id="main-content">
            {children}
          </div>
          {/* <div className="relative"></div> */}
        </body>
      </html>
    </>
  );
}
