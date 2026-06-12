import { SignIn } from "@clerk/nextjs";
import AuthShell, { authAppearance } from "@/components/auth/AuthShell";

export default function SignInPage() {
  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Pick up your job search with a sharper dashboard."
      description="Sign in to resume tracking applications, reviewing statuses, and moving candidates through your pipeline."
    >
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        forceRedirectUrl="/dashboard"
        fallbackRedirectUrl="/dashboard"
        appearance={authAppearance}
      />
    </AuthShell>
  );
}