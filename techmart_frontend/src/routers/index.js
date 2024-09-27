import SignUpPage from "../pages/SignUpPage/SignUpPage";
import SignInPage from "../pages/SignInPage/SignInPage";
const routes =[
    {
        path: "/signin",
        page: SignInPage,
        isShowHeader: true,
    },
    {
        path: "/signup",
        page: SignUpPage,
        isShowHeader: true,
    }
    
]

export default routes;
