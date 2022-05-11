import {
  Column,
  Control,
  Field,
  Label,
  Section,
  Input,
  Button,
  Card,
  Title,
} from "rbx";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UsersService from "../../services/users";
import Toasty from "../toasty";

const UserEdit = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [disableButton, setDisableButton] = useState({
    name: true,
    email: true,
    password: true,
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setDisableButton({
      ...disableButton,
      [e.target.name]: false,
    });
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fillUserData();
  }, []);

  const fillUserData = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setFields({
      name: user.name,
      email: user.email,
      password: "",
      confirmPassword: "",
    });
  };

  const updateInfo = async (info) => {
    try {
      await UsersService.update(info, fields);
      setDisableButton({
        ...disableButton,
        [info]: true,
      });
      setStatus("Update successful");
      if (info == "email") {
        UsersService.logout();
        navigate("/login");
      }
    } catch (error) {
      setStatus("Update error");
    }
  };

  const updatePassword = async () => {
    if (
      fields.password === fields.confirmPassword &&
      fields.password.length >= 4
    ) {
      try {
        await UsersService.update("password", fields);
        setDisableButton({
          ...disableButton,
          password: true,
        });
        setStatus("Update successful");
      } catch (error) {
        setStatus("Update error");
      }
    } else if (fields.password.length < 4) {
      setStatus("Passwors must contain at least 4 characters");
    } else if (fields.password !== fields.confirmPassword) {
      setStatus("Password and confirm password must match");
    }
  };

  const deleteUser = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const confirm = window.confirm(
      `ALERT!\n\nAre you sure you want to delete the user ${user.name}?\n\nThis cannot be undone.`
    );
    if (confirm) {
      await UsersService.delete();
      navigate("/");
    }
  };

  if (status.length != 0) {
    setTimeout(() => {
      setStatus("");
    }, 2000);
  }

  return (
    <>
      <Column.Group>
        <Column size={12}>
          <Card>
            <Card.Content>
              <Column.Group>
                <Column size={12}>
                  <Title size={4}>Personal information</Title>
                  <Field>
                    <Label size="small">Name</Label>
                    <Control className="is-flex">
                      <Input
                        type="name"
                        name="name"
                        value={fields.name}
                        onChange={handleChange}
                      />
                      <Button
                        className="button is-purple"
                        disabled={disableButton.name}
                        onClick={() => updateInfo("name")}
                      >
                        Edit
                      </Button>
                    </Control>
                  </Field>
                </Column>
              </Column.Group>
            </Card.Content>
          </Card>
        </Column>
      </Column.Group>
      <Column.Group>
        <Column size={12}>
          <Card>
            <Card.Content>
              <Column.Group>
                <Column size={12}>
                  <Title size={4}>Account information</Title>
                  <Field>
                    <Label size="small">Email</Label>
                    <Control className="is-flex">
                      <Input
                        type="email"
                        name="email"
                        value={fields.email}
                        onChange={handleChange}
                      />
                      <Button
                        className="button is-purple"
                        disabled={disableButton.email}
                        onClick={() => updateInfo("email")}
                      >
                        Edit
                      </Button>
                    </Control>
                  </Field>
                  <Field>
                    <Label size="small">Password</Label>
                    <Control className="is-flex">
                      <Input
                        type="password"
                        name="password"
                        placeholder="New password"
                        value={fields.password}
                        onChange={handleChange}
                      />
                      <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={fields.confirmPassword}
                        onChange={handleChange}
                        className={`${
                          fields.confirmPassword === fields.password
                            ? "has-text-success"
                            : "has-text-danger"
                        }`}
                      />
                      <Button
                        className="button is-purple"
                        disabled={disableButton.password}
                        onClick={updatePassword}
                      >
                        Edit
                      </Button>
                    </Control>
                  </Field>
                </Column>
              </Column.Group>
            </Card.Content>
          </Card>
        </Column>
      </Column.Group>
      <Column.Group centered>
        <Column size={12}>
          <Section className="is-flex is-justify-content-space-between">
            <Button className="button is-danger" onClick={deleteUser}>
              Delete user
            </Button>
            <Button
              className="button is-white is-outlined"
              onClick={() => navigate("/notes")}
            >
              Back to Notes
            </Button>
          </Section>
        </Column>
      </Column.Group>
      <Toasty message={status} />
    </>
  );
};

export default UserEdit;
