import MainAuthSection from "@/app/_components/section/auth/MainAuthSection";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainAuthSection>{children}</MainAuthSection>;
}
