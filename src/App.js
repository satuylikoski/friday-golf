import React, { useState, useEffect } from "react";
import store from "store";
import { Provider } from "@freska/freska-ui";
import styled from "styled-components";

import "./App.css";
import fridayGolf from "./friday-golf.png";
import ScoreTable from "./ScoreTable";
import Randomizer from "./Randomizer";
import Adjuster from "./Adjuster";

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
    <Provider>
      <Wrapper>
        <Img src={fridayGolf} alt="friday golf" />

        {showScoreTable && <ScoreTable />}

        <Randomizer points={points} rules={rules} />

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
      </Wrapper>
    </Provider>
  );
}

const Img = styled.img`
  height: 180px;
`;

const Wrapper = styled.div`
  background-color: #0b0b0b;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default App;
