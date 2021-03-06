import React from 'react';
import PropTypes from 'prop-types';
import { CallbackComponent } from 'redux-oidc';
import userManager from '../util/user-manager';
import _ from 'lodash';

class CallbackPage extends React.Component {
  successCallback() {
    this.context.router.push('/');
  }
  render() {
    // just redirect to '/' in both cases
    const successCallback = _.bind(this.successCallback, this);
    return (
      <CallbackComponent userManager={userManager} successCallback={successCallback} errorCallback={successCallback}>
        <div>
          Redirecting...
        </div>
      </CallbackComponent>
    );
  }
}

CallbackPage.contextTypes = {
  router: PropTypes.object
};

export default CallbackPage;
