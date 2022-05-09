import { Card, Column, Container, Message, Section, Title } from "rbx";
import React from "react";
import Header from "../../../components/header";
import logo from "../../../assets/images/logo.png";
import "../../../styles/auth.scss";
import RegisterForm from "../../../components/auth/register_form";

const RegisterScreen = () => {
  return (
    <>
      <Header />
      <Section size="medium" className="auth">
        <Container>
          <Column.Group centered>
            <Column size="5">
              <Card>
                <Card.Content>
                  <Section>
                    <Column.Group>
                      <Column size={12}>
                        <img src={logo} alt="app logo" />
                      </Column>
                    </Column.Group>
                    <Column.Group>
                      <Column size={12}>
                        <Title
                          size={6}
                          className="has-text-grey has-text-centered"
                        >
                          Your notes on the cloud
                        </Title>
                      </Column>
                    </Column.Group>
                    <RegisterForm />
                  </Section>
                </Card.Content>
              </Card>
            </Column>
          </Column.Group>
        </Container>
      </Section>
    </>
  );
};
export default RegisterScreen;
