import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "../components/forms";
import { Logo, Screen } from "../components";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label("First Name"),
  lastName: Yup.string().required().label("Last Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen() {
  return (
    <Screen>
      <Logo />
      <Form
        initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
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
  );
}

export default RegisterScreen;
