import styles from './styles.module.css'; // Importa los estilos del módulo CSS

const ProductCard = ({ product}) => {

    const handleClick = () => {
        window.location.href = `/detalle/${product.id}`;
    };

    return (
        <button className={product.last_call? styles.productCard : styles.productCardLastCall} onClick={handleClick}>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <p>Categoría: {product.category_name}</p>
            <p>Estado: {product.isOpen ? 'Abierto' : 'Cerrado'}</p>
            <p>Valoración: {product.avg_rating ? product.avg_rating : "Sin valorar"}</p>
            <p>Fin de la subasta: {product.closing_date}</p>
        </button>
    );
};

export default ProductCard;
