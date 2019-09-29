export default (theme: any) => ({
  topbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    width: 'calc(100% - 20px)',
    height: 40,
    padding: '0px 10px',
    backgroundColor: 'orange',
    boxShadow: '0px 3px 6px lightgrey',
    zIndex: 99999,
  },
  logoContainer: {
    width: 23,
  },
  hamburger: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  hamburgerLine: {
    width: 20,
    height: 3,
    margin: 2,
    backgroundColor: 'black',
  },
  page: {
    fontSize: 20,
  },
})
