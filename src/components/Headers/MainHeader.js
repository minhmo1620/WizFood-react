import React, { SafeAnchor } from "react";
import {
  Header,
  Logo,
  TopMenu,
  Dropdown,
  Icon,
  Avatar,
  Button,
} from "@ahaui/react";
import { useHistory } from "react-router-dom";
import { deleteTokens } from "../../auth";
import SearchWizBox from "../SearchWizBox";

import avatar from "../../avatar.svg";
import logo from "../../logo.svg";
import "../../custom.css";

export default function MainHeader() {
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
        <Header.Right>
          <TopMenu className="u-backgroundAccentLight" onSelect={goToPage}>
            <TopMenu.Item eventKey="/wizaid">WizAId</TopMenu.Item>
            <TopMenu.Item eventKey="/wizbox">WizRes</TopMenu.Item>
          </TopMenu>
          <SearchWizBox />

          <Dropdown alignRight className="u-marginLeftExtraSmall">
            <Dropdown.Button
              variant="secondary"
              size="small"
              className="u-backgroundAccentLight u-shadowSmall"
            >
              <Button.Icon>
                <Avatar size="large" src={avatar} />
              </Button.Icon>
              <Button.Label>{localStorage.getItem("username")}</Button.Label>
            </Dropdown.Button>
            <Dropdown.Container className="u-paddingVerticalExtraSmall">
              <Dropdown.Item>
                <Icon name="contact" size="small" />
                <span
                  className="u-marginLeftExtraSmall"
                  onClick={() => history.push("/")}
                >
                  My Profile
                </span>
              </Dropdown.Item>
              <Dropdown.Item>
                <Icon name="power" size="small" />
                <span
                  className="u-marginLeftExtraSmall"
                  onClick={() => deleteTokens()}
                >
                  Logout
                </span>
              </Dropdown.Item>
            </Dropdown.Container>
          </Dropdown>
        </Header.Right>
      </Header.Main>
    </Header>
  );
}
