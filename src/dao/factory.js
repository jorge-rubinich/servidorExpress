persistence= "MONGO"

switch(persistence){
    case "MONGO":
        module.exports = require("./mongoFactory");
        break;  

    case "MYSQL":
        module.exports = require("./mysqlFactory");
        break;
}
