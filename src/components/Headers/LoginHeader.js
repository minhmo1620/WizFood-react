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
    <Header fullWidth className="u-backgroundAccentLight" style={{height:60}}>
      <Header.Main className="u-positionAbsolute u-positionCenter u-paddingTopMedium">
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
      </Header.Main>
    </Header>
  );
}
