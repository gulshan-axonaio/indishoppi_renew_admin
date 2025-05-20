import React, { useState, useEffect } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { FaClone } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import {
  delete_product,
  get_products,
} from "../../store/Reducers/productReducer";

const Products = () => {
  const dispatch = useDispatch();
  const { products, totalProduct } = useSelector((state) => state?.product);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(10);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const obj = {
    parPage: parseInt(parPage),
    page: parseInt(currentPage),
    searchValue,
  };

  useEffect(() => {
    dispatch(get_products(obj));
  }, [searchValue, currentPage, parPage]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleFilter = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value)
    );
    setFilteredProducts(filtered);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(delete_product(id));
      }
    });
  };

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      width: "60px",
    },
    {
      name: "Image",
      selector: (row) => (
        <img
          src={row.images[0]}
          alt={row.name}
          className="w-12 h-12 object-cover rounded-md"
        />
      ),
      width: "80px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Brand",
      selector: (row) => row.brand,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => `₹${row.price}`,
      sortable: true,
    },
    {
      name: "Discount",
      selector: (row) => `${row.discount}%`,
      sortable: true,
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2">
          <Link to={`/seller/dashboard/add-variant/${row._id}`} className="text-purple-500">
            <FaClone />
          </Link>
          <Link to={`/seller/dashboard/edit-product/${row._id}`} className="text-green-600">
            <FaEdit />
          </Link>
          <Link to={`/seller/dashboard/products/ProductDetails/${row._id}`} className="text-blue-500">
            <FaEye />
          </Link>

          <button
            onClick={() => handleDelete(row._id)}
            className="text-red-500"
          >
            <FaTrash />
          </button>
        </div>
      ),
      width: "130px",
    },
  ];

  return (
    <div className="px-4 lg:px-7 pt-5">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Products</h1>
        <input
          type="text"
          placeholder="Search by name"
          onChange={handleFilter}
          className="border border-gray-300 rounded px-3 py-1 text-sm w-64"
        />
      </div>

      <div className="bg-white shadow-md rounded-lg p-2">
        <DataTable
          columns={columns}
          data={filteredProducts}
          pagination
          fixedHeader
          selectableRows
          highlightOnHover
          responsive
          persistTableHead
        />
      </div>
    </div>
  );
};

export default Products;
