import CheckIfLogin from "@/app/_components/common/CheckIfLogin";
import ResponsiveSidebarLayout from "@/app/_components/Layout/ResponsiveSidebarLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CheckIfLogin isLogging={true}>
        <ResponsiveSidebarLayout>
          <div className="">{children}</div>
        </ResponsiveSidebarLayout>
      </CheckIfLogin>
    </>
  );
}
