import { Auth } from 'aws-amplify';

import configure from './configure.js';

configure();

try {
  const { user } = await Auth.signUp({
    username: 'velo.yamigiku2@gmail.com',
    password: 'Wkd44967?z'
  });
  console.log(user);
} catch (error) {
  console.log(error);
}
