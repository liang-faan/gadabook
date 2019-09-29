import React, { Component } from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import styles from './styles/Splash'
import { Props, State } from './datatypes/Splash'
import logoIcon from './images/logo-icon.png'
import logoText from './images/logo-text.png'

class Splash extends Component<Props, State> {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <div className={classes.logoIconContainer}>
            <img className={classes.logoImage} src={logoIcon} alt="Logo Icon" />
          </div>
          <div className={classes.logoTextContainer}>
            <img className={classes.logoImage} src={logoText} alt="Logo Text" />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps() {
  return {}
}

export default connect(
  mapStateToProps,
  {}
)(injectSheet(styles)(Splash))
