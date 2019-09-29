export default (theme: any) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: 'calc(100% - 90px)',
    backgroundColor: theme.color.primaryLight,
    padding: '40px 0px 50px 0px',
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100% - 50px - 30px)',
    width: 'calc(100% - 30px)',
    marginTop: 10,
    backgroundColor: 'white',
    boxShadow: '0px 3px 6px lightgrey',
  },
  scrollContainer: {
    overflowY: 'scroll',
  },
  details1: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    height: 25,
    padding: 5,
    fontSize: 14,
  },
  details2: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0px 12px 0px 12px',
    paddingBottom: 12,
    borderBottom: '1px solid lightgrey',
  },
  details3: {
    display: 'flex',
    flexDirection: 'column',
    margin: '12px 12px 12px 12px',
    overflowY: 'hidden',
  },
  title: {
    fontSize: 20,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
  },
  owner: {
    fontSize: 12,
  },
  detailsItem: {
    marginTop: 5,
    fontSize: 16,
  },
  tagAndLike: {
    marginTop: 5,
    fontSize: 16,
    color: 'lightgrey',
  },

  bookNow: {
    ...theme.component.buttonMain,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px',
    backgroundColor: theme.color.primary,
  },
  bookNowText: {},
})
