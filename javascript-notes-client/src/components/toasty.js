import { Container, Section, Title } from "rbx";
import React from "react";
import "../styles/toasty.scss";

const Toasty = ({ message }) => {
  return (
    <Container
      backgroundColor="primary"
      className={`toasty ${message.length == 0 ? "hidden" : ""}`}
    >
      <Title size={5} className="has-text-white - has-text-weight-bold">
        {message}
      </Title>
    </Container>
  );
};

export default Toasty;
