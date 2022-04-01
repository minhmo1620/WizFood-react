import React, { SafeAnchor } from "react";
import { useHistory } from "react-router-dom";
import { Header, Logo } from "@ahaui/react";
import logo from "../../logo.svg";

export default function LoginHeader() {
  const history = useHistory();

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
