import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="border min-h-screen flex items-center justify-center">
      <SignIn />
    </div>
  );
}
