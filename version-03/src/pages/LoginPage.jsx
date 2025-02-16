import { useState } from 'react';
import { Box, Fieldset, Button, Input, Stack } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "../components/ui/password-input";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword, connectAuthEmulator } from 'firebase/auth';
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// I need to install other firebase dependency for the above to work

// Sign up or sign in flow
// may be able to use something like result.user to see if user is already signed in. 

function LoginPage({auth}) {
  const { register, handleSubmit } = useForm();
  const [userAuth, setUserAuth] = useState({});

  connectAuthEmulator(auth, "http://localhost:9099/")
  // take the data from the other thing
  const loginEmailPassword = async (data) => {
    await signInWithEmailAndPassword(auth, data.email, data.password)
  }

  return (
    <>
      <Box>
        {/* Sign up  -- the profile creation can stay on the saved countries page for now. */}

        <form onSubmit={handleSubmit(loginEmailPassword)} >
          <Fieldset.Root size="lg" maxW="lg" minW="md">
            {/* add a condition here login or sign up  */}
            <Stack>
              <Fieldset.Legend>Login</Fieldset.Legend>
            </Stack>
            <Fieldset.Content>
              {/* email and password */}
              <Field>
                <Input 
                {...register("email", { required: true })}
                placeholder="email" type="email" />
              </Field>
              <Field>
                <PasswordInput
                {...register("password", { required: true })}
                />
                <PasswordStrengthMeter />
              </Field>
            </Fieldset.Content>
            <Button type="submit" alignSelf="flex-start">
              Submit
            </Button>
          </Fieldset.Root>
        </form>
        {/* down here is a thing that sets a boolean which sets the thing  */}
      </Box>
    </>
  );
}

export default LoginPage;
