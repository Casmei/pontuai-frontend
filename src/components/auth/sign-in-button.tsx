'use client';

import { Button } from "../ui/button";

type Props = {
  onSignIn: () => Promise<void>;
};

const SignIn = ({ onSignIn }: Props) => {
  return (
    <Button
      onClick={() => {
        onSignIn();
      }}
    >
      Entrar
    </Button>
  );
};

export default SignIn;