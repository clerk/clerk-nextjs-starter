import { UserProfile } from "@clerk/clerk-react";
import { Header } from "..";
export default function UserProfilePage() {
  return (
    <>
      <Header />
      <UserProfile path="/user" routing="path" />
    </>
  );
}
