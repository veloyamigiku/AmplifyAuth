import { Amplify, Auth } from 'aws-amplify';
import * as dotenv from 'dotenv';

dotenv.config();

export default function() {

  Amplify.configure({
    Auth: {
      identityPoolId: process.env.identity_pool_id,
      region: process.env.region,
      userPoolId: process.env.user_pool_id,
      userPoolWebClientId: process.env.user_pool_web_client_id
    }
  });
};
