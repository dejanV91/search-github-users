import React, { useEffect, useState } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  const [requests, setRequests] = useState(0);
  const [error, setError] = useState({ show: false, msg: "" });

  const getGithubUsers = async (user) => {
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    if (response) {
      toggleError();
      setGithubUser(response.data);
    } else {
      toggleError(true, "there is no user with this username");
    }
  };

  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`).then(({ data }) => {
      let {
        rate: { remaining },
      } = data;
      if (remaining === 0) {
        toggleError(true, "sorry, you have exeeded your hourly rate limit!");
      }

      setRequests(remaining);
    });
  };

  function toggleError(show = false, msg = "") {
    setError({ show, msg });
  }

  useEffect(checkRequest, []);
  return (
    <GithubContext.Provider
      value={{ githubUser, repos, followers, requests, error, getGithubUsers }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
