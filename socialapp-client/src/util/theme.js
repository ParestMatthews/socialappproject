export default {
  palette: {
    primary: {
      light: '#7289da',
      main: '#7289da',
      dark: '#5e74b8',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff',
    },
    type: 'dark',
  },
  spread: {

    form: {
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'block',
      maxWidth: 500,
      margin: 'auto',
    },
    textField: {
      marginBottom: '1rem',
    },
    pageTitle: {
      marginBottom: '3rem',
    },
    customError: {
      color: 'red',
      fontSize: 15,
      marginBottom: '1rem',
    },
    button: {
      position: 'relative',
    },
    progress: {
      position: 'absolute',
    },
    invisibleSeparator: {
      border: 'none',
      margin: 4,
    },
    visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: 20,
    },
    paper: {
      padding: 20,
      backgroundColor: '#2c2f33',
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%',
        },
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle',
        },
        '& a': {
          color: '#00bcd4',
        },
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0',
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px',
      },
    },
  },
};
