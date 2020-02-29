import React from "react";
import isEmpty from "lodash/isEmpty";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

export default function GameChanger({ isOn, index, onClose, changers }) {
  const classes = useStyles();

  const props = useSpring({
    width: isOn ? "400px" : "0px",
    visibility: isOn ? "visible" : "hidden",
    transform: isOn ? "translateX(0)" : "translateX(-100%)"
  });

  if (isEmpty(changers) || index === undefined) {
    return null;
  }

  const iconName = changers[index].icon ? changers[index].icon : "favorite";

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

        <Box textAlign="center" mt={8} width="250px">
          <Icon className={classes.icon}>{iconName}</Icon>

          <RulesHeader>{changers[index].name}</RulesHeader>

          <RulesText>{changers[index].description}</RulesText>
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
