import React, { useState } from "react";
import { Box, Heading, Text } from "@freska/freska-ui";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MaterialUISlider from "@material-ui/core/Slider";
import IconButton from "@material-ui/core/IconButton";
import MaterialUICheckbox from "@material-ui/core/Checkbox";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import CloseIcon from "@material-ui/icons/Close";
import ReplayIcon from "@material-ui/icons/Replay";
import CheckIcon from "@material-ui/icons/Check";

import Button from "./components/Button";
import Modal from "./components/Modal";

export default function Adjuster({ onUpdate, initialPoints, initialRules }) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [points, setPoints] = useState(initialPoints);
  const [rules, setRules] = useState(initialRules);

  const handleSetPoints = points => {
    setPoints(points);
  };

  const handleSetRules = rules => {
    setRules(rules);
  };

  const handleClose = (points, rules) => {
    setIsOpen(false);

    if (points && rules) {
      onUpdate(points, rules);
    } else {
      setPoints(initialPoints);
      setRules(initialRules);
    }
  };

  // TODO: Make the initial same as current initial
  // save to local storage
  return (
    <>
      <Button variant="contained" onClick={() => setIsOpen(true)}>
        Adjust
      </Button>

      <Modal isOpen={isOpen} onClose={() => handleClose(null)}>
        <Heading level={2}>Adjust</Heading>
        <Text my={2}>Select min and max values</Text>
        <Box display="grid" style={{ gridTemplateColumns: "80px auto" }} mb={2}>
          <Heading level={3} color="black">
            Big
          </Heading>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            flexGrow={2}
            mx={5}
          >
            <Box display="flex" justifyContent="space-between">
              <Text color="black">{points.b[0]}</Text>
              <Text color="black">{points.b[1]}</Text>
            </Box>
            <Slider
              min={-50}
              max={50}
              value={points.b}
              onChange={(event, newValue) =>
                handleSetPoints({ ...points, b: newValue })
              }
            />
          </Box>
        </Box>

        <Box display="grid" style={{ gridTemplateColumns: "80px auto" }} mb={2}>
          <Heading level={3} color="black">
            Small
          </Heading>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            flexGrow={2}
            mx={5}
          >
            <Box display="flex" justifyContent="space-between">
              <Text color="black">{points.s[0]}</Text>
              <Text color="black">{points.s[1]}</Text>
            </Box>
            <Slider
              min={-50}
              max={50}
              value={points.s}
              onChange={(event, newValue) =>
                handleSetPoints({ ...points, s: newValue })
              }
            />
          </Box>
        </Box>

        <Box display="grid" style={{ gridTemplateColumns: "80px auto" }} mb={2}>
          <Heading level={3} color="black">
            Miss
          </Heading>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            flexGrow={2}
            mx={5}
          >
            <Box display="flex" justifyContent="space-between">
              <Text color="black">{points.miss[0]}</Text>
              <Text color="black">{points.miss[1]}</Text>
            </Box>
            <Slider
              min={-50}
              max={50}
              value={points.miss}
              onChange={(event, newValue) =>
                handleSetPoints({ ...points, miss: newValue })
              }
            />
          </Box>
        </Box>

        <Text mb={2}>Rules</Text>

        <FormControlLabel
          control={
            <Checkbox
              id="avoid-null"
              checkedIcon={<EmojiEmotionsIcon />}
              name="avoid-null-check"
              checked={rules.avoidNull}
              onChange={() =>
                handleSetRules({ ...rules, avoidNull: !rules.avoidNull })
              }
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
              checked={rules.notSame}
              onChange={() =>
                handleSetRules({ ...rules, notSame: !rules.notSame })
              }
            />
          }
          label="Not same numbers in a row"
          className={classes.form}
        ></FormControlLabel>

        <Box display="flex" justifyContent="space-between" mt={3}>
          <IconButton
            onClick={() => {
              setPoints(initialPoints);
              setRules(initialRules);
            }}
          >
            <ReplayIcon fontSize="large" className={classes.cancel} />
          </IconButton>

          <IconButton onClick={() => handleClose(points, rules)}>
            <CheckIcon fontSize="large" className={classes.check} />
          </IconButton>
        </Box>
      </Modal>
    </>
  );
}

const Slider = withStyles({
  root: {
    color: "#fbbe39",
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
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
    "&$checked": {
      color: "#fbbe39"
    }
  },
  checked: {}
})(props => <MaterialUICheckbox color="default" {...props} />);

const useStyles = makeStyles({
  check: {
    color: "#22bb33",
    fontSize: "3rem"
  },
  cancel: {
    color: "#d11a2a",
    fontSize: "3rem"
  },
  close: {
    color: "#D0D0D0",
    fontSize: "2rem"
  },
  form: {
    display: "block"
  },
  checkbox: {
    root: {
      color: "green",
      "&$checked": {
        color: "#fbbe39"
      }
    }
  }
});
