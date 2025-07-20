import Footer from "@/app/_components/Layout/Footer";
import LandingPageHeader from "@/app/_components/Layout/LandingPageHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="md:container mx-auto  ">
      <LandingPageHeader />
      <div className="">{children}</div>
      <Footer />
    </div>
  );
}
