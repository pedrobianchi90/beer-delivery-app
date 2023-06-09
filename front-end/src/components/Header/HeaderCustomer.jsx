import React from 'react';
import { Link } from 'react-router-dom';
import Header from '.';
import Button from '../Button';

function HeaderCustomer() {
  return (
    <Header
      testId={ {
        prefix: 'customer_products',
        sufix: 'products',
      } }
      homepage="/customer/products"
      homepageLabel="PRODUTOS"
    >
      <Link to="/customer/orders">
        <Button
          className="text-gray-600 rounded-sm shadow-sm text-lg w-40 h-8"
          dataTestId="customer_products__element-navbar-link-orders"
          type="button"
          name="orders"
          text="MEUS PEDIDOS"
        />
      </Link>
    </Header>
  );
}

export default HeaderCustomer;
