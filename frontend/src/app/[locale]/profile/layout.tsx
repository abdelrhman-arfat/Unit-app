import CheckIfLogin from "@/app/_components/common/CheckIfLogin";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CheckIfLogin isLogging={true}>
        <div className="">{children}</div>
      </CheckIfLogin>
    </>
  );
}
