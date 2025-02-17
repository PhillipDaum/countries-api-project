import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Fieldset,
  Button,
  Input,
  Stack,
  SimpleGrid,
  Text,
  Alert,
} from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { Switch } from "../components/ui/switch";
import { PasswordInput } from "../components/ui/password-input";
import { useForm } from "react-hook-form";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

function LoginPage({ auth }) {
  const { register, handleSubmit } = useForm();
  const [checked, setChecked] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const navigate = useNavigate();

  const alerts = {
    emailInUse: {
      status: "error",
      message: "Email already in use"
    } ,
    signUpSuccess: {
      status: "success",
      message: "Sign up successful, redirecting to home page."
    } ,
    signInSuccess: {
      status: "success",
      message: "Sign in successful, redirecting to home page."
    } ,
    inCorrectPasswordEmail: {
      status: "error",
      message: "Incorrect password and email combination."
    },
    shortPassword: {
      status: "error",
      message: "password must be at least 6 characters."
    }
  };

  // change to 'sign' in?
  const loginEmailPassword = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      setAlertMessage(alerts.signInSuccess);
      // take the user back to the main page
      setTimeout(() => { navigate("/");}, 2000);
    } catch (error) {
      console.error(error.message);
      // show error message in alert
    }
  };

  const signUpEmailPassword = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      setAlertMessage(alerts.signUpSuccess)
      setTimeout(() => { navigate("/");}, 2000);
    } catch (error) {
      console.error(error.message);
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        setAlertMessage(alerts.emailInUse)
      } else if (error.message === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
        setAlertMessage(alerts.shortPassword)
      }
    }
  };

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
      <form
        onSubmit={handleSubmit(
          checked ? loginEmailPassword : signUpEmailPassword
        )}
      >
        <Fieldset.Root size="lg" maxW="lg" minW="md">
          <Stack>
            {checked ? (
              <Fieldset.Legend>Sign In</Fieldset.Legend>
            ) : (
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
          {alertMessage && (
            <Alert.Root status={alertMessage.status}>
              <Alert.Indicator />
              <Alert.Title>
                {alertMessage.message}
              </Alert.Title>
            </Alert.Root>
          )}
          <Button type="submit" alignSelf="flex-start">
            Submit
          </Button>
        </Fieldset.Root>
      </form>
    </Box>
  );
}

export default LoginPage;
