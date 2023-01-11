import React, { useState } from 'react';
import AdminRegisterForm from '../components/AdminRegisterForm';
import AdminTable from '../components/AdminTable';
import HeaderAdmin from '../components/Header/HeaderAdmin';

export default function AdminManage() {
  const [update, setUpdate] = useState(false);
  console.log(update);

  return (
    <div>
      <HeaderAdmin />
      <div className="ml-2 mr-2">
        <AdminRegisterForm
          updateList={ () => setUpdate((prev) => !prev) }
        />
        <AdminTable
          update={ update }
        />
      </div>
    </div>
  );
}
