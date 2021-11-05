import React from "react";
import Container from "../components/Container";
import LogInForm from "../components/LogInForm";

const LogInPage: React.FC = () => {
  return (
    <Container>
      <div className="h-screen flex w-full items-center">
        <LogInForm />
      </div>
    </Container>
  );
}

export default LogInPage;