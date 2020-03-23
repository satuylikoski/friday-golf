import React from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import MaterialUIModal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

export default function Modal({ isOpen, onClose, children, header, footer, ...rest }) {
  const classes = useStyles();
  const spring = useSpring({
    from: { opacity: 0 },
    to: { opacity: isOpen ? 1 : 0, outline: 'none' }
  });

  return (
    <MaterialUIModal open={isOpen} onClose={onClose} className={classes.modal}>
      <AnimatedBox style={spring}>
        <Box
          position="sticky"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          top={0}
          bgcolor="#202020"
          borderRadius="0 0 0 5px"
          pl={3}
          pr={2}
          py={1}
          zIndex={1}
        >
          <Typography variant="h5">{header}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon fontSize="small" className={classes.close} />
          </IconButton>
        </Box>
        <Box px={3} {...rest}>
          {children}
        </Box>
      </AnimatedBox>
    </MaterialUIModal>
  );
}

const AnimatedBox = styled(animated(Box))`
  position: relative;
  background-color: #282828;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  color: white;

  @media only screen and (min-width: 600px) {
    height: 80%;
    width: 500px;
  }
`;

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none'
  },
  close: {
    color: 'white'
  }
});
