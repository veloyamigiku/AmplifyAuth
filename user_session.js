import { Auth } from 'aws-amplify';

export default async function() {
  
  let currentAuthUser = null;
  let session = null;
  try {
    const tmpCurrentAuthUser = await Auth.currentAuthenticatedUser();
    currentAuthUser = tmpCurrentAuthUser;
    const tmpSession = await Auth.userSession(currentAuthUser);
    session = tmpSession;
    if (session) {
      if (session.isValid()) {
        console.log('セッションが有効です。');
      } else {
        console.log('セッションが無効です。');
      }
    } else {
      console.log('セッションが無効です。');
    }
  } catch (error) {
    console.warn(error);
  }

  return { currentAuthUser, session };

}