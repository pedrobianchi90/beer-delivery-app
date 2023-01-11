import React from 'react';
import { PropTypes } from 'prop-types';
import dateFormat from '../utils/dateFormat';

function OrderDetails({ id, sellerName, saleDate, saleStatus, handleReceiving }) {
  return (
    <div className="flex justify-evenly mb-5">
      <span
        className="font-bold"
        data-testid="customer_order_details__element-order-details-label-order-id"
      >
        Pedido 000
        { id }
      </span>
      <span
        className="font-bold"
        data-testid="customer_order_details__element-order-details-label-seller-name"
      >
        P. Vend:
        {' '}
        { sellerName }
      </span>
      <span
        className="font-bold"
        data-testid="customer_order_details__element-order-details-label-order-date"
      >
        { dateFormat(saleDate) }
      </span>
      <span
        className="font-bold"
        data-testid="customer_order_details__element-order-details-label-delivery-status"
      >
        { saleStatus }
      </span>
      <button
        data-testid="customer_order_details__button-delivery-check"
        className={
          saleStatus !== 'Em Trânsito'
            ? 'bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
        }
        type="button"
        onClick={ handleReceiving }
        disabled={ saleStatus !== 'Em Trânsito' }
      >
        MARCAR COMO ENTREGUE
      </button>
    </div>
  );
}

OrderDetails.propTypes = {
  id: PropTypes.number,
  sellerName: PropTypes.string,
  saleDate: PropTypes.string,
  saleStatus: PropTypes.string,
  handleReceiving: PropTypes.func,
}.isRequired;

export default OrderDetails;
