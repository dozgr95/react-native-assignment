import React from "react";
import styled from "styled-components/native";
import GithubSearch from "./GithubSearch";

const AppView = styled.SafeAreaView`
  flex: 1;
  background-color: #256139;
  padding: 50px 20px;
`;

export default function App() {
  return (
    <AppView>
      <GithubSearch />
    </AppView>
  );
}
