import React, {useState} from 'react';

//const itemsPerPage = 5;
const InvoicesComponent = (invoicesParameter) => {


    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const [selectedItem, setSelectedItem] = useState("")
  const handleChange = (e) => {
    setSelectedItem(e.target.value)
  }


    return (
        <div className='w-100 text-end'>
            <div className='d-flex flex-row justify-content-around'>
            <div className= 'w-50'><input className='form-control w-100' placeholder='Filtrar por nro de factura' onChange={handleInputChange} /></div>
            <div className='mx-4'>
                <select className='form-control' name='item-selected' onChange={handleChange}  value={selectedItem}>
                    <option value="Facturas"> Facturas </option>
                    <option value="Compras"> Compras </option>
                </select></div>
            </div>
            <table className='table table-dark custom-table'>
            <thead>
                <tr>
                <th scope="col" className='w-50'>Nro Factura</th>
                <th scope="col" className='w-50'>Contacto</th>
                </tr>
            </thead>
            <tbody>
                {   selectedItem === 'Facturas' ?
                inputValue === '' ? invoicesParameter.invoicesParameter.invoices.map((invoice) => (
                    <tr key={invoice.id}>
                        <td className='w-50'> {invoice.id} </td>
                        <td className='w-50'> {invoice.contactName} </td>
                    </tr>
                )) : invoicesParameter.invoicesParameter.invoices.filter(invoice => invoice.id.includes(inputValue.toLowerCase())).map((invoice) =>(
                    <tr key={invoice.id}>
                    <td className='w-50'> {invoice.id} </td>
                    <td className='w-50'> {invoice.contactName} </td>
                </tr>
                )) : 
                inputValue === '' ? invoicesParameter.invoicesParameter.purchase.map((purch) => (
                    <tr key={purch.id}>
                        <td className='w-50'> {purch.id} </td>
                        <td className='w-50'> {purch.contactName} </td>
                    </tr>
                )) : invoicesParameter.invoicesParameter.purchase.filter(purch => purch.id.includes(inputValue.toLowerCase())).map((purch) =>(
                    <tr key={purch.id}>
                    <td className='w-50'> {purch.id} </td>
                    <td className='w-50'> {purch.contactName} </td>
                </tr>))
                }
            </tbody>
            </table>
        </div>
    )
}

export default InvoicesComponent;