import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import CallMissedIcon from "@material-ui/icons/CallMissed";
import CallMissedOutgoingIcon from "@material-ui/icons/CallMissedOutgoing";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import Filter2Icon from "@material-ui/icons/Filter2";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import HeightIcon from "@material-ui/icons/Height";
import LoopIcon from "@material-ui/icons/Loop";
import LooksTwoIcon from "@material-ui/icons/LooksTwo";
import ScatterPlotIcon from "@material-ui/icons/ScatterPlot";
import TimerIcon from "@material-ui/icons/Timer";

import Button from "./components/Button";
import Modal from "./components/Modal";

export default function GameChanger() {
  const [isOpen, setIsOpen] = useState(false);
  const [changer, setChanger] = useState(null);
  const classes = useStyles();

  const changers = [
    "flip",
    "givePrevious",
    "giveNext",
    "giveSomeone",
    "hitTwice",
    "inverse",
    "leftIsRight",
    "lightsOff",
    "loosePoints",
    "nameHole",
    "doubleHit",
    "doublePoints",
    "threeBalls",
    "timer"
  ];

  const iconMapping = {
    flip: <HeightIcon className={classes.icon} />,
    givePrevious: <CallMissedIcon className={classes.icon} />,
    giveNext: <CallMissedOutgoingIcon className={classes.icon} />,
    giveSomeone: <CardGiftcardIcon className={classes.icon} />,
    hitTwice: <LooksTwoIcon className={classes.icon} />,
    inverse: <LoopIcon className={classes.icon} />,
    leftIsRight: <CompareArrowsIcon className={classes.icon} />,
    lightsOff: <Brightness3Icon className={classes.icon} />,
    loosePoints: <DeleteForeverIcon className={classes.icon} />,
    nameHole: <FormatQuoteIcon className={classes.icon} />,
    doubleHit: <Filter2Icon className={classes.icon} />,
    doublePoints: <LooksTwoIcon className={classes.icon} />,
    threeBalls: <ScatterPlotIcon className={classes.icon} />,
    timer: <TimerIcon className={classes.icon} />
  };

  const headers = {
    flip: "Flip it",
    givePrevious: "Previous",
    giveNext: "Next",
    giveSomeone: "Gift",
    hitTwice: "Double Tap",
    inverse: "Inverse",
    leftIsRight: "Left is right",
    lightsOff: "Lights Out",
    loosePoints: "Lose",
    nameHole: "Name your shot",
    doubleHIt: "Double hit, single score",
    doublePoints: "Double trouble",
    threeBalls: "Three balls",
    timer: "Timer"
  };

  // Need to be fixed:
  // borrow

  const rules = {
    flip:
      "You must use the handle of the golf club to hit the ball, and hold the 'club' end.",
    givePrevious:
      "The player before you gets your points. The first player of the round gives his/her points for the last.",
    giveNext:
      "The player after you gets your points. Last player of the round gives his/her points for the first.",
    giveSomeone:
      "You take your shot and then decide who you give your points to.  One person can receive multiple people's points.  If no one chooses you to receive points, you get 0.  You cannot choose yourself.",
    hitTwice:
      "You must hit the ball twice to get it into the hole.  Your first hit must not score the point, and should move the ball.  On your second hit, you may try and score a point.",
    inverse:
      "You take your shot and then decide who to inverse your points with.  For example, if you get 5 points, they get -5, and if you get -10, they get 10.  One person can receive multiple people's points.  If no one chooses you to receive points, you get 0.  You cannot choose yourself.",
    leftIsRight:
      "If you are usually right handed, you hold the club left-handed, and vice versa.",
    lightsOff: "We play the round with the lights off",
    loosePoints:
      "The aim of this is that everyone looses points on the round.  You take your shot and then decide who should loose the number of points you get.  For example, if you score 10 points, whoever you choose looses 10 points (and you don't get any).  If you score -10, the other person still looses 10 points.  One person can loose points from multiple people's.  If no one chooses you to receive points, you get 0.  You cannot choose yourself.",
    nameHole:
      "You name which hole you are aiming for.  If you get it, double points.  If you get another hole, it's 0-points.  If you miss, it's the same as a miss.",
    doubleHit: "You take 2 shots and get the highest value",
    doublePoints:
      "Congrats! Whatever points you get are doubled.  Remember, if you get a negative number, this will mean you lose even more points.  For example, if you score 5 points, this will be doubled to 10.  If you score -5, this will be doubled to -10.  If you get 0, that's still 0.",
    threeBalls:
      "There are three balls on the green at once.  You get one hit to hit all three balls at once, and you will get points from all of them. For example if one is a miss and two goes to the small hole - you will get small hole points x2 and miss points x1.",
    timer:
      "You stand 3 feet away from the golf course.  You have 5 seconds to walk over and take your shot.  If you do not hit the ball before the time is up, it is counted as a miss.  If you hit the ball before the time are up, then all is normal."
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
