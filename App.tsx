import React from "react";
import styled from "styled-components/native";
import GithubSearch from "./GithubSearch";

const AppView = styled.View`
  width: 100%;
  height: 100%;
  padding-top: 50px;
  background-color: #256139;
`;

export default function App() {
  return (
    <AppView>
      <GithubSearch />
    </AppView>
  );
}
