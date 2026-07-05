import NoiseOverlay from "@/components/landing/NoiseOverlay";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NoiseOverlay />
      {children}
    </>
  );
}
