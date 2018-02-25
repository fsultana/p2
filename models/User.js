
class User {
    constructor() {
        this.email = "";         //starting with empty value for user
        this.password = "";
        this.skills = [];
        this.major = "";
        this.residency = "";
        this.checkValidity = false;
    }
    
    serialize() {               // key-value pairs
        let serial = {
            "email": this.email,
            "password": this.password,
            "skills": this.skills,
            "major": this.major,
            "residency": this.residency,
            "checkValidity": this.checkValidity
        };        
        return serial;
    }
    static deserialize(serial) {
        let sc = new User();
        // sc.email = serial.email;          //object.property
        //sc.email = serial["email"]; 
        for (var key in serial) {
            if (serial.hasOwnProperty(key)) {
                sc[key] = serial[key];
            }
        }   

        return sc;
    }
    // to check all the errors together for empty form submission
    getErrors(){
        let errors = [];

		if(this.email.indexOf("@") < 0){
            errors.push("email");
        }
        if(this.password.length < 4){
            errors.push("password");
        }
        if(this.skills.length === 0){
            errors.push("skills");
        }
        if(this.major.length === 0){
            errors.push("major");
        }
        if(this.residency.length === 0){
            errors.push("residency");
        }
        return errors;
    }

    isValid(){
        return this.getErrors().length == 0;
    }

    setCheckValidity(v){
        this.checkValidity = v;
    }
}

module.exports = User;