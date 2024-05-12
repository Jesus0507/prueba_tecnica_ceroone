import React, { useState } from 'react';

const itemsPerPage = 9;
let currentPage = 0;
const InvoicesComponent = (invoicesParameter) => {
    const [inputValue, setInputValue] = useState('');
    const [selectedItem, setSelectedItem] = useState("Facturas");
    const [startIndex, setStart] = useState(0);
    const [endIndex, setEnd] = useState(9);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        setStart(0);
        setEnd(9);
        currentPage = 0;
    };

    const handleChange = (e) => {
        setSelectedItem(e.target.value)
        setStart(0);
        setEnd(9);
        currentPage = 0;
    }


    const showPages = (type, customPage = null) => {
        let valReturn = '';
        let totalizedFacturas = inputValue === '' ? invoicesParameter.invoicesParameter.invoices.length : invoicesParameter.invoicesParameter.invoices.filter(invoice => invoice.id.toLowerCase().includes(inputValue.toLowerCase())).length;
        let totalizedCompras = inputValue === '' ? invoicesParameter.invoicesParameter.purchase.length : invoicesParameter.invoicesParameter.purchase.filter(purch => purch.id.toLowerCase().includes(inputValue.toLowerCase())).length;
        const totalPages = {
            "facturas": Math.ceil(totalizedFacturas / itemsPerPage),
            "compras": Math.ceil(totalizedCompras / itemsPerPage)
        }
        let customTotalPages = selectedItem === "Facturas" ? totalPages.facturas : totalPages.facturas;
        if (type === 1) {
            if (currentPage > 0) {
                currentPage = currentPage - 1;
                const newStartvalue = currentPage * itemsPerPage;
                const newEndvalue = newStartvalue + itemsPerPage;
                valReturn = [newStartvalue, newEndvalue];
            }
            else {
                valReturn = [startIndex, endIndex];
            }
        }
        if (type === 2) {
            if (currentPage < customTotalPages - 1) {
                currentPage = currentPage + 1;
                const newStartvalue = currentPage * itemsPerPage;
                const newEndvalue = newStartvalue + itemsPerPage;
                valReturn = [newStartvalue, newEndvalue];
            }
            else {
                valReturn = [startIndex, endIndex];
            }
        }

        if (type === 3) {
            currentPage = customPage;
            const newStartvalue = currentPage * itemsPerPage;
            const newEndvalue = newStartvalue + itemsPerPage;
            valReturn = [newStartvalue, newEndvalue];

        }

        let activeElement = type === 1 ? document.querySelector('.btn-active').previousElementSibling : document.querySelector('.btn-active').nextElementSibling;
        if (activeElement !== null) activeElement.scrollIntoView();
        return valReturn;
    };



    return (
        <div className='w-100 text-end'>
            <div className='table-container w-100 text-end'>
                <div className='d-flex flex-row justify-content-around'>
                    <div className='w-50'><input className='form-control w-100' placeholder='Filtrar por nro de factura' onChange={handleInputChange} /></div>
                    <div className='mx-4'>
                        <select className='form-select select-style' name='item-selected' onChange={handleChange} value={selectedItem}>
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
                        {selectedItem === 'Facturas' ?
                            inputValue === '' ? invoicesParameter.invoicesParameter.invoices.filter((invoice, index) => index >= startIndex && index <= endIndex).map((invoice) => (
                                <tr key={invoice.id}>
                                    <td className='w-50'> {invoice.id} </td>
                                    <td className='w-50 text-uppercase'> {invoice.contactName} </td>
                                </tr>
                            )) : invoicesParameter.invoicesParameter.invoices.filter(invoice => invoice.id.includes(inputValue.toLowerCase())).filter((invoice, index) => index >= startIndex && index <= endIndex).map((invoice) => (
                                <tr key={invoice.id}>
                                    <td className='w-50'> {invoice.id} </td>
                                    <td className='w-50 text-uppercase'> {invoice.contactName} </td>
                                </tr>
                            )) :
                            inputValue === '' ? invoicesParameter.invoicesParameter.purchase.filter((purch, index) => index >= startIndex && index <= endIndex).map((purch) => (
                                <tr key={purch.id}>
                                    <td className='w-50'> {purch.id} </td>
                                    <td className='w-50 text-uppercase'> {purch.contactName} </td>
                                </tr>
                            )) : invoicesParameter.invoicesParameter.purchase.filter(purch => purch.id.includes(inputValue.toLowerCase())).filter((purch, index) => index >= startIndex && index <= endIndex).map((purch) => (
                                <tr key={purch.id}>
                                    <td className='w-50'> {purch.id} </td>
                                    <td className='w-50 text-uppercase'> {purch.contactName} </td>
                                </tr>))
                        }
                    </tbody>
                </table>
            </div>
            <div className='d-flex mx-auto p-3 w-50'>
                <button className='btn btn-dark arrow-button' onClick={() => { const valIndex = showPages(1); setStart(valIndex[0]); setEnd(valIndex[1]); }}>&lt;</button>
                <div className='mx-auto buttons-content d-flex flex-row'>
                    {
                        selectedItem === "Facturas" ? 
                        inputValue === "" ? Array.apply(0, Array(Math.ceil(invoicesParameter.invoicesParameter.invoices.length / itemsPerPage))).map(function (x, i) {
                            return <button key={i} className={i === currentPage ? 'btn-active arrow-button btn btn-dark' : 'arrow-button btn btn-dark'} onClick={() => { const valIndex = showPages(3, i); setStart(valIndex[0]); setEnd(valIndex[1]) }}>{i + 1}</button>
                        }) :
                            Array.apply(0, Array(Math.ceil(invoicesParameter.invoicesParameter.invoices.filter(invoice => invoice.id.toLowerCase().includes(inputValue.toLowerCase())).length / itemsPerPage))).map(function (x, i) {
                                return <button key={i} className={i === currentPage ? 'btn-active arrow-button btn btn-dark' : 'arrow-button btn btn-dark'}>{i + 1}</button>
                        }) :
                        inputValue === "" ? Array.apply(0, Array(Math.ceil(invoicesParameter.invoicesParameter.purchase.length / itemsPerPage))).map(function (x, i) {
                            return <button key={i} className={i === currentPage ? 'btn-active arrow-button btn btn-dark' : 'arrow-button btn btn-dark'} onClick={() => { const valIndex = showPages(3, i); setStart(valIndex[0]); setEnd(valIndex[1]) }}>{i + 1}</button>
                        }) :
                            Array.apply(0, Array(Math.ceil(invoicesParameter.invoicesParameter.purchase.filter(purch => purch.id.toLowerCase().includes(inputValue.toLowerCase())).length / itemsPerPage))).map(function (x, i) {
                                return <button key={i} className={i === currentPage ? 'btn-active arrow-button btn btn-dark' : 'arrow-button btn btn-dark'}>{i + 1}</button>
                        })
                    }
                </div>
                <button className='btn btn-dark arrow-button' onClick={() => { const valIndex = showPages(2); setStart(valIndex[0]); setEnd(valIndex[1]); }}>&gt;</button>
            </div>
        </div>
    )
}

export default InvoicesComponent;