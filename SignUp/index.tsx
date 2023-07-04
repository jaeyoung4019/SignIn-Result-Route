import React, {useContext} from 'react';
import {userInfoContext} from "./SignInResultRoute";

const SignUpLayout = ({userInfo}: any) => {
    console.log(userInfo)
    const state = useContext(userInfoContext);
    console.log(state.userInfo)
    return (<>111</>)
}

export default SignUpLayout;