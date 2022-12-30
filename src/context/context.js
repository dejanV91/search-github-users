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
  const [isLoading, setIsLoading] = useState(false);

  const getGithubUsers = async (user) => {
    toggleError();
    setIsLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;

      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          const [repos, followers] = results;
          const status = "fulfilled";

          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch((error) => console.log(error));
    } else {
      toggleError(true, "there is no user with this username");
    }
    checkRequest();
    setIsLoading(false);
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
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        getGithubUsers,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
