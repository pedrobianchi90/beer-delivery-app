import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OrderSummary from '../components/OrderSummary';
import ProductTable from '../components/ProductTable';
import Button from '../components/Button';
import { getSale, markSaleAs } from '../service/saleRequests';
import HeaderSeller from '../components/Header/HeaderSeller';

const btn1 = 'bg-transparent hover:bg-blue-500 text-blue-700font-semibold hover:text-white py-0.5 px-4 border border-blue-500 hover:border-transparent rounded';
const btn2= 'bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-0.5 px-4 border border-red-500 hover:border-transparent rounded'
const btnDisabled = 'bg-blue-500 text-white font-bold py-0.5 px-4 rounded opacity-50 cursor-not-allowed';
const btn2Disabled = 'bg-red-500 text-white font-bold py-0.5 px-4 rounded opacity-50 cursor-not-allowed';

function SellerOrderDetails() {
  const { id } = useParams();
  const [sale, setSale] = useState();
  const testIdPrefix = 'seller_order_details';

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await getSale(id);
      setSale(response.data);
    };
    fetchOrder();
  }, [id]);

  const handleProcessing = async () => {
    const response = await markSaleAs('processing', id);
    setSale(response.data);
  };

  const handleDelivering = async () => {
    const response = await markSaleAs('delivering', id);
    setSale(response.data);
  };

  return sale ? (
    <main>
      <HeaderSeller />
      <OrderSummary sale={ sale } testIdPrefix={ testIdPrefix }>
        <Button
          className={ sale.status !== 'Pendente' ? btnDisabled : btn1 }
          dataTestId={`${testIdPrefix}__button-preparing-check` }
          text="PREPARAR PEDIDO"
          type="button"
          disabled={ sale.status !== 'Pendente' }
          onClick={ handleProcessing }
        />
        <Button
          className={ sale.status !== 'Preparando' ? btn2Disabled : btn2 }
          dataTestId={ `${testIdPrefix}__button-dispatch-check` }
          text="SAIU PARA ENTREGA"
          type="button"
          disabled={ sale.status !== 'Preparando' }
          onClick={ handleDelivering }
        />
      </OrderSummary>
      <ProductTable
        products={ sale.products }
        testIdPrefix={ testIdPrefix }
        totalPrice={ sale.totalPrice }
      />
    </main>
  ) : (
    <p>loading</p>
  );
}

export default SellerOrderDetails;
