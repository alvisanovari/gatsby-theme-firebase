/** @jsx jsx */
import { jsx } from "theme-ui";
import * as React from "react";
import { navigate } from "gatsby";
import FormState from "../containers/FormState";
import { auth } from "../firebase";
import Form from "./FormBase";
import Input from "./Input";
import Button from "./Button";

const SignUpForm = () => {
  const { setErrorMessage } = FormState.useContainer();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <Form
      onSubmit={async event => {
        event.preventDefault();
        try {
          const { user } = await auth.createUserWithEmailAndPassword(
            email,
            password,
          );
          if (user) {
            await user.updateProfile({ displayName: name });
            await user.sendEmailVerification();
          }
          navigate("/");
        } catch (error) {
          setErrorMessage(error.message);
        }
      }}
    >
      <Input
        label="Name: "
        type="text"
        placeholder="Name"
        value={name}
        onChange={event => {
          setName(event.target.value);
        }}
      />
      <Input
        label="Email: "
        type="text"
        placeholder="Email"
        value={email}
        onChange={event => {
          setEmail(event.target.value);
        }}
      />
      <Input
        label="Password: "
        type="password"
        placeholder="Password"
        value={password}
        onChange={event => {
          setPassword(event.target.value);
        }}
      />
      <Button type="submit" css={{ width: "100%" }}>
        Sign up
      </Button>
    </Form>
  );
};

export default SignUpForm;