import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { deleteUser, getUsers } from '../service/userRequests';

function AdminTable({ update }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await getUsers();
      setUsers(data);
    };
    getAllUsers();
  }, [update]);

  const handleDeleteBtn = async (id) => {
    await deleteUser(id);
    const { data } = await getUsers();
    setUsers(data);
  };

  const adjustRole = (role) => {
    switch (role) {
    case 'seller':
      return 'P. Vendedora';
    case 'customer':
      return 'Cliente';
    case 'administrator':
      return 'Administrador';
    default: break;
    }
  };

  const titles = ['Item', 'Nome', 'E-mail', 'Tipo', 'Excluir'];

  return (
    <div>
      <h2 className="font-bold decoration-8 mb-2 mt-5">Lista de usuários</h2>
      <table className="
          text-center table-auto border-solid shadow text-gray-600 w-full rounded-2xl
          ">
        <thead>
          <tr>
            {
              titles.map((title, index) => (
                <th key={ `${title}-${index}` }>
                  { title }
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            users.map((user, index) => (
              <tr
                className="bg-white border-solid border-4 border-gray-200 text-gray-600"
                key={ user.email }
              >
                <td
                  data-testid={ `admin_manage__element-user-table-item-number-${index}` }
                >
                  {index + 1}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-name-${index}` }
                >
                  {user.name}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-email-${index}` }
                >
                  {user.email}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-role-${index}` }
                >
                  { adjustRole(user.role) }
                </td>
                <td>
                  <button
                    className="bg-red-500 p-1 w-8/12 rounded text-white"
                    data-testid={ `admin_manage__element-user-table-remove-${index}` }
                    type="button"
                    onClick={ () => handleDeleteBtn(user.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

AdminTable.propTypes = {
  update: PropTypes.bool.isRequired,
};

export default AdminTable;
