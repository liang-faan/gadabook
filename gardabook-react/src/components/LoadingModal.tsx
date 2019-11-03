import React from 'react'
import injectSheet from 'react-jss'

import styles from './styles/LoadingModal'

const LoadingModal = props => {
  const { classes } = props
  return <div className={classes.root}></div>
}

export default injectSheet(styles)(LoadingModal)
