import {Alert} from 'react-native';
import {storeSession} from '../../actions';
import {clusterName} from '../../../Hasura';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

const handleGoogleAuth = async(androidClientId, iosClientid, loginCallback, startLoadingIndicator, stopLoadingIndicator) => {
  GoogleSignin.configure({
    iosClientId: iosClientid,
  })
  .then(() => {
    GoogleSignin.signIn()
    .then((user) => {
      const hasuraAuthUrl = `https://auth.${clusterName}.hasura-app.io/v1/signup`;
      const options = {
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "body": JSON.stringify({
          "provider": "google",
          "data": {
            "access_token": user.accessToken
          }
        })
      };
      try {
        fetch(hasuraAuthUrl, options)
        .then((res) => res.json())
        .then((respObj)=>{
          respObj['success'] = true;
          respObj['google_profile_info'] = user;
          storeSession({
            id: respObj.hasura_id,
            token: respObj.auth_token,
            googleInfo: respObj.google_profile_info,
            type: "google"
          });
          loginCallback({
            id: respObj.hasura_id,
            token: respObj.auth_token,
            googleInfo: respObj.google_profile_info,
            type: "google"
          });
        });
      } catch (e) {
      console.log(e);
      return e;
      }
    })
    .catch((err) => {
    console.log('WRONG SIGNIN', err);
    })
    .done();
  });
}
export {
  handleGoogleAuth
};
