const tbody = document.getElementById('tbody');
const message = document.getElementById('message');

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('search');

if(myParam === null){
    message.innerText = 'Loading Data';
    axios.get(`${window.location.origin}/tables/data`)
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
                  onclick="window.open('${window.location.origin}/tables/${el._id}','popup','width=600,height=600,scrollbars=no,resizable=no'); return false;">
                    Open Link
                </a>
                </td>
            <td><a class="btn btn-primary" href="${window.location.origin}" 
                  target="popup" 
                  onclick="window.open('${window.location.origin}/mail/${el._id}/tables','popup','width=600,height=600,scrollbars=no,resizable=no'); return false;">
                    Share it
                </a>
             </td>
        </tr>`
            })
        })

    setInterval(()=> {
        message.innerText = 'Loading Data';
        axios.get(`${window.location.origin}/tables/data`)
            .then(response => {
                message.innerText = '';
                response.data.forEach((el, idx)=> {
                    tbody.innerHTML += `<tr>
            <th scope="row">${idx+1}</th>
            <td>${el.name || el.item}</td>
            <td>${el.area || el.city}</td>
            <td>${el.price}</td>
            <td>${el.description}</td>
            <td><a href="${window.location.origin}" 
                  target="popup" 
                  onclick="window.open('${window.location.origin}/tables/${el._id}','popup','width=600,height=600,scrollbars=no,resizable=no'); return false;">
                    Open Link
                </a>
                </td>
            <td><a href="${window.location.origin}" 
                  target="popup" 
                  onclick="window.open('${window.location.origin}/mail/${el._id}/tables','popup','width=600,height=600,scrollbars=no,resizable=no'); return false;">
                    Share it
                </a>
             </td>
        </tr>`
                })
            })
    }, 14400000);

} else {
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
                  onclick="window.open('${window.location.origin}/tables/${el._id}','popup','width=600,height=600,scrollbars=no,resizable=no'); return false;">
                    Open Link
                </a>
                </td>
            <td><a class="btn-primary", href="${window.location.origin}" 
                  target="popup" 
                  onclick="window.open('${window.location.origin}/mail/${el._id}/tables','popup','width=600,height=600,scrollbars=no,resizable=no'); return false;">
                    Share it
                </a>
             </td>
        </tr>`
        })
    })
}


