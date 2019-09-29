export default (theme: any) => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: theme.color.primary,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIconContainer: {
    display: 'flex',
    width: '80%',
  },
  logoTextContainer: {
    display: 'flex',
    width: '80%',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
})
