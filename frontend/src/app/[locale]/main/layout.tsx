import SideBarMainLayout from "@/app/_components/Layout/SideBarMainPages";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SideBarMainLayout>
        <div className="">{children}</div>
      </SideBarMainLayout>
    </>
  );
}
