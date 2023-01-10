import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import ProductTable from '../components/ProductTable';
import SelectInput from '../components/SelectInput';
import GenericInput from '../components/Input';
import Button from '../components/Button';
import { getSellers } from '../service/requests';
import { placeOrder } from '../service/saleRequests';

function Checkout() {
  const [cart, setCart] = useLocalStorage('cart', {
    products: {},
    totalPrice: 0,
  });
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [sellerId, setSellerId] = useState();
  const [sellers, setSellers] = useState();
  const [error, setError] = useState();
  const history = useHistory();

  useEffect(() => {
    const fetchSellers = async () => {
      const response = await getSellers();
      setSellers(response.data);
      setSellerId(response.data[0].id);
    };

    fetchSellers();
  }, []);

  const removeFromCart = (id) => {
    const products = { ...cart.products };
    const toSubtract = products[id].price * products[id].quantity;
    delete products[id];
    setCart((prev) => ({ products, totalPrice: prev.totalPrice - toSubtract }));
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    const OK_CODE = 201;
    const response = await placeOrder(
      {
        sellerId,
        address,
        number,
      },
      cart,
    );
    if (response.status === OK_CODE) {
      localStorage.removeItem('cart');
      return history.push(`/customer/orders/${response.data.id}`);
    }

    setError(response.data);
  };

  return sellers ? (
    <main className="flex flex-col items-center w-screen h-screen bg-gray-200">
      <h1 className="font-bold text-2xl mb-10 absolute m-auto mt-10">Checkout</h1>
      <div className="flex flex-col justify-center items-center h-screen w-screen">
        <div className="w-8/12">
          <ProductTable
            totalPrice={ cart.totalPrice }
            products={ cart.products }
            removeProduct={ removeFromCart }
            testIdPrefix="customer_checkout"
          />
        </div>
        <form className="flex items-center justify-evenly bg-gray-200 w-9/12 mt-10">
          <SelectInput
            fieldName="P. Vendedora Responsável:"
            name="Vendedor"
            nameField="name"
            options={ sellers }
            value={ sellerId }
            setter={ setSellerId }
            testId="customer_checkout__select-seller"
            valueField="id"
          />
          <GenericInput
            className="w-full shadow p-2"
            fieldName="Endereço"
            input={address}
            name="address"
            placeholder="Travessa Terceira, Bairro Muruci"
            testId="customer_checkout__input-address"
            type="text"
            setter={setAddress}
          />
          <GenericInput
            className="w-full shadow p-2"
            fieldName="Número"
            input={number}
            name="number"
            placeholder="198"
            testId="customer_checkout__input-address-number"
            type="text"
            setter={setNumber}
          />
          <Button
            className="font-semibold text-lg bg-green-500 p-3 rounded-lg"
            dataTestId="customer_checkout__button-submit-order"
            text="FINALIZAR PEDIDO"
            type="submit"
            onClick={submitOrder}
          />
          {error && <p>{error.message}</p>}
        </form>
      </div>
    </main>
  ) : (
    <p>loading</p>
  );
}

export default Checkout;
