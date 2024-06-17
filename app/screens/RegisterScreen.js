import { useState } from "react";
import * as Yup from "yup";

import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import { ActivityIndicator, Logo, Screen } from "../components";
import { authAPI, usersAPI } from "../api";
import { useAPI } from "../hooks";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label("First Name"),
  lastName: Yup.string().required().label("Last Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen() {
  const registerAPI = useAPI(usersAPI.register);
  const loginAPI = useAPI(authAPI.login);
  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    const result = await registerAPI.request(userInfo);

    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occured.");
        console.log(result);
      }
      return;
    }

    const { data: authToken } = await loginAPI.request(
      userInfo.email,
      userInfo.password
    );
    auth.logIn(authToken);
  };

  return (
    <>
      <ActivityIndicator visible={registerAPI.loading || loginAPI.loading} />
      <Screen>
        <Logo />
        <Form
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />
          <FormField
            autoCapitalize="words"
            autoCorrect={false}
            icon="account-details-outline"
            name="firstName"
            placeholder="First Name"
            textContentType="givenName"
          />
          <FormField
            autoCapitalize="words"
            autoCorrect={false}
            icon="account-details-outline"
            name="lastName"
            placeholder="Last Name"
            textContentType="familyName"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyBoardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="newPassword"
          />
          <SubmitButton title="register" />
        </Form>
      </Screen>
    </>
  );
}

export default RegisterScreen;
