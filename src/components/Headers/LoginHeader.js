import React, { SafeAnchor } from "react";
import { useHistory } from "react-router-dom";
import { Header, Logo, TopMenu } from "@ahaui/react";
import logo from "../../logo.svg";

export default function LoginHeader() {
  const history = useHistory();
  const goToPage = (e) => {
    history.push(e);
  };

  return (
    <Header fullWidth className="u-backgroundAccentLight">
      <Header.Brand>
        <Logo
          as={SafeAnchor}
          src={logo}
          variant="original"
          height={60}
          width={300}
          onClick={() => {
            history.push("/");
          }}
        />
      </Header.Brand>
      <Header.Main>

        <Header.Left>
        <TopMenu className="u-backgroundAccentLight" onSelect={goToPage}>
            <TopMenu.Item eventKey="/wizaid">WizAId</TopMenu.Item>
            <TopMenu.Item eventKey="/wizbox">WizRes</TopMenu.Item>
          </TopMenu>
        </Header.Left>
      </Header.Main>
    </Header>
  );
}
