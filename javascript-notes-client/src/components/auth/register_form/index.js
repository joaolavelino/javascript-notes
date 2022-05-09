import React, { useState } from "react";
import { Button, Column, Control, Field, Help, Input, Label } from "rbx";
import { Link, useNavigate } from "react-router-dom";
import UsersService from "../../../services/users";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //call the register method of the UsersService object
      const user = await UsersService.register({
        name: name,
        email: email,
        password: password,
      });
      navigate("/login");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      <Column.Group centered>
        <form onSubmit={handleSubmit}>
          <Column size={12}>
            <Field>
              <Label size="small">Name</Label>
              <Control>
                <Input
                  type="name"
                  required
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Control>
            </Field>
            <Field>
              <Label size="small">Email</Label>
              <Control>
                <Input
                  type="email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Control>
            </Field>
            <Field>
              <Label size="small">Password</Label>
              <Control>
                <Input
                  type="password"
                  required
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Control>
            </Field>
            <Field>
              <Control>
                <Column.Group breakpoint="mobile">
                  <Column>
                    <Link
                      to="/login"
                      className="button is-light has-text-danger"
                    >
                      Login or
                    </Link>
                  </Column>
                  <Column>
                    <Button className="is-danger is-outlined">Register</Button>
                  </Column>
                </Column.Group>
              </Control>
            </Field>
            {error && (
              <Help className="is-danger">Invalid email or password</Help>
            )}
          </Column>
        </form>
      </Column.Group>
    </>
  );
};

export default RegisterForm;
