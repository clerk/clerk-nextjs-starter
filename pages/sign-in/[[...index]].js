import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <SignIn path="/sign-in" routing="path" />
);

export default SignInPage;
