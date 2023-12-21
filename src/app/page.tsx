import { Button } from "@nextui-org/react";
import { signIn , signOut} from "@/actions";
export default function Home() {
  return (
    <div>
      <form action={signIn}>
        <Button type="submit">SIGN IN</Button>
      </form>
      <form action={signOut}>
        <Button type="submit">SIGN OUT</Button>
      </form>
    </div>
  );
}
