import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import CallMissedIcon from "@material-ui/icons/CallMissed";
import CallMissedOutgoingIcon from "@material-ui/icons/CallMissedOutgoing";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import LooksTwoIcon from "@material-ui/icons/LooksTwo";
import ScatterPlotIcon from "@material-ui/icons/ScatterPlot";
import ThumbsUpDownIcon from "@material-ui/icons/ThumbsUpDown";

import Button from "./components/Button";
import Modal from "./components/Modal";

export default function GameChanger() {
  const [isOpen, setIsOpen] = useState(false);
  const [changer, setChanger] = useState(null);
  const classes = useStyles();

  const changers = [
    "borrow",
    "givePrevious",
    "giveNext",
    "giveSomeone",
    "hitTwice",
    "leftIsRight",
    "lightsOff",
    "loosePoints",
    "doublePoints",
    "threeBalls"
  ];

  const iconMapping = {
    borrow: <ThumbsUpDownIcon className={classes.icon} />,
    givePrevious: <CallMissedIcon className={classes.icon} />,
    giveNext: <CallMissedOutgoingIcon className={classes.icon} />,
    giveSomeone: <CardGiftcardIcon className={classes.icon} />,
    hitTwice: <LooksTwoIcon className={classes.icon} />,
    leftIsRight: <CompareArrowsIcon className={classes.icon} />,
    lightsOff: <Brightness3Icon className={classes.icon} />,
    loosePoints: <DeleteForeverIcon className={classes.icon} />,
    doublePoints: <LooksTwoIcon className={classes.icon} />,
    threeBalls: <ScatterPlotIcon className={classes.icon} />
  };

  const headers = {
    borrow: "Borrow",
    givePrevious: "Previous",
    giveNext: "Next",
    giveSomeone: "Gift",
    hitTwice: "Twice",
    leftIsRight: "Left is right",
    lightsOff: "Lights off",
    loosePoints: "Loose",
    doublePoints: "Double",
    threeBalls: "Three balls"
  };

  const rules = {
    borrow:
      "Decide points whose points you want. As a turn, (s)he will get your points! (Nb: If someone is selected multiple times, he will get more points)",
    givePrevious: "Previous player will get your points!",
    giveNext: "Next player will get your points!",
    giveSomeone: "Before shooting, select a player who will get your points!",
    hitTwice: "Hit the ball twice instead of once!",
    leftIsRight: "You are only allowed to use your wrong hand!",
    lightsOff: "Turn the lights off during this round!",
    loosePoints:
      "The amount of points you get will be reduced from your current points!",
    doublePoints: "Congrats! You will get your points x2!",
    threeBalls: "Hit three balls at once!"
  };

  const handleChanger = () => {
    setIsOpen(true);

    let newValue;
    do {
      newValue = changers[Math.floor(changers.length * Math.random())];
    } while (newValue === changer);

    setChanger(newValue);
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

const useStyles = makeStyles({
  icon: {
    fontSize: "4rem"
  }
});
