import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { SearchBox } from "@ahaui/react";

export default function SearchWizBox() {
  const history = useHistory();
  const [search, setSearch] = useState("");
  const goToBox = (box_id) => {
    history.push("/boxes/" + box_id);
    setSearch("");
  };

  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed.");
        event.preventDefault();
        history.push("/boxes/" + search);
        setSearch("");
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [history, search]);
  return (
    <SearchBox
      placeholder="Search by the box ID"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onClickButton={() => goToBox(search)}
      className="SearchBox-custom"
    />
  );
}
