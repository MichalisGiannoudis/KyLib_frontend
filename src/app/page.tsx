"use client";
import {useSignInHook } from "@/hooks/auth/useSignIn.hook";
import { SignIn } from "@/components/authentication/signIn.component";

export default function LandingPage() {

  const { SingIn } = useSignInHook();

  return (
    <div>
      <SignIn onSignIn={SingIn}/>  
    </div>
  );
}
