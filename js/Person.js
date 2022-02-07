class Person {
    //getter and setter method

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }
    /** setter method for name validation */
    set name(name) {
        let nameRegex = RegExp('^[A-z]{1}[a-z]{3,}$');
        if (nameRegex.test(name))
            this._name = name;
        else throw 'Name is incorrect';
    }

    get phoneNumber() {
        return this._phoneNumber;
    }
    set phoneNumber(phoneNumber) {
        let phoneRegex = RegExp('^([0-9]{2}\\s)?[0-9]{10}$');
        /*  let phoneRegex = RegExp('(0/91)?[7-9][0-9]{9}');*/
        if (phoneRegex.test(phoneNumber))
            this._phoneNumber = phoneNumber;
        else throw 'Phone Number is incorrect';

    }

    get address() {
        return this._address;
    }
    /*  set address(address) {
      /*    let addRegex = RegExp('^([0-9]*[a-zA-Z]){3,}[0-9]*$');
      let addRegex = RegExp('^([A-Za-z0-9/.,-]{3,}.)+$');
          if (addRegex.test(address))
              this._address = address;
          else throw 'Address is incorrect';
      }
  */
    set address(address) {
        const addressRegex = RegExp('^([A-Za-z0-9/.,-]{3,}.)+$');
        if (addressRegex.test(address)) {
            this._address = address;
        } else {
            throw "Sorry entered address is incorrect";
        }
    }


    get city() {
        return this._city;
    };

    set city(city) {
        this._city = city;
    }

    get state() {
        return this._state;
    };
    set state(state) {
        this._state = state;
    }

    get zip() {
        return this._zip;
    }
    /** setter method for date with validation no future date , should be within 30days of joining */
    set zip(zip) {
        this._zip = zip;
    }

    //method
    toString() {

        return "id : " + this._id + ", name : " + this._name + ", phoneNumber : " + this._phoneNumber + ", address : " + this._address +
            ", city : " + this._city + ", state : " + this._state + ", zip : " + this._zip;

    }

}