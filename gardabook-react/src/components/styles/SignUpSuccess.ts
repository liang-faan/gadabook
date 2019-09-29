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
  buttonsContainer: {
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
})
