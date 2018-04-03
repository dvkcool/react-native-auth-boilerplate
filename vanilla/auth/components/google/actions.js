import {Alert} from 'react-native';
import {storeSession} from '../../actions';
import {clusterName} from '../../../Hasura';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

const tryGoogleLogin = async (token) => {
  let googleInfo = null;
  try {
    const googleResp = await fetch ('https://www.googleapis.com/userinfo/v2/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    googleInfo = await googleResp.json();
  } catch (e) {
    console.log(e);
    return {
      message: e.toString()
    }
  }
  const hasuraAuthUrl = `https://auth.${clusterName}.hasura-app.io/v1/signup`;
  const options = {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": JSON.stringify({
      "provider": "google",
      "data": {
        "access_token": token
      }
    })
  };
  try {
    const response = await fetch(hasuraAuthUrl, options);
    const respObj = await response.json();
    if (response.status == 200) {
      respObj['success'] = true;
      respObj['google_profile_info'] = googleInfo;
    }
    return respObj;
  } catch (e) {
    console.log(e);
    return e;
  }
};
const Googlesignin = async(androidClientId, iosClientId) => {
  GoogleSignin.configure({
       iosClientId: iosClientid,
     })
     .then(() => {
       GoogleSignin.signIn()
       .then((user) => {
         return user;
       })
       .catch((err) => {
         console.log('WRONG SIGNIN', err);
       })
       .done();
     });
}
/*
const handleGoogleAuth = async(androidClientId, iosClientId, loginCallback, startLoadingIndicator, stopLoadingIndicator) => {
  try {
    startLoadingIndicator();
    const result = await Expo.Google.logInAsync({
      androidClientId,
      iosClientId,
      scopes: ['profile', 'email']
    });
    if (result.type === 'success') {

    } else {
      Alert.alert('Error', 'Google login failed');
      stopLoadingIndicator();
    }
  } catch (e) {
    console.log(e);
    stopLoadingIndicator();
  }
}
*/
const handleGoogleAuth = async(androidClientId, iosClientid, loginCallback, startLoadingIndicator, stopLoadingIndicator) => {
result="";
counter = 0;
  try {
    startLoadingIndicator();
   result = await Googlesignin(androidClientId, iosClientid);
    if (result != null) {
      console.log("Result till here: "+result);
      if(result.accessToken != NULL){
        Alert.alert("Hi me");
        const googleSignupResp =  await tryGoogleLogin(result.accessToken);
        if (googleSignupResp.success) {
          await storeSession({
            id: googleSignupResp.hasura_id,
            token: googleSignupResp.auth_token,
            googleInfo: googleSignupResp.google_profile_info,
            type: "google"
          });
          loginCallback({
            id: googleSignupResp.hasura_id,
            token: googleSignupResp.auth_token,
            googleInfo: googleSignupResp.google_profile_info,
            type: "google"
          });
          Alert.alert("Success");
          return;
        } else {
          Alert.alert('Error here', googleSignupResp.message);
        }
      }
    } else {
      Alert.alert('Error', 'Google login failed');
      stopLoadingIndicator();
    }
  } catch (e) {
    console.log(e);
    stopLoadingIndicator();
  }
}

export {
  handleGoogleAuth
};
