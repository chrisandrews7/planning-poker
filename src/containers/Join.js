import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { joinGame } from '../actions/user';
import { ENTER_NAME } from '../constants/dictionary';

export const mapDispatchToProps = dispatch => bindActionCreators({ joinGame }, dispatch);

export class Join extends Component {
  static propTypes = {
    joinGame: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        gameId: PropTypes.string
      }).isRequired
    }).isRequired
  }


  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  setName = ({ target }) => {
    this.setState({
      name: target.value
    });
  }

  joinGame = () => {
    this.props.joinGame({
      gameId: this.props.match.params.gameId,
      name: this.state.name
    });
  }

  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-4">Join</h1>
        <div className="input-group">
          <input
            type="text"
            placeholder={ENTER_NAME}
            value={this.state.name}
            onChange={this.setName}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.joinGame}
          >
           Join
          </button>
        </div>
      </div>
    );
  }
}

export default connect(undefined, mapDispatchToProps)(Join);
