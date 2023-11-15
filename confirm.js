import { Auth } from 'aws-amplify';

export default function(
  username,
  code) {
  
  let res = false;
  try {
    Auth.confirmSignUp(
      username,
      code
    );
    res = true;
  } catch (error) {
    console.log(error);
  }

  return res;

}
