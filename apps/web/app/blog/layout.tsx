import ExitIntent from "@/components/ExitIntent";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ExitIntent />
    </>
  );
}
