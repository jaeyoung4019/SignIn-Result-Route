import React, {useEffect} from 'react';
import SignUpLayout from "../../Components/Views/SignUp";

const SignUp = () => {
    useEffect(() => {
        console.log("page")
    }, [])

    return(
        <SignUpLayout />
    )
}
export default SignUp;