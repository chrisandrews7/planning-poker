import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import fakeStore from '../../fixtures/mocks/fakeStore';
import RootContainer from '../../../src/client/containers/Root';
import routes from '../../../src/client/routes';

describe('Root Container', () => {
  it('should render the redux provider with the store', () => {
    const store = fakeStore({ 1: 'test' });
    const wrapper = shallow(<RootContainer store={store} />);

    expect(
      wrapper
        .find(Provider)
        .props()
        .store
    ).to.deep.equal(store);
  });

  it('should render a router with the history prop and route list', () => {
    const history = 'testHistory';
    const wrapper = shallow(<RootContainer history={history} />);

    const props =
      wrapper
      .find(Router)
      .props();

    expect(props.history).to.equal(history);
    expect(props.routes).to.equal(routes);
  });
});
