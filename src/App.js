import React from "react";
import Now from "components/Now";
import CenteredPage from "components/CenteredPage";
import PrivateRoute from "components/PrivateRoute";
import { AccountProvider, useAccount } from "@jmhudak/strapi-auth";
import { Box, Heading, Flex, Button, Text } from "rebass";
import { ListLogs } from "components/Log";
import { ListHabits } from "components/Habit";
import { ListIdentities } from "components/Identity";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import { hot } from "react-hot-loader";
import ApolloProvider from "components/ApolloProvider";
import StylesProvider from "components/StylesProvider";
import Login from "components/Login";

function Home() {
  return (
    <CenteredPage>
      <Box>
        <Heading>Hello!</Heading>
        <Button as={Link} to='/login'>
          Login
        </Button>
      </Box>
    </CenteredPage>
  );
}

function AccountInfo() {
  const { account, logout } = useAccount();
  const history = useHistory();

  const onLogout = () => {
    logout(() => history.push("/"));
  };

  return (
    <Flex py={2} alignItems='center' justifyContent='flex-end'>
      <Text mr={2}>Hello {account.user.username}!</Text>
      <Button onClick={onLogout} variant='outline'>
        Logout
      </Button>
    </Flex>
  );
}

function Today(props) {
  return (
    <Box
      sx={{
        fontFamily: "body",
        color: "text",
        height: "inherit"
      }}
    >
      <AccountInfo />
      <Now />
      <ListLogs />

      <ListHabits />
      <ListIdentities />
      {props.children}
    </Box>
  );
}

const App = props => (
  <ApolloProvider>
    <StylesProvider>
      <AccountProvider endpoint={process.env.REACT_APP_ENDPOINT}>
        <Router>
          <div className='wrapper'>
            <Switch>
              <Route path='/login'>
                <Login />
              </Route>
              <Route path='/' exact>
                <Home />
              </Route>
              <PrivateRoute path='/today'>
                <Today />
              </PrivateRoute>
              <Route path='*'>404</Route>
            </Switch>
          </div>
        </Router>
      </AccountProvider>
    </StylesProvider>
  </ApolloProvider>
);

export default hot(module)(App);
