import React, { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";
import SearchName from "../components/SearchName";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages } = productList;

  const loadMore = () => {
    if (pageNumber < pages && !loadingData) {
      setLoadingMore(true);
      setLoadingData(true);

      // Introduce a timeout (e.g., 1000ms) before loading more data
      setTimeout(() => {
        dispatch(listProducts(keyword, pageNumber + 1)).then(() => {
          setLoadingMore(false);
          setLoadingData(false);
        });
      }, 1000); // 1000ms (1 second) delay
    }
  };

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  useEffect(() => {
    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);
    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      loadMore();
    }
  };

  return (
    <>
      <Meta />
      <h3>Filters</h3>
      <Route render={({ history }) => <SearchName history={history} />} />
      <h2>Featured Books</h2>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
  {products.map((product) => (
    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
      <Product product={product} />
      {product.countInStock === 0 && (
        <div
          style={{
            backgroundColor: 'red', // Change the background color as needed
            color: 'white', // Change the text color as needed
            fontWeight: 'bold',
            padding: '5px',
            borderRadius: '5px',
            marginTop: '5px',
            textAlign: 'center',
          }}
        >
          Not Available
        </div>
      )}
    </Col>
  ))}
</Row>

          {loadingMore && <Loader />}
        </>
      )}
      {loadingData && <Loader />}
    </>
  );
};

export default HomeScreen;
