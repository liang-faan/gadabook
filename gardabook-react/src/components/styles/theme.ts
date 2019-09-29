export default {
  color: {
    primary: '#FFDF00',
    primaryLight: '#FFF2A1',
    primaryDark: '#B39B00',
    secondaryLight: '#735EFF',
    secondaryDark: '#1700B3',
  },
  component: {
    buttonMain: {
      display: 'flex',
      justifyContent: 'center',
      width: '80%',
      height: 25,
      border: '1px black solid',
      borderRadius: 5,
      padding: '15px',
    },
    textInput: {
      background: 'transparent',
      border: 'none',
      '&:focus': {
        outlineWidth: 0,
      },
    },
  },
}
