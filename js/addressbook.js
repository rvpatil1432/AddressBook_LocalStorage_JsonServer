let isUpdate = false;
let addressbookObject = {};

window.addEventListener('DOMContentLoaded', (event) => {
    console.log("server loaded");
    validateInputs();
    checkForUpdate();
});
function validateInputs() {

    const name = document.querySelector('#name');
    const nameError = document.querySelector('.text-error');

    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            nameError.textContent = "";
            return;
        }
        /*
        try {
            let personData = new Person();
            personData.name = name.value;
            nameError.textContent = "";
        } catch (e) {
            nameError.textContent = e;
        }*/
        try {
            checkName(name.value);
            nameError.textContent = "";
        } catch (e) {
            console.error(e);
            nameError.textContent = e;
        }
    });

    const phone = document.querySelector('#phone');
    const phoneError = document.querySelector('.phone-error');

    phone.addEventListener('input', function () {
       /* try {
            let personData = new Person();
            personData.phoneNumber = phone.value;
            phoneError.textContent = "";
        } catch (e) {
            phoneError.textContent = e;
        }*/
        try {
            checkPhoneNumber(phone.value);
            phoneError.textContent = "";
        } catch (e) {
            console.error(e);
            phoneError.textContent = e;
        }
    });

    const address = document.querySelector('#address');
    const addressError = document.querySelector('.address-error');

    address.addEventListener('input', function () {
        /*try {
            let personData = new Person();
            personData.address = address.value;
            addressError.textContent = "";
        } catch (e) {
            addressError.textContent = e;
        }*/
        try {
            checkAddress(address.value);
            addressError.textContent = "";
        } catch (e) {
            console.error(e);
            addressError.textContent = e;
        }
    })
        ;
}
const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setAddressBookObject();
        if (site_properties.use_local_storage.match("true")) {
            /*     let personAddressBook = setAddressBookObject();
                 console.log(personAddressBook);
                 createAndUpdateStorage(personAddressBook);*/
            createAndUpdateStorage();
            alert("Data Stored With Name: " + addressbookObject._name);
            // window.location.replace(Site_Properties.home);
            redirect();
        } else
            createOrUpdatePersonInJsonServer();
            window.location.replace(site_properties.home_page);
        //alert("Data Updated With Name " + addressbookObject._name);
        //redirect();

    } catch (e) {
        console.log(e);
        return;
    }
}

function redirect() {
    console.log("redirect")
    resetForm();
    window.location.replace(site_properties.home_page)
}

const setAddressBookObject = () => {
    if (!isUpdate && site_properties.use_local_storage.match("true")) {
        addressbookObject.id = createNewPersonId();
    }
    addressbookObject._name = getInputValueId('#name');
    addressbookObject._phoneNumber = getInputValueId('#phone');
    addressbookObject._address = getInputValueId('#address');
    addressbookObject._city = getInputValueId('#city');
    addressbookObject._state = getInputValueId('#state');
    addressbookObject._zip = getInputValueId('#zipcode');

    /* let person = new Person();
     person.name = getInputValueId('#name');
     person.phoneNumber = getInputValueId('#phone');
     person.address = getInputValueId('#address');
     person.city = getInputValueId('#city');
     person.state = getInputValueId('#state');
     person.zip = getInputValueId('#zipcode');
     person.id = addressbookObject._id;
     return person;*/
}

//const createAndUpdateStorage = (personData) => {
const createAndUpdateStorage = () => {
    let dataList = JSON.parse(localStorage.getItem("PersonDataList"));

    if (dataList) {
        let existingPersonData = dataList.find(data => data.id == addressbookObject.id);
        if (!existingPersonData) {
            // personData.id = createNewPersonId();
            dataList.push(addressbookObject);
        } else {
            const index = dataList.map(person => person.id).indexOf(addressbookObject.id);
            dataList.splice(index, 1, addressbookObject);
        }
    } else {
        // personData.id = createNewPersonId();
        dataList = [addressbookObject];
    }
    localStorage.setItem('PersonDataList', JSON.stringify(dataList));
}

function createOrUpdatePersonInJsonServer() {
    let url = site_properties.server_url;
    let methodCall = "POST";
    let message = "Data Store with name ";
    if (isUpdate) {
        methodCall = "PUT";
        url = url + addressbookObject.id.toString();
        message = "Data Updated with name ";
    }
    makeServiceCall(methodCall, url, true, addressbookObject)
        .then(response => {
            //  return;
            alert(message + addressbookObject._name)
            console.log(methodCall);
          //  redirect();
        })
        .catch(error => {
            console.log("inside error")
            throw error
        });
}

const getInputValueId = (id) => {
    console.log(id);
    let value = document.querySelector(id).value;
    console.log(value);
    return value;
}

const getSelectedValue = (propertyValue) => {
    let allItem = document.querySelectorAll(propertyValue);
    let setItem = [];
    allItem.forEach(item => {
        if (item.checked) {
            setItem.push(item.value);
        }
    });
    return setItem;
}

const createNewPersonId = () => {
    let personId = localStorage.getItem('PersonId');
    personId = !personId ? 1 : (parseInt(personId) + 1).toString();
    localStorage.setItem('PersonId', personId);
    return personId;
}

const resetForm = () => {
    console.log("resetForm")
    setValue('#name', '');
    setValue('#address', '');
    setValue('#city', '');
    setValue('#state', '');
    setValue('#zipcode', '');
    setValue('#phone', '');
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const checkForUpdate = () => {
    const jsonData = localStorage.getItem('edit-person');
    isUpdate = jsonData ? true : false;
    if (!isUpdate) return;
    addressbookObject = JSON.parse(jsonData);
    setForm();
}

const setForm = () => {
    setValue('#name', addressbookObject._name);
    setValue('#address', addressbookObject._address);
    setValue('#city', addressbookObject._city);
    setValue('#state', addressbookObject._state);
    setValue('#zipcode', addressbookObject._zip);
    setValue('#phone', addressbookObject._phoneNumber);

}