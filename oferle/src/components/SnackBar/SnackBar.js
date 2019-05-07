import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';

class FadeSnackbar extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  }
  handleClose = () => {

    this.setState({ open: false });
    this.props.onclose(false)

  };

  render() {
    const styles = {
      root: {
        background: 'red'
      }
    };

    return (
      <div>

        <Snackbar
          ContentProps={{
            classes: {
              root: styles.root
            }
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          autoHideDuration={this.props.duration}
          open={this.props.snackbar.show}
          //onClose={this.handleClose}
          TransitionComponent={Fade}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.snackbar.message}</span>}
        />

      </div>
    );
  }
}

export default FadeSnackbar;