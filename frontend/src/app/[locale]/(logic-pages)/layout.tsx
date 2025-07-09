import CheckIfLogin from "@/app/_components/common/CheckIfLogin";
import SideBarMainLayout from "@/app/_components/Layout/SideBarMainPages";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CheckIfLogin isLogging={true}>
        <SideBarMainLayout>
          <div className="">{children}</div>
        </SideBarMainLayout>
      </CheckIfLogin>
    </>
  );
}
