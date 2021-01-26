import { UserProfile } from "@clerk/clerk-react";
export default function UserProfilePage() {
  return <UserProfile path="/user" routing="path" />;
}
