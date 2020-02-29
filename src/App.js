import React, { useState, useEffect } from "react";
import store from "store";
import Box from "@material-ui/core/Box";
import styled, { createGlobalStyle } from "styled-components";
import Tabletop from "tabletop";

import Button from "./components/Button";

import fridayGolf from "./friday-golf.png";
import ScoreTable from "./ScoreTable";
import Randomizer from "./Randomizer";
import Adjuster from "./Adjuster";
import GameChanger from "./GameChanger";

function App() {
  const [isGameChangerOn, setIsGameChangerOn] = useState(false);
  const [changers, setChangers] = useState({});
  const [gameChangerIndex, setGameChangerIndex] = useState(undefined);
  const [points, setPoints] = useState({
    b: [-10, 25],
    s: [-10, 25],
    miss: [-10, 25]
  });
  const [rules, setRules] = useState({ avoidNull: false, notSame: false });

  useEffect(() => {
    Tabletop.init({
      key: process.env.REACT_APP_GOOGLE_KEY,
      callback: googleData => {
        const filteredData = googleData.filter(
          data => data.ready === "TRUE" && data.name.length > 0
        );
        setChangers(filteredData);
      },
      simpleSheet: true
    });
  }, []);

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

  const random = () => {
    let newValue;
    let usedValues = store.get("changers") || [];

    if (Object.keys(changers).length === usedValues.length) {
      usedValues = [];
    }

    do {
      newValue = Math.floor(
        Math.random() * (Object.keys(changers).length - 1 + 1) + 0
      );
    } while (usedValues.includes(newValue));

    usedValues.push(newValue);
    store.set("changers", usedValues);

    return newValue;
  };

  // Next: Add some animations if max or min reached e.g.
  return (
    <>
      <Global />
      <Box
        position="fixed"
        display="flex"
        width="100%"
        justifyContent="space-around"
        alignItems="flex-start"
        mt={3}
      >
        <Button
          onClick={() => {
            if (!isGameChangerOn) {
              setIsGameChangerOn(true);
            }
            setGameChangerIndex(random());
          }}
        >
          Game changer
        </Button>
        <Logo src={fridayGolf} alt="friday golf" />
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
        <GameChanger
          isOn={isGameChangerOn}
          index={gameChangerIndex}
          onClose={() => setIsGameChangerOn(false)}
          changers={changers}
        />
        <Randomizer
          points={points}
          rules={rules}
          isGameChangerOn={isGameChangerOn}
        />
      </Wrapper>

      {showScoreTable && <ScoreTable />}
    </>
  );
}

const Logo = styled.img`
  height: 30px;

  @media only screen and (min-width: 600px) {
    height: 140px;
  }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
`;

const Global = createGlobalStyle`
  html, body {
    background-color: #0b0b0b;
  }
`;

export default App;
