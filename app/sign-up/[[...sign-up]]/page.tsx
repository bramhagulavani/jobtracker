import { SignUp } from "@clerk/nextjs";
import AuthShell, { authAppearance } from "@/components/auth/AuthShell";

export default function SignUpPage() {
  return (
    <AuthShell
      eyebrow="Create your account"
      title="Start with a dashboard that feels intentional."
      description="Set up JobTracker to keep your applications organized, your next steps clear, and your job search moving forward."
    >
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        forceRedirectUrl="/dashboard"
        fallbackRedirectUrl="/dashboard"
        appearance={authAppearance}
      />
    </AuthShell>
  );
}