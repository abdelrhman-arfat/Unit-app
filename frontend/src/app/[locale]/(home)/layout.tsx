import CheckIfLogin from "@/app/_components/common/CheckIfLogin";
import Footer from "@/app/_components/Layout/Footer";
import LandingPageHeader from "@/app/_components/Layout/LandingPageHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="md:container mx-auto  ">
      <CheckIfLogin>
        <LandingPageHeader />
        <div className="">{children}</div>
        <Footer />
      </CheckIfLogin>
    </div>
  );
}
