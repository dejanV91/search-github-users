import React from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
  const { repos } = React.useContext(GithubContext);

  const language = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;

    if (!language) return total;
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }
    return total;
  }, {});

  const mostUsed = Object.values(language)
    .sort((a, b) => {
      return a.value - b.value;
    })
    .slice(0, 5);

  // most popular language
  const mostPopular = Object.values(language)
    .map((item) => {
      return { ...item, value: item.stars };
    })
    .sort((a, b) => a.value - b.value)
    .slice(0, 5);

  // stars , forks
  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { name, stargazers_count, forks_count } = item;
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forks_count] = { label: name, value: forks_count };
      return total;
    },
    {
      stars: {},
      forks: {},
    }
  );

  const mostPopularRepos = Object.values(stars).slice(-5).reverse();

  const mostForkedRepos = Object.values(forks).slice(-5).reverse();

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsed}></Pie3D>
        <Column3D data={mostPopularRepos}></Column3D>
        <Doughnut2D data={mostPopular}></Doughnut2D>
        <Bar3D data={mostForkedRepos}></Bar3D>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }
  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
