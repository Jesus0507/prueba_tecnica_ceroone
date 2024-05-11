import React, {useState} from 'react';

const itemsPerPage = 10;
let currentPage = 0;
const ContactsComponent = (contactsParameter) => {

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        createPageButtons();
        currentPage = 0;
        showPage(currentPage);
    };

    const content = document.querySelector('.main-container');
    let items =  content!= null ? Array.from(content.getElementsByTagName('tr')).slice(1) : '';
    
    function showPage(page) {
        items =  content!== null ? Array.from(content.getElementsByTagName('tr')).slice(1) : '';
        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        items.forEach((item, index) => {
                item.classList.add('hidden');
        });
        items.forEach((item, index) => {
            if(inputValue === '') {
                if(index >= startIndex && index <= endIndex) {
                    item.classList.remove('hidden');
                }
            }
            else {
                const filtered = items.filter(item => item.querySelectorAll('td')[0].textContent.toLowerCase().includes(inputValue.toLowerCase()));
                filtered.forEach((item,index) => {
                    if(index >= startIndex && index <= endIndex) {
                        item.classList.remove('hidden');
                    }
                })
            }
    });
      }

      function createPageButtons() {
        let totalized = inputValue === '' ? items.length :  items.filter(item => item.querySelectorAll('td')[0].textContent.toLowerCase().includes(inputValue.toLowerCase())).length;
        const totalPages = Math.ceil(totalized / itemsPerPage);
        const paginationContainer = document.createElement('div');
        paginationContainer.className='pagination w-50 mx-auto overflow-auto p-4';
        const previousBtn = document.createElement('button');
        const nextBtn = document.createElement('button');
        previousBtn.textContent = '<';
        nextBtn.textContent = '>';
        previousBtn.className = nextBtn.className = 'btn btn-dark arrow-button';
        previousBtn.addEventListener('click', () => {
            if (currentPage > 0) 
                {
                    currentPage = currentPage - 1;
                    showPage(currentPage);
                    updateActiveButtonStates(currentPage,2);
                }
          });
          nextBtn.addEventListener('click',() => {
            if (currentPage < totalPages - 1) 
                {
                    currentPage = currentPage + 1;
                    showPage(currentPage);
                    updateActiveButtonStates(currentPage, 3);
                }
          })

        paginationContainer.appendChild(previousBtn);

        for (let i = 0; i < totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.className = i === 0 ? 'btn-active btn btn-dark arrow-button' : 'btn btn-dark arrow-button';
            pageButton.textContent = i + 1;
            if(totalPages > 10 && i > 4) {
                pageButton.classList.add('d-none');
                if (i === totalPages-1) {
                    const divSpace =  document.createElement('div');
                    divSpace.innerHTML = '. . .';
                    divSpace.classList= 'btn btn-dark div-space';
                    paginationContainer.appendChild(divSpace);
                  }
            }
            pageButton.addEventListener('click', () => {
              currentPage = i;
              showPage(currentPage);
              updateActiveButtonStates(pageButton, 1);
            });
           paginationContainer.appendChild(pageButton);
        }
        
        if(paginationContainer.children.length != 1) {
            const added = Array.from(content.children).filter(el => el.classList.contains('pagination')).length;
            if(added < 1) {
                paginationContainer.appendChild(nextBtn);
                content.appendChild(paginationContainer);
            } else {
                content.removeChild( Array.from(content.children).find(el => el.classList.contains('pagination')));
                paginationContainer.appendChild(nextBtn);
                content.appendChild(paginationContainer);

            }
        }
        }

        function updateActiveButtonStates(button,type) {
            const buttons = document.querySelector('.pagination').querySelectorAll('button');
            let activeButton;
            Array.from(buttons).forEach((btn) => {
                btn.classList.remove('btn-active');
            });
            if(type === 1) {
            button.classList.add('btn-active');
            activeButton = button;
            }
            else {
                buttons[currentPage + 1].classList.add('btn-active');
                activeButton = buttons[currentPage + 1];
            } 

            const activeButtonIndex = Array.from(buttons).indexOf(activeButton);
            if(activeButtonIndex < buttons.length - 2){
                buttons[activeButtonIndex].classList.remove('d-none');
                Array.from(buttons).forEach((button, index) => {
                    if(index > activeButtonIndex - 5 && index < activeButtonIndex + 5) {
                        button.classList.remove('d-none');
                    }
                    else {
                        if(index > 0 && index < buttons.length -1) {
                            button.classList.add('d-none');
                        }
                    }
                })

               if(activeButtonIndex == buttons.length - 7) {
                if(document.querySelector('.pagination').querySelector('.div-space') !== null) {
                    document.querySelector('.pagination').removeChild(document.querySelector('.pagination').querySelector('.div-space'));
                }
               }
            }
        }


      if(items !== '') {
        showPage(currentPage);
        createPageButtons();
      }


    return (
        <div className='w-100 text-end table-content-contacts'>
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
                {contactsParameter.contactsParameter.map((contact) => (
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
    )
}

export default ContactsComponent;