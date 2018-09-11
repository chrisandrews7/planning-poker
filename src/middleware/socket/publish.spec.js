import { expect } from 'chai';
import { spy } from 'sinon';
import { joinGame, setVote } from '../../actions/user';
import { VOTE, JOIN } from '../../constants/eventTypes';

import publish from './publish';

describe('Socket Middleware - Publish', () => {
  const socketMock = {
    emit: spy()
  };

  afterEach(() => {
    socketMock.emit.reset();
  });

  describe('when a USER_JOINED_GAME action is fired', () => {
    it('emits a JOIN event', () => {
      const action = joinGame({
        name: 'Sharon',
        gameId: 345678
      });
      publish(socketMock)()(() => {})(action);

      expect(socketMock.emit).to.have.been.calledWithExactly(JOIN, {
        name: action.payload.name,
        gameId: action.payload.gameId
      });
    });
  });

  describe('when a USER_VOTED action is fired', () => {
    it('emits a VOTE event', () => {
      const action = setVote({
        vote: 13
      });
      publish(socketMock)()(() => {})(action);

      expect(socketMock.emit).to.have.been.calledWithExactly(VOTE, {
        vote: action.payload.vote
      });
    });
  });

  describe('when an action isnt USER_JOINED_GAME or USER_VOTED', () => {
    it('emits nothing ', () => {
      const action = {
        type: 'ANOTHER_ACTION_TYPE'
      };
      publish(socketMock)()(() => {})(action);

      expect(socketMock.emit).to.have.not.been.called;
    });
  });

  it('should invoke the next action', () => {
    const mockNext = spy();
    publish(socketMock)()(mockNext)('action');

    expect(mockNext).to.have.been.calledWith('action');
  });
});