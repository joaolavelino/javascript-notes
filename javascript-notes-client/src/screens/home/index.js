import React from "react";
import presentationImage from "../../assets/images/presentation.png";
import Header from "../../components/header";
import { Column, Section, Title, Container } from "rbx";
import "../../styles/home.scss";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  return (
    <>
      <Header />
      <Section size="medium" className="home">
        <Container>
          <Column.Group>
            <Column size={5}>
              <Title size={2} spaced className="has-text-white">
                Create notes and easily access them on the cloud anywhere you
                need them.
              </Title>
              <Title size={5} spaced className="has-text-light" subtitle>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias
                expedita assumenda ut qui voluptatum non amet? Voluptatibus
                totam, reprehenderit velit omnis illum voluptates nulla quidem
                magnam laboriosam debitis nesciunt. Dignissimos.
              </Title>
              <Link
                to="/register"
                className="button is-outlined is-white is-large"
              >
                <strong>Register for free NOW</strong>
              </Link>
            </Column>
            <Column size={6} offset={1}>
              <img src={presentationImage} alt="presentation image" />
            </Column>
          </Column.Group>
        </Container>
      </Section>
    </>
  );
};

export default HomeScreen;
