import LandingPageHeader from "@/app/_components/Layout/LandingPageHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto  ">
      <LandingPageHeader />
      <div className="">{children}</div>
    </div>
  );
}
