import { Amplify, Auth } from 'aws-amplify';

export default function() {

  Amplify.configure({
    Auth: {
      identityPoolId: '',
      region: '',
      userPoolId: '',
      userPoolWebClientId: ''
    }
  });
};
