import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Air Fryer Fit — 108 receitas leves e crocantes",
  description: "Mais de 100 receitas fit, rápidas e fáceis, feitas exclusivamente na Air Fryer.",
  metadataBase: new URL("https://air-fryer-fit.site"),
  openGraph: {
    title: "Air Fryer Fit — +100 receitas",
    description: "Crocante. Leve. Fácil. Seu novo jeito de comer bem.",
    images: ["/og.png"],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
