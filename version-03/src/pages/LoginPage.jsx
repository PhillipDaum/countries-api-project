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
import { PasswordInput } from "../components/ui/password-input";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";


function LoginPage({ auth }) {
  const { register, handleSubmit } = useForm();
  const [userAuth, setUserAuth] = useState({});
  const [checked, setChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // change to 'sign' in? 
  const loginEmailPassword = async (data) => {
    try { 
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      // take the user back to the main page
      // switch the sign up/in to sign out
    } catch(error) {
      console.error("Error signing in:")
      // show error message in alert
    }
  };

  const signUpEmailPassword = async (data) => {
    try { 
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      console.log("user signed up:", userCredential.user)
      // add a pop up that checks it?
    } catch(error) {
      console.error("Error signing up:", error.message)
    }
    // show errors to user
    // There is already an account with this email
    // set a thing and do conditional rendering 
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
            </Field>
          </Fieldset.Content>
          <Button type="submit" alignSelf="flex-start">
            Submit
          </Button>
        </Fieldset.Root>
      </form>
    </Box>
  );
}

export default LoginPage;
