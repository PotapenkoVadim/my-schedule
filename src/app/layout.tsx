import { APP_DESCRIPTION, APP_TITLE } from "@/constants";
import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "@/assets/global.scss";

const inter = Roboto_Mono({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
