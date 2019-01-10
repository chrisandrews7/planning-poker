import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import { spy, stub } from 'sinon';
import * as idUtils from '../utils/idGenerator';
import { Home } from './Home';

describe('Home Container', () => {
  const connect = (state, props) => shallow(
    <Home {...state} {...props} />
  );

  describe('Home', () => {
    describe('when a gameId is entered and submitted', () => {
      it('navigates to that game', () => {
        const gameId = 'Test123';

        const historySpy = spy();
        const wrapper = connect({}, {
          history: {
            push: historySpy
          }
        });

        wrapper.find('input').simulate('change', { target: { value: 'someId' } });
        wrapper.find('input').simulate('change', { target: { value: gameId } });

        wrapper.find('form').simulate('submit');

        expect(historySpy).to.have.been.calledOnceWith(`/${gameId}`);
      });
    });

    describe('when start a new game is clicked', () => {
      it('navigates to a randomly generated game', () => {
        const randomGameId = 'R12345';
        stub(idUtils, 'generateShortId').returns(randomGameId);

        const historySpy = spy();
        const wrapper = connect({}, {
          history: {
            push: historySpy
          }
        });

        wrapper.find('.home-panel__start-btn').simulate('click', { target: {} });

        expect(historySpy).to.have.been.calledOnceWith(`/${randomGameId}`);
      });
    });
  });
});