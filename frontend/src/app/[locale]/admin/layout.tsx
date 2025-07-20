import CheckIfLogin from "@/app/_components/common/CheckIfLogin";
import SidebarAdminLayout from "@/app/_components/Layout/SidebarAdminLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CheckIfLogin isLogging={true}>
        <SidebarAdminLayout>
          <div className="">{children}</div>
        </SidebarAdminLayout>
      </CheckIfLogin>
    </>
  );
}
