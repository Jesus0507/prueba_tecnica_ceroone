import React, {useState} from 'react';

//const itemsPerPage = 5;
const AccountsComponent = (accountsParameter) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    
    const [selectedItemDesde, setSelectedItemDesde] = useState("0");
    const [selectedItemHasta, setSelectedItemHasta] = useState("0");

  const handleChange = (type,e) => {
    type === 1 ? setSelectedItemDesde(e.target.value) : setSelectedItemHasta(e.target.value)
  }


    return (
        <div className='w-100 text-end'>
            <div className='d-flex flex-row justify-content-around'>
                <div className='w-50'><input className='form-control w-100' placeholder='Filtrar por nombre o nro de cuenta'  onChange={handleInputChange} /></div>
                <div>
                <select className='form-control' onChange={(event) => handleChange(1,event)}>
                    <option value='0'> Desde la cuenta nro:</option>
                        {
                            accountsParameter.accountsParameter.map((account)=>(
                                <option key={account.id} value={account.accountNumber}>{account.accountNumber}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <select className='form-control' onChange={(event) => handleChange(2,event)}>
                    <option value='0'> Hasta la cuenta nro:</option>
                        {
                            accountsParameter.accountsParameter.map((account)=>(
                                <option key={account.id} value={account.accountNumber}>{account.accountNumber}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <table className='table table-dark custom-table'>
            <thead>
                <tr>
                <th scope="col" className='w-25'>Nombre</th>
                <th scope="col" className='w-25'>Tipo de cuenta</th>
                <th scope="col" className='w-25'>Nro de cuenta</th>
                <th scope="col" className='w-25'>Balance</th>
                </tr>
            </thead>
            <tbody>
                {
                inputValue === '' ? 
                selectedItemDesde === "0" || selectedItemHasta === "0" ? accountsParameter.accountsParameter.map((account) => (
                    <tr key={account.id}>
                        <td className='w-25'> {account.name} </td>
                        <td className='w-25'> {account.type} </td>
                        <td className='w-25'> {account.accountNumber} </td>
                        <td className='w-25'> {account.balance} </td>
                    </tr>
                )) : accountsParameter.accountsParameter.filter(account => (account.accountNumber >= selectedItemDesde && account.accountNumber <=selectedItemHasta)).map((account) =>(
                    <tr key={account.id}>
                        <td className='w-25'> {account.name} </td>
                        <td className='w-25'> {account.type} </td>
                        <td className='w-25'> {account.accountNumber} </td>
                        <td className='w-25'> {account.balance} </td>
                    </tr>
                ))
                 : selectedItemDesde === "0" || selectedItemHasta === "0" ? accountsParameter.accountsParameter.filter(account => (account.name.toLowerCase().includes(inputValue.toLowerCase()) || account.accountNumber.toString().includes(inputValue.toLowerCase()))).map((account) =>(
                    <tr key={account.id}>
                        <td className='w-25'> {account.name} </td>
                        <td className='w-25'> {account.type} </td>
                        <td className='w-25'> {account.accountNumber} </td>
                        <td className='w-25'> {account.balance} </td>
                    </tr>
                )) : 
                accountsParameter.accountsParameter.filter(account => (account.name.toLowerCase().includes(inputValue.toLowerCase()) || account.accountNumber.toString().includes(inputValue.toLowerCase())) && (account.accountNumber >= selectedItemDesde && account.accountNumber <=selectedItemHasta)).map((account) =>(
                    <tr key={account.id}>
                        <td className='w-25'> {account.name} </td>
                        <td className='w-25'> {account.type} </td>
                        <td className='w-25'> {account.accountNumber} </td>
                        <td className='w-25'> {account.balance} </td>
                    </tr>
                ))
                }
            </tbody>
            </table>
        </div>
    )
}

export default AccountsComponent;