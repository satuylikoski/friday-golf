import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import CallMissedIcon from "@material-ui/icons/CallMissed";
import CallMissedOutgoingIcon from "@material-ui/icons/CallMissedOutgoing";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import LooksTwoIcon from "@material-ui/icons/LooksTwo";

import Button from "./components/Button";
import Modal from "./components/Modal";

export default function GameChanger() {
  const [isOpen, setIsOpen] = useState(false);
  const [changer, setChanger] = useState(null);

  const changers = [
    "givePrevious",
    "giveNext",
    "giveSomeone",
    "lightsOff",
    "loosePoints",
    "doublePoints"
  ];

  const iconMapping = {
    giveEarlier: <CallMissedIcon fontSize="large" />,
    giveNext: <CallMissedOutgoingIcon fontSize="large" />,
    giveSomeone: <CardGiftcardIcon fontSize="large" />,
    lightsOff: <Brightness3Icon fontSize="large" />,
    loosePoints: <DeleteForeverIcon fontSize="large" />,
    doublePoints: <LooksTwoIcon fontSize="large" />
  };

  const headers = {
    givePrevious: "Give previous",
    giveNext: "Give next",
    giveSomeone: "Give someone",
    lightsOff: "Lights off",
    loosePoints: "Loose",
    doublePoints: "Double"
  };

  const rules = {
    givePrevious: "Previous player will get your points!",
    giveNext: "Next player will get your points!",
    giveSomeone:
      "Before shooting, select a player who will receive your points",
    lightsOff: "Turn the lights off during this round!",
    loosePoints: "You will loose the points you get from your current points",
    doublePoints: "Congrats! You will get your points x2!"
  };

  const handleChanger = () => {
    setIsOpen(true);
    setChanger(changers[Math.floor(changers.length * Math.random())]);
  };

  return (
    <>
      <Button variant="contained" onClick={() => handleChanger()}>
        Game changer
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h4>Game changer</h4>

        <Box textAlign="center" my={3}>
          {iconMapping[changer]}

          <Box mt={2} mb={6}>
            <h1>{headers[changer]}</h1>
          </Box>

          <h5>{rules[changer]}</h5>
        </Box>
      </Modal>
    </>
  );
}
