import React from "react";
import Header from "../../../components/header";
import HeaderLogged from "../../../components/header_logged";
import UserEdit from "../../../components/user_edit";
import { Card, Column, Container, Message, Section, Title } from "rbx";

const UserEditScreen = () => {
  return (
    <>
      <HeaderLogged />
      <Section size="medium" className="auth">
        <Container>
          <Column.Group centered>
            <Column size="8">
              <Title size={3} className="has-text-white has-text-aligned-left">
                User Edit
              </Title>
              <UserEdit />
            </Column>
          </Column.Group>
        </Container>
      </Section>
    </>
  );
};
export default UserEditScreen;
