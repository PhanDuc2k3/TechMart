import SignUpPage from "../pages/SignUpPage/SignUpPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import HomePage from "../pages/HomePage/HomePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import OrderManagement from "../pages/OrderManagement/OrderManagement";
import BlogPageDetails from "../pages/BlogPageDetails/BlogPageDetails";
import IntroducePage from "../pages/IntroducePage/IntroducePage";
import DeliveryPolicyPage from "../pages/PolicyPage/DeliveryPolicyPage";
import SalesPolicyPage from "../pages/PolicyPage/SalesPolicyPage";
import ReturnPolicyPage from "../pages/PolicyPage/ReturnPolicyPage";
import LocationPage from "../pages/LocationPage/LocationPage";
import FavoritePage from "../pages/FavoritePage/FavoritePage";
import BlogPage from "../pages/BlogPage/BlogPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ProductDetailComponent from "../components/ProductDetailComponent/ProductDetailComponent";

const routes = [
    {
    path: "/",
    page: HomePage,
    isShowHeader: true,
    },
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

        
    },
    {
    path: "/order",
    page: OrderPage,
    isShowHeader: true,
  },
  {
    path: "/location",
    page: LocationPage,
    isShowHeader: true,
  },
  {
    path: "/products",
    page: ProductsPage,
    isShowHeader: true,
  },
  {
    path: "/product-detail/:id",
    page: ProductDetailComponent,
    isShowHeader: true,
  },
  {
    path: "/blog/:id",
    page: BlogPageDetails,
    isShowHeader: true,
    },
  {
    path: "/Blog",
    page: BlogPage,
    isShowHeader: true,
    },
  {
    path: "/payment",
    page: PaymentPage,
    isShowHeader: true,
  },
  {
    path: "/favorite",
    page: FavoritePage,
    isShowHeader: true,
  },
  {
    path: "/OrderManagement/:id",
    page: OrderManagement,
    isShowHeader: true,
  },
  {
    path: "/system-admin",
    page: AdminPage,
    isShowHeader: true,
  },
  {
    path: "/introduce",
    page: IntroducePage,
    isShowHeader: true,
  },
  {
    path: "/returnpolicy",
    page: ReturnPolicyPage,
    isShowHeader: true,
  },
  {
    path: "/salespolicy",
    page: SalesPolicyPage,
    isShowHeader: true,
  },
  {
    path: "/deliverypolicy",
    page: DeliveryPolicyPage,
    isShowHeader: true,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
    
]

export default routes;
