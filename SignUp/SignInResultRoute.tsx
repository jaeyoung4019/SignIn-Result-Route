import React, {createContext, useEffect, useState} from 'react';
import {LayoutSingleProps} from "../../../@types/layout";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useAppDispatch} from "../../../store/hooks";
import {getCookie} from "../../../utils/cookie";
import {activeJoinUserToken, activeUserToken} from "../../../store/slices/userSlice";
import {ApiConfig} from "../../../libs/api/authApi/apiConfig";
import {apiRequest} from "../../../libs/api/apiInstance";
import Loading from "../../Ui/Loadable/Loading";

interface contextProps {
    userInfo: childrenProps | undefined
}
export const userInfoContext = createContext<contextProps>({userInfo: {}});
const SignInResultRoute = ({children} : any) => {


    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const authTokenCookie = getCookie("accessToken");
    const refreshTokenCookie = getCookie("refreshToken")
    const [searchParams, setSearchParams] = useSearchParams();
    const isInvite = searchParams.get("isInvite");
    const config = new ApiConfig.Builder().setUrl("/auth/signin").setParam(null).build();


    const [isLoading , setIsLoading] = useState<boolean>(true);
    const [userInfo , setUserInfo] = useState<childrenProps>();

    useEffect(() => {
        if (isInvite === 'false') {
            if (authTokenCookie != null) {
                dispatch(
                    activeUserToken(
                        {
                            isToken: true,
                            isJoin: false,
                            token: authTokenCookie,
                            refresh_token: refreshTokenCookie,
                        }))

                apiRequest.iam.get(config).then(r => {
                    const data = r.data.response;
                    console.log(data.userInfo)
                    setUserInfo(data.userInfo)
                    const signYesOrNot = data.signupYn === 'Y';
                    if (signYesOrNot) {
                        dispatch(activeJoinUserToken())
                        navigate("/", {replace: true})
                    }
                })
            }
        } else {
            // 초대 전용 페이지로
        }
        setIsLoading(() => false)
    }, [])

    return (
        isLoading ? <Loading /> : <userInfoContext.Provider value={{userInfo: userInfo}}>{children}</userInfoContext.Provider>
    )
}

export default SignInResultRoute;