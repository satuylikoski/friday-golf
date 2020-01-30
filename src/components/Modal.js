import React from "react";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import Box from "@material-ui/core/Box";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import MaterialUIModal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

export default function Modal({ isOpen, onClose, children }) {
  const classes = useStyles();
  const spring = useSpring({
    from: { opacity: 0 },
    to: { opacity: isOpen ? 1 : 0, outline: "none" }
  });

  return (
    <MaterialUIModal open={isOpen} onClose={onClose} className={classes.modal}>
      <AnimatedBox pt={3} px={3} pb={1} style={spring}>
        <Box position="absolute" top="6px" right="6px">
          <IconButton onClick={onClose}>
            <CloseIcon fontSize="small" className={classes.close} />
          </IconButton>
        </Box>
        {children}
      </AnimatedBox>
    </MaterialUIModal>
  );
}

const AnimatedBox = styled(animated(Box))`
  position: relative;
  background-color: white;
  border-radius: 5px;
  min-width: 500px;
`;

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none"
  }
});
