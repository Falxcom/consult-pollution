import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { AdSenseScript } from "@/components/ads/AdSenseScript";
import "./globals.css";

const noto = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "量産型コンサル汚染度診断",
  description:
    "10問の4択で、あなたの「量産型コンサル」汚染度を測ります。診断結果は5タイプ。",
  openGraph: {
    title: "量産型コンサル汚染度診断",
    description: "10問で汚染度をチェック。結果をXで共有しよう。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "量産型コンサル汚染度診断",
    description: "10問で汚染度をチェック。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${noto.variable} font-sans`}>
        <AdSenseScript />
        {children}
      </body>
    </html>
  );
}
