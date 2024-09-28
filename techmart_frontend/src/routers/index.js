import SignUpPage from "../pages/SignUpPage/SignUpPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import ProfilePage from "../pages/Profile/ProfilePage";
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
    },
    {
        path: "/profile",
        page:  ProfilePage,
        isShowHeader: true,

        
    }
    
]

export default routes;
