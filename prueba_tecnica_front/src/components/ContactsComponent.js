import React, { useState } from 'react';

const itemsPerPage = 9;
let currentPage = 0;
const ContactsComponent = (contactsParameter) => {

    const [inputValue, setInputValue] = useState('');
    const [startIndex, setStart] = useState(0);
    const [endIndex, setEnd] = useState(9);
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        setStart(0);
        setEnd(9);
        currentPage = 0;

    };

    const showPages = (type, customPage = null) => {
        let valReturn = '';
        let totalized = inputValue === '' ? contactsParameter.contactsParameter.length : contactsParameter.contactsParameter.filter(contact => contact.name.toLowerCase().includes(inputValue.toLowerCase())).length;
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
        <div className='contacts-container w-100'>
            <div className='w-100 text-end table-container'>
                <input className='form-control w-50' placeholder='Filtrar por nombre' onChange={handleInputChange} />
                <table className='table table-dark custom-table'>
                    <thead>
                        <tr>
                            <th scope="col" className='w-25'>Nombre</th>
                            <th scope="col" className='w-25'>Correo</th>
                            <th scope="col" className='w-25'>Teléfono</th>
                            <th scope="col" className='w-25'>Dirección</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inputValue === "" ? contactsParameter.contactsParameter.filter((contact, index) => index >= startIndex && index <= endIndex).map((contact) => (
                            <tr key={contact.id}>
                                <td className='w-25 text-uppercase'> {contact.name} </td>
                                <td className='w-25'> {contact.email} </td>
                                <td className='w-25'> {contact.mobile ? contact.mobile : 'Sin telefono'} </td>
                                <td className='w-25 text-lowercase'> {contact.billAddress.address} </td>
                            </tr>
                        )) : contactsParameter.contactsParameter.filter((contact) => contact.name.toLowerCase().includes(inputValue.toLowerCase())).filter((contact, index) => index >= startIndex && index <= endIndex).map((contact) => (
                            <tr key={contact.id}>
                                <td className='w-25 text-uppercase'> {contact.name} </td>
                                <td className='w-25'> {contact.email} </td>
                                <td className='w-25'> {contact.mobile ? contact.mobile : 'Sin telefono'} </td>
                                <td className='w-25 text-lowercase'> {contact.billAddress.address} </td>
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
                        inputValue === "" ? Array.apply(0, Array(Math.ceil(contactsParameter.contactsParameter.length / itemsPerPage))).map(function (x, i) {
                            return <button key={i} className={i === currentPage ? 'btn-active arrow-button btn btn-dark' : 'arrow-button btn btn-dark'} onClick={() => { const valIndex = showPages(3, i); setStart(valIndex[0]); setEnd(valIndex[1]) }}>{i + 1}</button>
                        }) :
                            Array.apply(0, Array(Math.ceil(contactsParameter.contactsParameter.filter(contact => contact.name.toLowerCase().includes(inputValue.toLowerCase())).length / itemsPerPage))).map(function (x, i) {
                                return <button key={i} className={i === currentPage ? 'btn-active arrow-button btn btn-dark' : 'arrow-button btn btn-dark'}  onClick={() => { const valIndex = showPages(3, i); setStart(valIndex[0]); setEnd(valIndex[1]) }}>{i + 1}</button>
                            })
                    }
                </div>
                <button className='btn btn-dark arrow-button' onClick={() => { const valIndex = showPages(2); setStart(valIndex[0]); setEnd(valIndex[1]); }}>&gt;</button>
            </div>
        </div>
    )
}

export default ContactsComponent;