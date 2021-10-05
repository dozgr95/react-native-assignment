import React, { useState } from "react";
import styled from "styled-components/native";
import { getGithubUsers, GithubUser } from "./api";

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.TextInput`
  width: 100%;
  background: white;
  margin: 5px;
  height: 30px;
  padding: 5px;
`;

// should be button but it is strange with styled-components/native
const User = styled.TouchableOpacity`
  height: 40px;
  flex-direction: row;
`;

const UserList = styled.View`
  flex-direction: column;
  background: white;
  width: 100%;
`;

const Avatar = styled.Image<any>`
  width: 40px;
  height: 40px;
`;

const Login = styled.Text`
  width: 100%;
  line-height: 40px;
`;

const Info = styled.Text`
  margin-top: 40px;
`;

const userClicked = (user: GithubUser) => {
  window.open(user?.html_url, "_blank", "noopener,noreferrer");
};

const GithubSearch = () => {
  const [searchResults, setSearchResults] = useState<GithubUser[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const inputPlaceholder = "Type in a GitHub username...";

  const onInputChange = async (event: any) => {
    const searchInput = event.target.value;
    if (searchInput) {
      console.log(searchInput);
      try {
        const userResults = await getGithubUsers(searchInput);
        setSearchResults(userResults);
      } catch (error: any) {
        setSearchResults([]);
        setErrorMessage(error.toString());
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <Wrapper>
      <Input
        onChange={(event) => onInputChange(event)}
        placeholder={inputPlaceholder}
      />
      <UserList>
        {searchResults.length > 0 &&
          searchResults.map((user) => {
            return (
              <User key={user?.id} onPress={() => userClicked(user)}>
                <Avatar source={user?.avatar_url} />
                <Login>{user?.login}</Login>
              </User>
            );
          })}
      </UserList>
      {!!errorMessage && <Info>{errorMessage}</Info>}
    </Wrapper>
  );
};

export default GithubSearch;
