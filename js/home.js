let personDataList;

window.addEventListener('DOMContentLoaded', (event) => {
    if (site_properties.use_local_storage.match("true")) {
        getDataFromLocalStorage();
    } else
        getDataFromServer();
})

function processEmployeePayrollDataResponse() {
    //Create another method for response because this should implement after we get response from server
     document.querySelector('.person-count').textContent = personDataList.length;
    createInnerHtml();
    localStorage.removeItem("edit-person");
}

const getDataFromLocalStorage = () => {
    personDataList = localStorage.getItem('PersonDataList') ?
        JSON.parse(localStorage.getItem('PersonDataList')) : [];
    processEmployeePayrollDataResponse();
}

const getDataFromServer = () => {

    makeServiceCall("GET", site_properties.server_url, false)
        .then(response => {
            personDataList = JSON.parse(response);
            processEmployeePayrollDataResponse();
        })
        .catch(error => {
            console.log("Get Error Status : " + JSON.stringify(error));
            personDataList = [];
            processEmployeePayrollDataResponse();
        })
}

const createInnerHtml = () => {
    const headerHtml = "<tr><th>Fullname</th><th>Address</th>" +
        "<th>City</th><th>State</th><th>Zip Code</th><th>Phone Number</th></tr>";
    let innerHtml = `${headerHtml}`;
    for (let personData of personDataList) {
        innerHtml = `${innerHtml}
            <tr>
            <td>${personData._name}</td>
            <td>${personData._address}</td>
            <td>${personData._city}</td>
            <td>${personData._state}</td>
            <td>${personData._zip}</td>
            <td>${personData._phoneNumber}</td>
            <td>
                <img id ="${personData.id}" src="../assets/images/delete-black-18dp.svg" alt="Delete" onClick=remove(this)>
                <img id ="${personData.id}" src="../assets/images/create-black-18dp.svg" alt="Edit" onClick=update(this)>
            </td>
        </tr>`
            ;
    }
    document.querySelector('#display').innerHTML = innerHtml;
}
/*
const remove = (data) => {

    let personData = personDataList.find(data => data.id == data.id);
    console.log(personData);
    if (!personData) {
        return;
    }
    const index = personDataList.map(data => data.id).indexOf(personData.id);
    console.log(index);
    personDataList.splice(index, 1);
    if (site_properties.use_local_storage.match("true")) {
       // personDataList.splice(index, 1);
        localStorage.setItem('PersonDataList', JSON.stringify(personDataList));
        document.querySelector('.person-count').textContent = personDataList.length;
        createInnerHtml();
    } else {
        const deleteUrl = site_properties.server_url + personData.id.toString();
        console.log(deleteUrl);
       // personDataList.splice(index, 1);
        makeServiceCall("DELETE", deleteUrl, true)
            .then(response => {
                console.log(response)
                document.querySelector(".person-count").textContent = personDataList.length;
                createInnerHtml();
            })
            .catch(error => {
                alert("Error while deleting " + error)
            })
    }
}*/
const remove = (data) => {
    //alert("Delete")
    let personData = personDataList.find(addressData => addressData.id == data.id);
    if (!personData) {
        return;
    }
    const index = personDataList.map(addressData => addressData.id).indexOf(personData.id);
    personDataList.splice(index, 1);
   // if(site_properties.useLocalStorage.match("true")){
    if (site_properties.use_local_storage.match("true")) {
        // addressBookList.splice(index, 1);
        localStorage.setItem('PersonDataList', JSON.stringify(personDataList));
        createInnerHtml();
    } else {
        const deleteUrl = site_properties.server_url + personData.id.toString();
        makeServiceCall("DELETE",deleteUrl,true)
            .then(responseText=>{
                console.log(responseText)
                createInnerHtml();
            })
            .catch(error=>{
                console.log("Delete Error Status: " + JSON.stringify(error));
                alert("Error while deleting "+error)
            })
    }
}
const update = (data) => {
    let personData = personDataList.find(empData => empData.id == data.id);
    if (!personData) {
        return;
    }
    localStorage.setItem('edit-person', JSON.stringify(personData));
    console.log(personData);
    window.location.replace(site_properties.add_person_page);
}