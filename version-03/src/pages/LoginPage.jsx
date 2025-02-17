import { useState } from "react";
import {
  Box,
  Fieldset,
  Button,
  Input,
  Stack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { Switch } from "../components/ui/switch";
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "../components/ui/password-input";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword, connectAuthEmulator } from "firebase/auth";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// I need to install other firebase dependency for the above to work

// Sign up or sign in flow
// may be able to use something like result.user to see if user is already signed in.

function LoginPage({ auth }) {
  const { register, handleSubmit } = useForm();
  const [userAuth, setUserAuth] = useState({});
  const [checked, setChecked] = useState(false);

  connectAuthEmulator(auth, "http://localhost:9099/");
  // take the data from the other thing
  const loginEmailPassword = async (data) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    console.log(userCredential.user);
  };

  const signUpEmailPassword = () => {
    console.log('lets sign up')
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {/* add better, centered, vertical alignment  */}
      {/* Sign up  -- the profile creation can stay on the saved countries page for now. */}
      {/* design this cuter  */}
      <SimpleGrid columns={2}>
        <Text>Sign up</Text>
        <Switch
          checked={checked}
          onCheckedChange={(e) => setChecked(e.checked)}
        >
          Sign In
        </Switch>
      </SimpleGrid>
      {/* switch this to be different functions based on  */}
      <form onSubmit={handleSubmit(checked ? loginEmailPassword : signUpEmailPassword)}>
        <Fieldset.Root size="lg" maxW="lg" minW="md">
          {/* add a condition here login or sign up  */}
          <Stack>
            {checked ? (
              <Fieldset.Legend>Sign In</Fieldset.Legend>
            ): (
              <Fieldset.Legend>Sign Up</Fieldset.Legend>
            )}
          </Stack>
          <Fieldset.Content>
            {/* email and password */}
            <Field>
              <Input
                {...register("email", { required: true })}
                placeholder="email"
                type="email"
              />
            </Field>
            <Field>
              <PasswordInput {...register("password", { required: true })} />
              {/* only show this if it is signup */}
              {!checked && <PasswordStrengthMeter />}
            </Field>
          </Fieldset.Content>
          <Button type="submit" alignSelf="flex-start">
            Submit
          </Button>
        </Fieldset.Root>
      </form>
      {/* down here is a thing that sets a boolean which sets the thing  */}
    </Box>
  );
}

export default LoginPage;
