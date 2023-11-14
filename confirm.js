import { Auth } from 'aws-amplify';

import configure from './configure.js';

configure();

try {
  Auth.confirmSignUp(
    'velo.yamigiku2@gmail.com',
    '889615' // code
  );
} catch (error) {
  console.log(error);
}
