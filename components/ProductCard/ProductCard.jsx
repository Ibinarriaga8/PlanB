import styles from './styles.module.css';

const ProductCard = ({ product}) => {

    const handleClick = () => {
        window.location.href = `/detail/${product.id}`;
    };

    return (
        <button className={styles.productCard} onClick={handleClick}>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <p>Category: {product.category_name}</p>
            <p>Status: {product.isOpen ? 'Open' : 'Closed'}</p>
            <p>Rating: {product.avg_rating ? product.avg_rating : "Not rated"}</p>
            <p>Auction end: {product.closing_date}</p>
        </button>
    );
};

export default ProductCard;
