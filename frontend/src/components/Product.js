import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
  console.log(product._id);
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
      <div className="product-image-container">
        <Card.Img src={product.image} variant='top' />
        </div>
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='i'>- {product.author}</Card.Text>

        <Card.Text as='h3'>${product.price}</Card.Text>
        <Card.Text as='p'>Count In Stock: {product.countInStock}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
