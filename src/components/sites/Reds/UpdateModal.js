import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import UpdatePage from './UpdatePage'
 
export default class UpdateModal extends React.Component {
  state = {
    open: false
  };
 
  onOpenModal = () => {
    this.setState({ open: true });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
    this.props.showUpdate()
  };

  componentDidMount() {
      this.setState({ open: true })
  }
 
  render() {
    const { open } = this.state;
    return (
      <div>
        <button onClick={this.onOpenModal}>Open modal</button>
        <Modal open={open} onClose={this.onCloseModal} center>
          <UpdatePage wine={this.props.wine} refresh={this.props.refresh} showCreate={this.props.showUpdate} />
        </Modal>
      </div>
    );
  }
}
 
