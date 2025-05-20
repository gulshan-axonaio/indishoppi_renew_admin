import { lazy } from "react";
const SellerDetails = lazy(() => import("../../views/admin/SellerDetails"));
const DeactiveSellers = lazy(() => import("../../views/admin/DeactiveSellers"));
const SellerRequest = lazy(() => import("../../views/admin/SellerRequest"));
const AdminDashboard = lazy(() => import("../../views/admin/AdminDashboard"));
const Orders = lazy(() => import("../../views/admin/Orders"));
const EditCategory = lazy(() => import("../../views/admin/EditCategory"));
const Category = lazy(() => import("../../views/admin/Category"));
const Sellers = lazy(() => import("../../views/admin/Sellers"));
const PaymentRequest = lazy(() => import("../../views/admin/PaymentRequest"));
const ChatSeller = lazy(() => import("../../views/admin/ChatSeller"));
const OrderDetails = lazy(() => import("../../views/admin/OrderDetails"));
const SubCategory = lazy(() => import("../../views/admin/SubCategory"));
const GetSellerPickupLocation = lazy(() =>
  import("../../views/admin/GetSellerPickupLocation")
);
const EditPickupLocation = lazy(() =>
  import("../../views/admin/EditPickupLocation")
);
const PickupLocationDetail = lazy(() =>
  import("../../views/admin/PickupLocationDetail")
);
const AddSellers = lazy(() =>
  import("../../views/auth/multistep-form/MultistepForm/MultiStepForm")
);

const ProductType = lazy(() => import("../../views/admin/ProductType"));
const AddProductType = lazy(() => import("../../views/admin/AddProductType"));
const EditProductType = lazy(() => import("../../views/admin/EditProductType"));
const FilterOption = lazy(() => import("../../views/admin/FilterOption"));
export const adminRoutes = [
  {
    path: "admin/dashboard",
    element: <AdminDashboard />,
    role: "admin",
  },
  {
    path: "admin/addseller",
    element: <AddSellers />,
    role: "admin",
  },
  {
    path: "admin/dashboard/orders",
    element: <Orders />,
    role: "admin",
  },
  {
    path: "admin/dashboard/category",
    element: <Category />,
    role: "admin",
  },
  {
    path: "admin/dashboard/subcategory",
    element: <SubCategory />,
    role: "admin",
  },
  {
    path: "admin/dashboard/category/:categoryId",
    element: <EditCategory />,
    role: "admin",
  },
  {
    path: "admin/dashboard/sellers",
    element: <Sellers />,
    role: "admin",
  },
  {
    path: "admin/dashboard/payment-request",
    element: <PaymentRequest />,
    role: "admin",
  },
  {
    path: "admin/dashboard/deactive-sellers",
    element: <DeactiveSellers />,
    role: "admin",
  },
  {
    path: "admin/dashboard/sellers-request",
    element: <SellerRequest />,
    role: "admin",
  },
  {
    path: "admin/dashboard/seller/details/:sellerId",
    element: <SellerDetails />,
    role: "admin",
  },
  {
    path: "admin/dashboard/chat-sellers",
    element: <ChatSeller />,
    role: "admin",
  },
  {
    path: "admin/dashboard/chat-sellers/:sellerId",
    element: <ChatSeller />,
    role: "admin",
  },
  {
    path: "admin/dashboard/order/details/:orderId",
    element: <OrderDetails />,
    role: "admin",
  },
  {
    path: "admin/dashboard/pickup-location/:valueName",
    element: <GetSellerPickupLocation />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/pickuplocation/pickuplocationDetail/:locationId",
    element: <PickupLocationDetail />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/edit-pickup-location/:locationId",
    element: <EditPickupLocation />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/filter/product-type",
    element: <ProductType />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/filter/add-product-type",
    element: <AddProductType />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/filter/edit-product-type/:productTypeId",
    element: <EditProductType />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/filter/filter-option",
    element: <FilterOption />,
    role: "admin",
  },
];
