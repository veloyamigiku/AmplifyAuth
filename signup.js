import { Auth } from 'aws-amplify';

export default async function(
  username,
  password) {
  
  let new_user = null;
  try {
    const { user } = await Auth.signUp({
      username: username,
      password: password
    });
    new_user = user;
  } catch (error) {
    console.log(error);
  }

  return new_user;

};
