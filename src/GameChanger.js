import React from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import CallMissedIcon from "@material-ui/icons/CallMissed";
import CallMissedOutgoingIcon from "@material-ui/icons/CallMissedOutgoing";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Filter2Icon from "@material-ui/icons/Filter2";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import GolfCourseIcon from "@material-ui/icons/GolfCourse";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import GroupIcon from "@material-ui/icons/Group";
import HeightIcon from "@material-ui/icons/Height";
import LoopIcon from "@material-ui/icons/Loop";
import LooksTwoIcon from "@material-ui/icons/LooksTwo";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import RedditIcon from "@material-ui/icons/Reddit";
import ScatterPlotIcon from "@material-ui/icons/ScatterPlot";
import TimerIcon from "@material-ui/icons/Timer";
import WrapTextIcon from "@material-ui/icons/WrapText";

import * as data from "./data";

export default function GameChanger({ isOn, index, onClose }) {
  const classes = useStyles();

  const props = useSpring({
    width: isOn ? "400px" : "0px",
    visibility: isOn ? "visible" : "hidden",
    transform: isOn ? "translateX(0)" : "translateX(-100%)"
  });

  const iconMapping = {
    0: <FavoriteIcon className={classes.icon} />,
    1: <HeightIcon className={classes.icon} />,
    2: <CallMissedIcon className={classes.icon} />,
    3: <CallMissedOutgoingIcon className={classes.icon} />,
    4: <CardGiftcardIcon className={classes.icon} />,
    5: <LooksTwoIcon className={classes.icon} />,
    6: <LoopIcon className={classes.icon} />,
    7: <CompareArrowsIcon className={classes.icon} />,
    8: <Brightness3Icon className={classes.icon} />,
    9: <DeleteForeverIcon className={classes.icon} />,
    10: <FormatQuoteIcon className={classes.icon} />,
    11: <Filter2Icon className={classes.icon} />,
    12: <LooksTwoIcon className={classes.icon} />,
    13: <ScatterPlotIcon className={classes.icon} />,
    14: <TimerIcon className={classes.icon} />,
    15: <GolfCourseIcon className={classes.icon} />,
    16: <GroupIcon className={classes.icon} />,
    17: <WrapTextIcon className={classes.icon} />,
    18: <RedditIcon className={classes.icon} />,
    19: <GpsFixedIcon className={classes.icon} />,
    20: <PersonPinCircleIcon className={classes.icon} />,
    21: <OndemandVideoIcon className={classes.icon} />
  };

  return (
    <AnimatedBox style={props} color="white">
      <Box width="300px">
        <Box position="absolute" top="20px" left="20px">
          <h4 style={{ color: "white" }}>Game changer</h4>
        </Box>

        <Box position="absolute" top="6px" right="6px">
          <IconButton onClick={() => onClose()}>
            <CloseIcon fontSize="small" style={{ color: "#ffffff" }} />
          </IconButton>
        </Box>

        <Box textAlign="center" mt={6} width="250px">
          {iconMapping[index]}

          <RulesHeader>{data.changers[index]}</RulesHeader>

          <RulesText>{data.rules[index]}</RulesText>
        </Box>
      </Box>
    </AnimatedBox>
  );
}

const AnimatedBox = styled(animated(Box))`
  height: 65vh;

  background-color: #202020;
  padding: 16px;
  border-radius: 0 4px 4px 0;
  overflow-x: hidden;
`;

const RulesText = styled.h5`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
  text-align: left;

  overflow-y: scroll;
`;

const RulesHeader = styled.h2`
  text-transform: lowercase;
  margin-top: 16px;
  margin-bottom: 32px;
  letter-spacing: 2px;
`;

const useStyles = makeStyles({
  icon: {
    fontSize: "4rem",
    color: "#fcd13f"
  }
});
