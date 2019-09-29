export default (theme: any) => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: theme.color.primaryLight,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIconContainer: {
    display: 'flex',
    width: '20%',
  },
  logoIcon: {
    width: '100%',
  },
  title: {
    marginLeft: 20,
    fontSize: 30,
  },
  fieldContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  underlinedContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '80%',
    padding: '20px 0px 10px 10px',
    borderBottom: '1px black solid',
  },
  fieldText: {
    paddingLeft: 10,
  },
  signInButtonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  signIn: {
    ...theme.component.buttonMain,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5px',
    backgroundColor: theme.color.primary,
  },
  facebook: {
    ...theme.component.buttonMain,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5px',
    backgroundColor: '#4267B2',
    color: 'white',
  },
  google: {
    ...theme.component.buttonMain,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5px',
    backgroundColor: 'white',
  },
  signInForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  signInText: {
    display: 'flex',
    justifyContent: 'center',
    width: 200,
    marginLeft: 20,
  },
  textInput: {
    ...theme.component.textInput,
  },
  link: {
    fontWeight: 900,
    color: theme.color.secondaryLight,
    '&:hover': {
      cursor: 'pointer',
      color: theme.color.secondaryDark,
    },
  },
  or: {
    margin: 10,
  },
})
