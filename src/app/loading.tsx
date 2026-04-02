import { Logo } from "@/components/atoms/logo";

export default function RootLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse">
        <Logo size="lg" />
      </div>
    </div>
  );
}
