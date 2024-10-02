import { APP_DESCRIPTION, APP_TITLE } from "@/constants";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { PageLayout } from "@/libs";
import { AppProvider } from "@/context";
import "@/assets/global.scss";

const inter = Roboto({
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic"],
});

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
      <body className={inter.className}>
        <AppProvider>
          <PageLayout>{children}</PageLayout>
        </AppProvider>
      </body>
    </html>
  );
}
