import propTypes from 'prop-types';
import FormattedPrice from './FormattedPrice';
import ProductTableCard from './ProductTableCard';

function ProductTable({ products, removeProduct, testIdPrefix, totalPrice }) {
  return (
    <section>
      <table
        className="
          text-center table-auto border-solid shadow text-gray-600 w-full rounded-2xl
          "
      >
        <thead className="bg-yellow-300">
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            {removeProduct && <th>Remover item</th>}
          </tr>
        </thead>
        <tbody className="bg-white">
          {Object.values(products).map((product, i) => (
            <ProductTableCard
              { ...product }
              testIdPrefix={ testIdPrefix }
              removeProduct={ removeProduct }
              index={ i }
              key={ i }
            />
          ))}
        </tbody>
      </table>

      <div className="mt-10 flex font-bold">
        <h1 className="mr-1">Total: </h1>
        <FormattedPrice
          price={ totalPrice }
          testid={ `${testIdPrefix}__element-order-total-price` }
        />
      </div>
    </section>
  );
}

ProductTable.defaultProps = {
  removeProduct: undefined,
};

ProductTable.propTypes = {
  products: propTypes.objectOf(
    propTypes.shape({
      name: propTypes.string.isRequired,
      price: propTypes.number.isRequired,
      quantity: propTypes.number.isRequired,
    }),
  ).isRequired,
  testIdPrefix: propTypes.string.isRequired,
  removeProduct: propTypes.func,
  totalPrice: propTypes.number.isRequired,
};

export default ProductTable;
