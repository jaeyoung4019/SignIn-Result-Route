import React, {lazy} from 'react';
import CreateOrganization from '../pages/organization/CreateOrganization';
import CommonLayout from "../Components/Layouts/Main/CommonLayout";
import Index from "../Components/Ui/Loadable";
import SignInResultRoute from "../Components/Views/SignUp/SignInResultRoute";


const SignUpLazy = Index(
    lazy(() => import('../pages/sign/SignUp'))
);


const Create = {
    path: '/new',
    element: <CommonLayout />,
    children: [
        {
            path: 'user',
            element: (
                <SignInResultRoute>
                    <SignUpLazy />
                </SignInResultRoute>
            ),
        },
        {
            path: 'organization',
            element: <CreateOrganization />,
        },
    ],
};

export default Create;
