import React from 'react';
import styles from './styles.module.css';
import Comment from '../Comment/Comment';

const ProductDetail = ({ product }) => {
  return (
    <div className={styles.ProductDetail}>
      <h2>{product.title}</h2>

      <section>
        {product.image && (
            <img
              src={`${product.image}`}
              alt="Auction image"
              style={{
                  maxWidth: "650px",
                  borderRadius: "10px",
                  display: "block",
                  marginBottom: "1rem"
                }}
            />
          )}
        <p>{product.description}</p>
        <p><strong>Brand:</strong> {product.brand}</p>
        <p><strong>Starting price:</strong> ${product.price}</p>
        <p><strong>Stock:</strong> {product.stock}</p>
        <p>Rating: {product.avg_rating ? product.avg_rating : "Not rated"}</p>
        <p><strong>Status:</strong> {product.isOpen ? 'Open' : 'Closed'}</p>
        <p><strong>Current bids:</strong> {product.bid_counts}</p>
        <p><strong>Creation date:</strong> {new Date(product.creation_date).toLocaleString()}</p>
        <p><strong>Closing date:</strong> {new Date(product.closing_date).toLocaleString()}</p>
        <p><strong>Time remaining:</strong> {product.time_left}</p>
        <p><strong>Auctioneer:</strong> {product.auctioneer ?? 'Not assigned'}</p>
        <Comment productoId={product.id} />
      </section>
    </div>
  );
};

export default ProductDetail;
