import { Auth } from 'aws-amplify';

import configure from './configure.js';

configure();

const currentAuthUser = await Auth.currentAuthenticatedUser();

const session = await Auth.userSession(currentAuthUser);

if (session) {
  if (session.isValid()) {
    console.log('セッションが有効です。');
  } else {
    console.log('セッションが無効です。');
  }
} else {
  console.log('セッションが無効です。');
}
