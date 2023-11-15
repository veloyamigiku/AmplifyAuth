import { Auth } from 'aws-amplify';

export default async function(
    username,
    password) {
    
    let signin_user = null;
    try {
        const user = await Auth.signIn(
            username,
            password
        )
        signin_user = user;
    } catch (error) {
        console.log('error signing in/out:', error);
    }

    return signin_user;
};
