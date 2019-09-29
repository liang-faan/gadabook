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
})
