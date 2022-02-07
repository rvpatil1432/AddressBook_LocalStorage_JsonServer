const checkName=(name)=>{
    let nameRegex=RegExp('^[A-Z]{1}[a-zA-Z]{2,}$')
   if(!nameRegex.test(name))
       throw "Name is Incorrect!"
}

const checkPhoneNumber=(phoneNumber)=>{
    let phoneRegex = RegExp('^([0-9]{2}\\s)?[0-9]{10}$');
   if(!phoneRegex.test(phoneNumber))
       throw "Phone Number is Incorrect!"
}

const checkAddress=(address)=>{
    const addressRegex = RegExp('^([A-Za-z0-9/.,-]{3,}.)+$');
   if(!addressRegex.test(address))
       throw "Address is Incorrect!"
}

