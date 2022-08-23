import React from 'react';
import { signInWithGooglePopup, createUserDocFromAuth } from '../../utils/firebase/firebase.utils';

export const SignIn = () => {

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    console.log(user);
    const userDocRef = await createUserDocFromAuth(user);
  }

  return (
    <div>
        <h1>Sign In Page</h1>
        <button onClick={logGoogleUser}>Sign in with google popup</button>
    </div>
  )
}
