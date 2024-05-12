import React, { useState } from 'react';

const itemsPerPage = 9;
let currentPage = 0;
const AccountsComponent = (accountsParameter) => {
    const [inputValue, setInputValue] = useState('');
    const [startIndex, setStart] = useState(0);
    const [endIndex, setEnd] = useState(9);
    const [selectedItemDesde, setSelectedItemDesde] = useState("0");
    const [selectedItemHasta, setSelectedItemHasta] = useState("0");

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        setStart(0);
        setEnd(9);
        currentPage = 0;
    };

    const handleChange = (type, e) => {
        type === 1 ? setSelectedItemDesde(e.target.value) : setSelectedItemHasta(e.target.value);
        setStart(0);
        setEnd(9);
        currentPage = 0;
    }

    const showPages = (type, customPage = null) => {
        let valReturn = '';
        let totalized = inputValue === '' ? accountsParameter.accountsParameter : accountsParameter.accountsParameter.filter(account => (account.name.toLowerCase().includes(inputValue.toLowerCase()) || account.accountNumber.toString().includes(inputValue.toLowerCase())));
        totalized = selectedItemDesde === "0" || selectedItemHasta === "0" ? totalized.length : totalized.filter(account => (account.accountNumber >= selectedItemDesde && account.accountNumber <= selectedItemHasta)).length;
        const totalPages = Math.ceil(totalized / itemsPerPage);
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
            if (currentPage < totalPages - 1) {
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
            <div className='table-container w-100'>
                <div className='d-flex flex-row justify-content-around'>
                    <div className='w-50'><input className='form-control w-100' placeholder='Filtrar por nombre o nro de cuenta' onChange={handleInputChange} /></div>
                    <div>
                        <select className='form-select select-style' onChange={(event) => handleChange(1, event)}>
                            <option value='0'> Desde la cuenta nro:</option>
                            {
                                accountsParameter.accountsParameter.map((account) => (
                                    <option key={account.id} value={account.accountNumber}>{account.accountNumber}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <select className='form-select select-style' onChange={(event) => handleChange(2, event)}>
                            <option value='0'> Hasta la cuenta nro:</option>
                            {
                                accountsParameter.accountsParameter.map((account) => (
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
                                selectedItemDesde === "0" || selectedItemHasta === "0" ? accountsParameter.accountsParameter.filter((account, index) => index >= startIndex && index <= endIndex).map((account) => (
                                    <tr key={account.id}>
                                        <td className='w-25 text-uppercase'> {account.name} </td>
                                        <td className='w-25'> {account.type} </td>
                                        <td className='w-25'> {account.accountNumber} </td>
                                        <td className='w-25'> {account.balance} </td>
                                    </tr>
                                )) : accountsParameter.accountsParameter.filter(account => (account.accountNumber >= selectedItemDesde && account.accountNumber <= selectedItemHasta)).filter((account, index) => index >= startIndex && index <= endIndex).map((account) => (
                                    <tr key={account.id}>
                                        <td className='w-25 text-uppercase'> {account.name} </td>
                                        <td className='w-25'> {account.type} </td>
                                        <td className='w-25'> {account.accountNumber} </td>
                                        <td className='w-25'> {account.balance} </td>
                                    </tr>
                                ))
                                : selectedItemDesde === "0" || selectedItemHasta === "0" ? accountsParameter.accountsParameter.filter(account => (account.name.toLowerCase().includes(inputValue.toLowerCase()) || account.accountNumber.toString().includes(inputValue.toLowerCase()))).filter((account, index) => index >= startIndex && index <= endIndex).map((account) => (
                                    <tr key={account.id}>
                                        <td className='w-25 text-uppercase'> {account.name} </td>
                                        <td className='w-25'> {account.type} </td>
                                        <td className='w-25'> {account.accountNumber} </td>
                                        <td className='w-25'> {account.balance} </td>
                                    </tr>
                                )) :
                                    accountsParameter.accountsParameter.filter(account => (account.name.toLowerCase().includes(inputValue.toLowerCase()) || account.accountNumber.toString().includes(inputValue.toLowerCase())) && (account.accountNumber >= selectedItemDesde && account.accountNumber <= selectedItemHasta)).filter((account, index) => index >= startIndex && index <= endIndex).map((account) => (
                                        <tr key={account.id}>
                                            <td className='w-25 text-uppercase'> {account.name} </td>
                                            <td className='w-25'> {account.type} </td>
                                            <td className='w-25'> {account.accountNumber} </td>
                                            <td className='w-25'> {account.balance} </td>
                                        </tr>
                                    ))
                        }
                    </tbody>
                </table>
            </div>
            <div className='d-flex mx-auto p-3 w-50'>
                <button className='btn btn-dark arrow-button' onClick={() => { const valIndex = showPages(1); setStart(valIndex[0]); setEnd(valIndex[1]); }}>&lt;</button>
                <div className='mx-auto buttons-content d-flex flex-row'>
                    {
                        inputValue === "" ? 
                        selectedItemDesde === "0" || selectedItemHasta === "0" ?
                        Array.apply(0, Array(Math.ceil(accountsParameter.accountsParameter.length / itemsPerPage))).map(function (x, i) {
                            return <button key={i} className={i === currentPage ? 'btn-active arrow-button btn btn-dark' : 'arrow-button btn btn-dark'} onClick={() => { const valIndex = showPages(3, i); setStart(valIndex[0]); setEnd(valIndex[1]) }}>{i + 1}</button>
                        }) :
                        Array.apply(0, Array(Math.ceil(accountsParameter.accountsParameter.filter(account => (account.accountNumber >= selectedItemDesde && account.accountNumber <= selectedItemHasta)).filter((account, index) => index >= startIndex && index <= endIndex).length / itemsPerPage))).map(function (x, i) {
                            return <button key={i} className={i === currentPage ? 'btn-active arrow-button btn btn-dark' : 'arrow-button btn btn-dark'} onClick={() => { const valIndex = showPages(3, i); setStart(valIndex[0]); setEnd(valIndex[1]) }}>{i + 1}</button>
                        }) :
                        selectedItemDesde === "0" || selectedItemHasta === "0" ?
                        Array.apply(0, Array(Math.ceil(accountsParameter.accountsParameter.filter(contact => contact.name.toLowerCase().includes(inputValue.toLowerCase())).length / itemsPerPage))).map(function (x, i) {
                            return <button key={i} className={i === currentPage ? 'btn-active arrow-button btn btn-dark' : 'arrow-button btn btn-dark'}  onClick={() => { const valIndex = showPages(3, i); setStart(valIndex[0]); setEnd(valIndex[1]) }}>{i + 1}</button>
                        }) :
                        Array.apply(0, Array(Math.ceil(accountsParameter.accountsParameter.filter(account => (account.name.toLowerCase().includes(inputValue.toLowerCase()) || account.accountNumber.toString().includes(inputValue.toLowerCase())) && (account.accountNumber >= selectedItemDesde && account.accountNumber <= selectedItemHasta)).filter((account, index) => index >= startIndex && index <= endIndex).length / itemsPerPage))).map(function (x, i) {
                            return <button key={i} className={i === currentPage ? 'btn-active arrow-button btn btn-dark' : 'arrow-button btn btn-dark'}  onClick={() => { const valIndex = showPages(3, i); setStart(valIndex[0]); setEnd(valIndex[1]) }}>{i + 1}</button>
                        })
                    }
                </div>
                <button className='btn btn-dark arrow-button' onClick={() => { const valIndex = showPages(2); setStart(valIndex[0]); setEnd(valIndex[1]); }}>&gt;</button>
            </div>
        </div>
    )
}

export default AccountsComponent;