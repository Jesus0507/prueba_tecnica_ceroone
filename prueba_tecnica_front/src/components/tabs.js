import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { IoIosContact } from "react-icons/io";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { MdAccountBalance } from "react-icons/md";
import ContactsComponent from './ContactsComponent';
import InvoicesComponent from './InvoicesComponent';
import AccountsComponent from './AccountsComponent';

const endpoint = 'http://localhost:8000/api'

const Tabs = () => {
  const [activetab, setactiveTab] = useState(0);
  const seleccionar = (index) => {
    setactiveTab(index);
  };
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
         getContacts(); 
  }, []);

const getContacts = async () => {
  const response = await axios.get(
     `${endpoint}/contacts`,
      {
          headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
      }
    );
  setContacts(response.data.sort((a, b) => (a.name > b.name ? 1 : -1)));
}

const [invoices, setInvoices] = useState([]);
useEffect(() => {
       getInvoices(); 
}, []);

const [purchase, setPurchase] = useState([]);
useEffect(() => {
       getPurchase(); 
}, []);

const getInvoices = async () => {
const response = await axios.get(
   `${endpoint}/invoices`,
    {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
    }
  );
setInvoices(response.data.sort((a, b) => (a.id > b.id ? 1 : -1)));
}

const getPurchase = async () => {
const response = await axios.get(
   `${endpoint}/purchase`,
    {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
    }
  );
setPurchase(response.data.sort((a, b) => (a.id > b.id ? 1 : -1)));
}

const invoicesParameter = {
  'invoices' : invoices,
  'purchase' : purchase
}

const [accounts, setAccounts] = useState([]);
useEffect(() => {
       getAccounts(); 
}, []);

const getAccounts = async () => {
const response = await axios.get(
   `${endpoint}/accounts`,
    {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
    }
  );
setAccounts(response.data.sort((a, b) => (a.accountNumber > b.accountNumber? 1 : -1)));
}




      return (
    <div className='container-tabs' activetab={`${activetab}00%`}>
      <ul className="tabs">
        <li
          className={activetab === 0 ? "active br-left" : "br-left"}
          onClick={() => seleccionar(0)}
        >
            <span className="m-3">Contactos</span> 
            <IoIosContact />
        </li>
        <li
          className={activetab === 1 ? "active" : ""}
          onClick={() => seleccionar(1)}
        >
           <span className="m-3">Facturas</span> 
           <LiaFileInvoiceSolid />
        </li>
        <li
          className={activetab === 2 ? "active br-right" : "br-right"}
          onClick={() => seleccionar(2)}
        >
        <span className="m-3">Cuentas Contables</span> 
        <MdAccountBalance />
        </li>
        <span className="indicador"></span>
      </ul>
      <div className="tab-content">
        {activetab === 0 && <div className='w-100'>{contacts.length === 0 ? 'Loading...' : <ContactsComponent contactsParameter={contacts}/>}</div>}
        {activetab === 1 && <div className="table-container">{invoices.length === 0 || purchase.length ===0 ? 'Loading...' : <InvoicesComponent invoicesParameter={invoicesParameter}/>}</div>}
        {activetab === 2 && <div className="table-container">{accounts.length === 0 ? 'Loading...' : <AccountsComponent accountsParameter={accounts}/>}</div>}
      </div>
    </div>
  );
}

export default Tabs;
