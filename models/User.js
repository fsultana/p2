
class User {
    constructor() {
        this.email = "";         //starting with empty value for user
        this.password = "";
        this.skills = [];
        this.major = "";
        this.residency = "";
    }
    serialize() {               // key-value pairs
        let serial = {
            "email": this.email,
            "password": this.password,
            "skills": this.skills,
            "major": this.major,
            "residency": this.residency
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

}

module.exports = User;