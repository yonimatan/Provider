const tbody = document.getElementById('tbody');
const message = document.getElementById('message');

//getting the search parameter from the URL.
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('search');

/*
* If search parameter is null, then just scrap and show all data
* but if its not null, that means user searched for something
* and show data related to that search term.
*/

if(myParam === null){
    message.innerText = 'Loading Data';
    axios.get(`${window.location.origin}/scrap`)
        .then(response => {
            console.log(response.data)
            message.innerText = '';
            response.data.forEach((el, idx)=> {
                tbody.innerHTML += `<tr>
            <th scope="row">${idx+1}</th>
            <td>${el.name || el.item}</td>
            <td>${el.area || el.city}</td>
            <td>${el.price || ''}</td>
            <td>${el.description || ''}</td>
            <td><a class="btn btn-primary", href="${window.location.origin}" 
                  target="popup" 
                  onclick="window.open('${window.location.origin}/scrap/${el._id}','popup','width=800,height=400,scrollbars=no,resizable=no'); return false;">
                    Open Link
                </a>
            </td>
             <td><a class="btn btn-primary", href="${window.location.origin}" 
                  target="popup" 
                    onclick="window.open('${window.location.origin}/mail/${el._id}/chairs','popup','width=800,height=400,scrollbars=no,resizable=no'); return false;">
                    Share it
                </a>
             </td>
                
        </tr>`
            })
        })

    //to scrap data after every 4 hours
    setInterval(()=> {
        message.innerText = 'Loading Data';
        axios.get(`${window.location.origin}/scrap`)
            .then(response => {
                message.innerText = '';
                response.data.forEach((el, idx)=> {
                    tbody.innerHTML += `<tr>
            <th scope="row">${idx+1}</th>
            <td>${el.name || el.item}</td>
            <td>${el.area || el.city}</td>
            <td>${el.price}</td>
            <td>${el.description}</td>
            <td><a class="btn-primary", href="${window.location.origin}" 
                  target="popup" 
                  onclick="window.open('${window.location.origin}/scrap/${el._id}','popup','width=600,height=600,scrollbars=no,resizable=no'); return false;">
                    Open Link
                </a>
                </td>
            <td><a class="btn-primary", href="${window.location.origin}" 
                  target="popup" 
                  onclick="window.open('${window.location.origin}/mail/${el._id}/chairs','popup','width=600,height=600,scrollbars=no,resizable=no'); return false;">
                    Share it
                </a>
             </td>
        </tr>`
                })
            })
    }, 14400000);

} else {
    //showing data related to a search term.
    message.innerText = 'Search Results'
    axios.post(`${window.location.origin}/results`, {
        search: myParam
    }).then(results => {
        results.data.forEach((el,i)=> {
            tbody.innerHTML += `<tr>
            <th scope="row">${i+1}</th>
            <td>${el.name || el.item}</td>
            <td>${el.area || el.city}</td>
            <td>${el.price}</td>
            <td>${el.description}</td>
            <td><a class="btn-primary", href="${window.location.origin}" 
                  target="popup" 
                  onclick="window.open('${window.location.origin}/scrap/${el._id}','popup','width=600,height=600,scrollbars=no,resizable=no'); return false;">
                    Open Link
                </a>
                </td>
            <td><a class="btn-primary", href="${window.location.origin}" 
                  target="popup" 
                  onclick="window.open('${window.location.origin}/mail/${el._id}/chairs','popup','width=600,height=600,scrollbars=no,resizable=no'); return false;">
                    Share it
                </a>
             </td>
        </tr>`
        })
    })
}
