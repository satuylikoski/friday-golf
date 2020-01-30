import React, { useState, useEffect } from "react";
import store from "store";
import { Provider, Box } from "@freska/freska-ui";
import styled, { createGlobalStyle } from "styled-components";

import "./App.css";
import fridayGolf from "./friday-golf.png";
import ScoreTable from "./ScoreTable";
import Randomizer from "./Randomizer";
import Adjuster from "./Adjuster";
import GameChanger from "./GameChanger";

function App() {
  const [points, setPoints] = useState({
    b: [-10, 25],
    s: [-10, 25],
    miss: [-10, 25]
  });
  const [rules, setRules] = useState({ avoidNull: false, notSame: false });

  useEffect(() => {
    const points = store.get("points");
    if (points) {
      setPoints(points);
    }

    const rules = store.get("rules");
    if (rules) {
      setRules(rules);
    }
  }, []);

  const showScoreTable = false;

  // Next: Add some animations if max or min reached e.g.
  return (
    <>
      <SiteCSS />
      <Provider>
        <Box
          position="fixed"
          display="flex"
          width="100%"
          justifyContent="space-around"
          alignItems="flex-start"
          mt={3}
        >
          <GameChanger />
          <Img src={fridayGolf} alt="friday golf" />
          <Adjuster
            initialPoints={points}
            initialRules={rules}
            onUpdate={(points, rules) => {
              setPoints(points);
              setRules(rules);
              store.set("rules", rules);
              store.set("points", points);
            }}
          />
        </Box>

        <Wrapper>
          <Randomizer points={points} rules={rules} />
        </Wrapper>

        {showScoreTable && <ScoreTable />}
      </Provider>
    </>
  );
}

const Img = styled.img`
  height: 30px;

  ${props => props.theme.mediaQueries.md} {
    height: 140px;
  }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
`;

const SiteCSS = createGlobalStyle`
  html, body {
    background-color: #0b0b0b;
  }
`;

export default App;
