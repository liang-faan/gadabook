export default (theme: any) => ({
  root: {
    height: 'calc(var(--vh, 1vh) * 100)',
    maxWidth: 480,
    margin: '0 auto',
    fallbacks: { height: '100vh' },
    fontFamily: 'Roboto, sans-serif',
  },
  '@global': {
    a: {
      textDecoration: 'none',
    },
  },
  signInButtonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  google: {
    ...theme.component.buttonMain,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5px',
    backgroundColor: 'white',
  },
  signInText: {
    display: 'flex',
    justifyContent: 'center',
    width: 200,
    marginLeft: 20,
  },
})
