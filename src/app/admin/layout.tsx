import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SkinLove Admin — Dashboard",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
