import LandingPageHeader from "@/app/_components/Layout/LandingPageHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto  px-6 sm:px-8 md:px-14">
      <LandingPageHeader />
      <div className="">{children}</div>
    </div>
  );
}
