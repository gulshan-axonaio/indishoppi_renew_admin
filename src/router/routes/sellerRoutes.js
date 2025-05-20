import { lazy } from "react";
import AddVariant from "../../views/seller/AddVariant";
import ProductVariants from "../../views/seller/ProductVariants";
const SellerDashboard = lazy(() =>
  import("../../views/seller/SellerDashboard")
);
const AddProduct = lazy(() => import("../../views/seller/AddProduct"));
const Products = lazy(() => import("../../views/seller/Products"));
const DiscountProducts = lazy(() =>
  import("../../views/seller/DiscountProducts")
);
const Orders = lazy(() => import("../../views/seller/Orders"));
const Payments = lazy(() => import("../../views/seller/Payments"));
const SellerToAdmin = lazy(() => import("../../views/seller/SellerToAdmin"));
const SellerToCustomer = lazy(() =>
  import("../../views/seller/SellerToCustomer")
);

const GetSellerPickupLocation = lazy(() =>
  import("../../views/seller/GetSellerPickupLocation")
);
const SellerPickupLocation = lazy(() =>
  import("../../views/seller/SellerPickupLocation")
);
const EditPickupLocation = lazy(() =>
  import("../../views/seller/EditPickupLocation")
);
const PickupLocationDetail = lazy(() =>
  import("../../views/seller/PickupLocationDetail")
);

const ShiprocketAccountAdd = lazy(() =>
  import("../../views/seller/ShiprocketAccountAdd")
);
const ShiprocketAccount = lazy(() =>
  import("../../views/seller/ShiprocketAccount")
);

const Profile = lazy(() => import("../../views/seller/Profile"));
const EditProduct = lazy(() => import("../../views/seller/EditProduct"));
const OrderDetails = lazy(() => import("../../views/seller/OrderDetails"));
const Pending = lazy(() => import("../../views/Pending"));
const Deactive = lazy(() => import("../../views/Deactive"));
const ProductDetails = lazy(() => import("../../views/seller/ProductDetails"));
export const sellerRoutes = [
  {
    path: "/seller/account-pending",
    element: <Pending />,
    ability: "seller",
  },
  {
    path: "/seller/account-deactive",
    element: <Deactive />,
    ability: "seller",
  },

  {
    path: "/seller/dashboard",
    element: <SellerDashboard />,
    role: "seller",
    status: "active",
  },

  {
    path: "/seller/dashboard/add-product",
    element: <AddProduct />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/edit-product/:productId",
    element: <EditProduct />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/add-variant/:productId",
    element: <AddVariant />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/products",
    element: <Products />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/display-variants/:productId",
    element: <ProductVariants />,
    role: "seller",
    status: "active",
  },

  {
    path: "/seller/dashboard/products/ProductDetails/:productId",
    element: <ProductDetails />,
    role: "seller",
    status: "active",
  },

  {
    path: "/seller/dashboard/discount-products",
    element: <DiscountProducts />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/orders",
    element: <Orders />,
    role: "seller",
    visibility: ["active", "deactive"],
  },
  {
    path: "/seller/dashboard/order/details/:orderId",
    element: <OrderDetails />,
    role: "seller",
    visibility: ["active", "deactive"],
  },
  {
    path: "/seller/dashboard/payments",
    element: <Payments />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/chat-support",
    element: <SellerToAdmin />,
    role: "seller",
    visibility: ["active", "deactive", "pending"],
  },
  {
    path: "/seller/dashboard/chat-customer/:customerId",
    element: <SellerToCustomer />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/chat-customer",
    element: <SellerToCustomer />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/profile",
    element: <Profile />,
    role: "seller",
    visibility: ["active", "deactive", "pending"],
  },
  {
    path: "seller/dashboard/add-pickup-location",
    element: <SellerPickupLocation />,
    role: "seller",
    status: "active",
  },
  {
    path: "seller/dashboard/get-pickup-location",
    element: <GetSellerPickupLocation />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/edit-pickup-location/:locationId",
    element: <EditPickupLocation />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/pickuplocation/pickuplocationDetail/:locationId",
    element: <PickupLocationDetail />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/shiprocket-account",
    element: <ShiprocketAccount />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/shiprocket-account-add",
    element: <ShiprocketAccountAdd />,
    role: "seller",
    status: "active",
  },
];
