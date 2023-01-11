import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import ErrorMessage from './ErrorMessage';
import GenericInput from './Input';
import SelectInput from './SelectInput';
import { postRegisterWithRole } from '../service/userRequests';

const btn = 'bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-0.5 px-4 border border-blue-500 hover:border-transparent rounded mt-3';
const btnDisabled = 'bg-blue-500 text-white font-bold py-0.5 px-4 rounded opacity-50 cursor-not-allowed mt-3';


function AdminRegisterForm({ updateList }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [response, setResponse] = useState('');

  const options = [
    { name: 'Vendedor', id: 'seller' },
    { name: 'Consumidor', id: 'customer' },
    { name: 'Administrador', id: 'administrator' },
  ];
  const minName = 12;
  const emailPattern = /\S+@\S+\.\S+/;
  const minPassword = 6;

  const disabledBtn = () => !(
    name.length >= minName && emailPattern.test(email) && password.length >= minPassword);

  const register = async (e) => {
    e.preventDefault();
    const result = await postRegisterWithRole({ name, email, password, role });
    if (!result.data) {
      return setResponse(result.response.data.message);
    }
    updateList();
  };
  return (
    <form>
      <GenericInput
        className="ml-1"
        testId="admin_manage__input-name"
        type="name"
        input={ name }
        name="name"
        placeholder="Seu nome"
        setter={ setName }
        selector="name"
        fieldName="Nome:"
      />

      <GenericInput
        className="ml-2"
        testId="admin_manage__input-email"
        type="email"
        input={ email }
        name="email"
        placeholder="seu-email@site.com.br"
        setter={ setEmail }
        selector="email"
        fieldName="Email:"
      />

      <GenericInput
        className="ml-1"
        testId="admin_manage__input-password"
        type="password"
        input={ password }
        name="senha"
        placeholder="********"
        setter={ setPassword }
        selector="senha"
        fieldName="Senha:"
      />
      <SelectInput
        className="mb-10"
        fieldName="Tipo"
        name="Vendedor"
        nameField="name"
        value={ role }
        options={ options }
        setter={ setRole }
        testId="admin_manage__select-role"
        valueField="id"
      />
      <Button
        className={ disabledBtn === true ? btnDisabled : btn }
        // className="mt-5 mb-5 font-semibold text-md bg-green-500 p-2 rounded-lg"
        dataTestId="admin_manage__button-register"
        type="submit"
        name="register"
        disabled={ disabledBtn() }
        text="Cadastrar"
        onClick={ register }
      />
      <ErrorMessage
        dataTest="admin_manage__element-invalid-register"
        message={ response }
      />
    </form>
  );
}

AdminRegisterForm.propTypes = {
  updateList: PropTypes.func.isRequired,
};

export default AdminRegisterForm;
