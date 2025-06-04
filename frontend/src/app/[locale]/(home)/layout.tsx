import LandingPageHeader from "@/app/_components/Layout/LandingPageHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LandingPageHeader />
      <div className="">{children}</div>
    </>
  );
}
