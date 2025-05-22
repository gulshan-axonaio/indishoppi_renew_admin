import {
  AiFillDashboard,
  AiOutlineShoppingCart,
  AiOutlinePlus,
} from "react-icons/ai";
import { BiCategory, BiLoaderCircle } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { FiMapPin } from "react-icons/fi";
import { CiChat1 } from "react-icons/ci";
import { BsCurrencyDollar, BsChat } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdAddBusiness } from "react-icons/md";
export const allNav = [
  {
    id: 1,
    title: "Dashboard",
    icon: <AiFillDashboard />,
    role: "admin",
    path: "/admin/dashboard",
  },
  {
    id: 2,
    title: "Add Seller",
    icon: <MdAddBusiness />,
    role: "admin",
    path: "/admin/addseller",
  },
  {
    id: 3,
    title: "Orders",
    icon: <AiOutlineShoppingCart />,
    role: "admin",
    path: "/admin/dashboard/orders",
  },
  {
    id: 4,
    title: "Category",
    icon: <BiCategory />,
    role: "admin",
    path: "/admin/dashboard/category",
  },
  {
    id: 5,
    title: "Sub Categories",
    icon: <BiCategory />,
    role: "admin",
    path: "/admin/dashboard/subcategory",
  },
  {
    id: 6,
    title: "Sellers",
    icon: <FiUsers />,
    role: "admin",
    path: "/admin/dashboard/sellers",
  },
  {
    id: 7,
    title: "Payment request",
    icon: <FaIndianRupeeSign />,
    role: "admin",
    path: "/admin/dashboard/payment-request",
  },
  {
    id: 8,
    title: "Deactive Sellers",
    icon: <FiUsers />,
    role: "admin",
    path: "/admin/dashboard/deactive-sellers",
  },
  {
    id: 9,
    title: "Sellers Request",
    icon: <BiLoaderCircle />,
    role: "admin",
    path: "/admin/dashboard/sellers-request",
  },
  {
    id: 10,
    title: "Chat Seller",
    icon: <CiChat1 />,
    role: "admin",
    path: "/admin/dashboard/chat-sellers",
  },
  {
    id: 11,
    title: "Dashboard",
    icon: <AiFillDashboard />,
    role: "seller",
    path: "/seller/dashboard",
  },
  {
    id: 12,
    title: "Add Product",
    icon: <AiOutlinePlus />,
    role: "seller",
    path: "/seller/dashboard/add-product",
  },
  {
    id: 13,
    title: "All Product",
    icon: <RiProductHuntLine />,
    role: "seller",
    path: "/seller/dashboard/products",
  },
  {
    id: 14,
    title: "Discount Product",
    icon: <RiProductHuntLine />,
    role: "seller",
    path: "/seller/dashboard/discount-products",
  },
  {
    id: 15,
    title: "Orders",
    icon: <AiOutlineShoppingCart />,
    role: "seller",
    path: "/seller/dashboard/orders",
  },
  {
    id: 16,
    title: "Payments",
    icon: <FaIndianRupeeSign />,
    role: "seller",
    path: "/seller/dashboard/payments",
  },
  {
    id: 17,
    title: "Chat Customer",
    icon: <BsChat />,
    role: "seller",
    path: "/seller/dashboard/chat-customer",
  },
  {
    id: 18,
    title: "Chat Support",
    icon: <CiChat1 />,
    role: "seller",
    path: "/seller/dashboard/chat-support",
  },
  {
    id: 19,
    title: "Profile",
    icon: <FiUsers />,
    role: "seller",
    path: "/seller/dashboard/profile",
  },
  {
    id: 20,
    title: "Pickup Location",
    icon: <FiMapPin />,
    role: "seller",
    path: "/seller/dashboard/get-pickup-location",
  },
  {
    id: 21,
    title: "Pickup Location",
    icon: <FiMapPin />,
    role: "admin",
    subItems: [
      {
        id: 22,
        title: "Active",
        path: "/admin/dashboard/pickup-location/active",
      },
      {
        id: 23,
        title: "New Request",
        path: "/admin/dashboard/pickup-location/new",
      },
      {
        id: 24,
        title: "Rejected",
        path: "/admin/dashboard/pickup-location/reject",
      },
    ],
  },
  {
    id: 25,
    title: "Shiprocket Account",
    icon: <FiUsers />,
    role: "seller",
    path: "/seller/dashboard/shiprocket-account",
  },
  {
    id: 26,
    title: "Dynamic Field",
    icon: <FiMapPin />,
    role: "admin",
    subItems: [
      {
        id: 27,
        title: "Add new",
        path: "/admin/dashboard/filter/product-type",
      },
    ],
  },
  {
    id: 28,
    title: "Search Filter",
    icon: <FiMapPin />,
    role: "admin",
    subItems: [
      {
        id: 29,
        title: "All Filters",
        path: "/admin/dashboard/get-search-filter",
      },
    ],
  },
];
