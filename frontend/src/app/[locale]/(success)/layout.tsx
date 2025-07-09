import CheckIfLogin from "@/app/_components/common/CheckIfLogin";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CheckIfLogin>
      <div className="md:container mx-auto  ">{children}</div>
    </CheckIfLogin>
  );
}
