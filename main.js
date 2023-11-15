import { Auth } from 'aws-amplify';
import * as rl from 'readline';

import configure from './configure.js';
import confirm from './confirm.js';
import signin from './signin.js';
import signup from './signup.js';
import user_session from './user_session.js';


configure();
const currentConfig = Auth.configure();

function readUserInput(question) {
    
    const readline = rl.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    return new Promise((resolve, reject) => {
        readline.question(
            question,
            (answer) => {
                resolve(answer);
                readline.close();
            }
        );
    });
}

const config = `
[config]=====================
    IDプールID: ${currentConfig.identityPoolId}
    リージョン: ${currentConfig.region}
    ユーザプールID: ${currentConfig.userPoolId}
    ユーザプールクライアントID: ${currentConfig.userPoolWebClientId}
=============================`;

const menu = `
[menu]=====================
    1.サインアップ
    2.サインイン
    3.サインアウト
===========================
実行するアクションの番号を入力してください:`;

(async function main() {
    while (true) {

        console.log(config);
        
        const { currentAuthUser, session } = await user_session();
        if (currentAuthUser && session) {
            const currentAuthUserSession = `
[session]=====================
ユーザ名: ${currentAuthUser.username}
メールアドレス: ${currentAuthUser.attributes.email}
アクセストークン:  ${session.accessToken.jwtToken}
アクセストークン期限: ${session.accessToken.payload.exp}
IDトークン: ${session.idToken.jwtToken}
IDトークン期限: ${session.idToken.payload.exp}
リフレッシュトークン: ${session.refreshToken.token}
==============================`;
            console.log(currentAuthUserSession);
        }

        const actionId = parseInt(await readUserInput(menu));

        switch (actionId) {
            case 1:
                await execSignup();
                break;
            case 2:
                await execSignin();
                break;
            case 0:
                console.log('end');
                return;
            default:
                action1();
                break;
        }
    }
})();

async function execSignup() {
    console.log('登録するユーザ情報を入力してください。');
    const username = await readUserInput('ユーザ名:');
    const password = await readUserInput('パスワード:');
    const user = await signup(
        username,
        password);
    if (!user) {
        return;
    }
    console.log('確認コードを入力してください。');
    const code = await readUserInput('コード:');
    const confirmRes = await confirm(
        username,
        code);
    if (confirmRes) {
        console.log('登録完了');
    }
    
}

async function execSignin() {
    console.log('ユーザ情報を入力してください。');
    const username = await readUserInput('ユーザ名:');
    const password = await readUserInput('パスワード:');
    const user = await signin(
        username,
        password);
    if (user) {
        console.log('サインイン成功');
    }
}
