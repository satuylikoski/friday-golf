import React from 'react';
import clsx from 'clsx';
import MaterialUIButton from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    color: 'white',
    backgroundColor: '#0b0b0b',
    textTransform: 'lowercase',
    border: '2px solid #0b0b0b',
    boxShadow: 'none',
    fontSize: '20px',
    fontWeight: '600',
    width: '250px',
    '&:hover': {
      backgroundColor: '#0b0b0b',
      color: 'white',
      borderColor: '#fcd13f'
    },
    '&:disabled': {
      color: 'grey'
    },
    [theme.breakpoints.up('md')]: {
      width: '300px',
      fontSize: '30px'
    }
  },
  border: {
    [theme.breakpoints.up('sm')]: {
      borderColor: '#fcd13f'
    }
  }
}));

export default function Button({ children, highlight, ...rest }) {
  const classes = useStyles();
  return (
    <MaterialUIButton className={clsx(classes.root, { [classes.border]: highlight })} {...rest}>
      {children}
    </MaterialUIButton>
  );
}
