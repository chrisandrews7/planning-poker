import { expect } from 'chai';
import { shallow } from 'enzyme';
import faker from 'faker';
import React from 'react';
import { map } from 'lodash';
import { NO_PLAYERS } from '../../../../src/shared/constants/dictionary';
import Gameboard from '../../../../src/client/components/Gameboard';
import Player from '../../../../src/client/components/Player';

describe('Gameboard Component', () => {
  it('renders a message when no player prop has been passed', () => {
    const wrapper = shallow(<Gameboard />);
    expect(wrapper.find('.gameboard').text()).to.equal(NO_PLAYERS);
  });

  it('renders a message when an empty player prop is passed', () => {
    const wrapper = shallow(<Gameboard players={{}} />);
    expect(wrapper.find('.gameboard').text()).to.equal(NO_PLAYERS);
  });

  it('renders a list of player components with the relevant props', () => {
    const votes = {
      [faker.name.firstName()]: {
        name: faker.name.firstName(),
        vote: faker.random.number()
      },
      [faker.name.firstName()]: {
        name: faker.name.firstName(),
        vote: faker.random.number()
      }
    };
    const wrapper = shallow(<Gameboard players={votes} />);

    // Name Prop
    const playerNames = wrapper.find(Player).map(node => node.props().name);
    expect(playerNames).to.deep.equal(map(votes, 'name'));

    // Vote Prop
    const playerVotes = wrapper.find(Player).map(node => node.props().vote);
    expect(playerVotes).to.deep.equal(map(votes, 'vote'));
  });
});
