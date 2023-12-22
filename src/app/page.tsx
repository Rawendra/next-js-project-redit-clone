import { Button } from "@nextui-org/react";
import { signIn, signOut } from "@/actions";
import { auth } from "@/auth";
import Profile from "@/components/profile";
export default async function Home() {
  const session = await auth();

  return (
    <div>
      <form action={signIn}>
        <Button type="submit">SIGN IN</Button>
      </form>
      <form action={signOut}>
        <Button type="submit">SIGN OUT</Button>
      </form>
      {session?.user ? (
        <span>{`you're signed in`}</span>
      ) : (
        <span>{`you're signed out`}</span>
      )}

      {JSON.stringify(session?.user)}
      <Profile />
    </div>
  );
}
