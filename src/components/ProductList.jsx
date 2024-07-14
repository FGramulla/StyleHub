import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";
import "../style/ProductList.css";
import { CartContext } from "../context/CartContext";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductList = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart } = React.useContext(CartContext);
  const titleRef = useRef(null); // Usar useRef para referenciar el título

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        console.log("Fetched products:", response.data); // Log para verificar los productos recuperados
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      if (searchTerm && searchTerm.trim() !== "") {
        const filtered = products.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
        console.log("Filtered products:", filtered); // Log para verificar productos filtrados
      } else {
        setFilteredProducts(products); // Mostrar todos los productos si no hay término de búsqueda
        console.log("Filtered products (no search term):", products); // Log para mostrar todos los productos
      }
    };

    filterProducts(); // Llamar la función de filtrado inicialmente
  }, [searchTerm, products]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          titleRef.current.classList.add('animate');
        }
      });
    });

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`¡${product.title} se agregó al carrito con éxito!`);
  };

  return (
    <div className="product-list-container">
      <Carousel autoPlay infiniteLoop showThumbs={false}>
        <div className="slide slide-1"></div>
        <div className="slide slide-2"></div>
        <div className="slide slide-3"></div>
      </Carousel>
      <div className="bar-products">
        <h2 id="bar-products-title" ref={titleRef}>Products</h2>
      </div>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))
        ) : (
          <p className="sin-productos">No se encontró el producto.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;

