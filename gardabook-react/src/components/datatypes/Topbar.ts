export interface Props {
  classes: {
    [key: string]: string
  }
  signinType: String
  title: String
  cognitoToken: String
  updateShowGoogleLogin: Function
  signout: Function
}

export interface State {}
