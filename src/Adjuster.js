import React, { useState } from 'react';
import { Observer } from 'mobx-react-lite';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MaterialUISlider from '@material-ui/core/Slider';
import IconButton from '@material-ui/core/IconButton';
import MaterialUICheckbox from '@material-ui/core/Checkbox';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import ReplayIcon from '@material-ui/icons/Replay';
import CheckIcon from '@material-ui/icons/Check';

import useStore from './hooks/store';

import Button from './components/Button';
import Modal from './components/Modal';

export default function Adjuster() {
  const classes = useStyles();
  const store = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [points, setPoints] = useState(store.points);
  const [rules, setRules] = useState(store.rules);

  const handleSetPoints = points => {
    setPoints(points);
  };

  const handleSetRules = rules => {
    setRules(rules);
  };

  const reset = () => {
    setPoints(store.points);
    setRules(store.rules);
  };

  const handleClose = save => {
    setIsOpen(false);

    // Reset the values if changes don't want to be saved
    if (save) {
      store.updatePoints(points);
      store.updateRules(rules);
    } else {
      reset();
    }
  };

  // TODO: Make the initial same as current initial
  // save to local storage
  return (
    <Observer>
      {() => (
        <>
          <Button variant="contained" onClick={() => setIsOpen(true)}>
            Adjust
          </Button>

          <Modal isOpen={isOpen} onClose={() => handleClose(false)}>
            <h1>Adjust</h1>
            <Box my={2}>
              <p>Select min and max values</p>
            </Box>

            <Box display="grid" style={{ gridTemplateColumns: '80px auto' }} mb={2}>
              <h1>Big</h1>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                flexGrow={2}
                mx={5}
              >
                <Box display="flex" justifyContent="space-between">
                  <p>{points.big[0]}</p>
                  <p>{points.big[1]}</p>
                </Box>
                <Slider
                  min={-50}
                  max={50}
                  value={points.big}
                  onChange={(event, newValue) => handleSetPoints({ ...points, big: newValue })}
                />
              </Box>
            </Box>

            <Box display="grid" style={{ gridTemplateColumns: '80px auto' }} mb={2}>
              <h1>Small</h1>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                flexGrow={2}
                mx={5}
              >
                <Box display="flex" justifyContent="space-between">
                  <p>{points.small[0]}</p>
                  <p>{points.small[1]}</p>
                </Box>
                <Slider
                  min={-50}
                  max={50}
                  value={points.small}
                  onChange={(event, newValue) => handleSetPoints({ ...points, small: newValue })}
                />
              </Box>
            </Box>

            <Box display="grid" style={{ gridTemplateColumns: '80px auto' }} mb={2}>
              <h1>Miss</h1>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                flexGrow={2}
                mx={5}
              >
                <Box display="flex" justifyContent="space-between">
                  <p>{points.miss[0]}</p>
                  <p>{points.miss[1]}</p>
                </Box>
                <Slider
                  min={-50}
                  max={50}
                  value={points.miss}
                  onChange={(event, newValue) => handleSetPoints({ ...points, miss: newValue })}
                />
              </Box>
            </Box>

            <p>Rules</p>

            <FormControlLabel
              mt={2}
              control={
                <Checkbox
                  id="avoid-null"
                  checkedIcon={<EmojiEmotionsIcon />}
                  name="avoid-null-check"
                  checked={rules.avoidNull}
                  onChange={() => handleSetRules({ ...rules, avoidNull: !rules.avoidNull })}
                  className={classes.checkbox}
                />
              }
              label="Skip zero"
            ></FormControlLabel>

            <FormControlLabel
              control={
                <Checkbox
                  id="not-same"
                  checkedIcon={<EmojiEmotionsIcon />}
                  name="not-same-check"
                  checked={rules.notSameNumber}
                  onChange={() => handleSetRules({ ...rules, notSameNumber: !rules.notSameNumber })}
                />
              }
              label="Not same numbers in a row"
              className={classes.form}
            ></FormControlLabel>

            <Box display="flex" justifyContent="space-between" mt={3}>
              <IconButton onClick={reset}>
                <ReplayIcon fontSize="large" className={classes.cancel} />
              </IconButton>

              <IconButton onClick={() => handleClose(true)}>
                <CheckIcon fontSize="large" className={classes.check} />
              </IconButton>
            </Box>
          </Modal>
        </>
      )}
    </Observer>
  );
}

const Slider = withStyles({
  root: {
    color: '#fcd13f',
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit'
    }
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)'
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(MaterialUISlider);

const Checkbox = withStyles({
  root: {
    // color: "#fbbe39",
    '&$checked': {
      color: '#fbbe39'
    }
  },
  checked: {}
})(props => <MaterialUICheckbox color="default" {...props} />);

const useStyles = makeStyles({
  check: {
    color: '#22bb33',
    fontSize: '3rem'
  },
  cancel: {
    color: '#d11a2a',
    fontSize: '3rem'
  },
  close: {
    color: '#D0D0D0',
    fontSize: '2rem'
  },
  form: {
    display: 'block'
  },
  checkbox: {
    root: {
      color: 'green',
      '&$checked': {
        color: '#fbbe39'
      }
    }
  }
});
