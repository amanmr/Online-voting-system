const Sequelize = require('sequelize')
const mysql = require('mysql')
var fs = require('fs');
const db = new Sequelize('voting_system', 'iamamanmr', 'ThisissumiT@123', {
    host: 'usersdatabase.mysql.database.azure.com',
    dialect: 'mysql',
    port: 3306,
    ssl: { 
        ca: fs.readFileSync("C:/Users/iamam/Downloads/DigiCertGlobalRootCA.crt.pem")
    }
})
/*var conn = mysql.createConnection({ 
    host: "usersdatabase.mysql.database.azure.com", 
    user: "iamamanmr", 
    password: "ThisissumiT@123", 
    database: "voting_system", 
    port: 3306, 
    ssl: { ca: fs.readFileSync("C:/Users/iamam/Downloads/DigiCertGlobalRootCA.crt.pem") 
} });
conn.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});*/

/*var db = new Sequelize('voting_system', 'iamamanmr', 'ThisissumiT@123', {
    host: 'usersdatabase.mysql.database.azure.com',
    dialect: 'mssql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    dialectOptions: {
      encrypt: true,
      ssl: true
    }
  });*/
  
const datatype=Sequelize.DataTypes
const Voter = db.define('voters', {
    id: {
        type: datatype.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: datatype.STRING(50),
        allowNull: false,
    },
    contact: {
        type: datatype.STRING(10),
        allowNull: false,
    },
    password:{
        type:datatype.STRING(20),
        allowNull:false
    },
    address: {
        type: datatype.STRING(50),
        allowNull: false,
    },
    voteStatus:{
        type:datatype.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    image:{
        type:datatype.STRING,
        allowNull:true
    }
})

const Candidate = db.define('candidates', {
    id: {
        type: datatype.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: datatype.STRING(50),
        allowNull: false
    },
    contact: {
        type: datatype.STRING(10),
        allowNull: false,
    },
    password:{
        type:datatype.STRING(20),
        allowNull:false
    },
    address: {
        type: datatype.STRING(50),
        allowNull: false,
    },
    votes: {
        type: datatype.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    voteStatus:{
        type:datatype.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    image:{
        type:datatype.STRING,
        allowNull:true
    }
})





Candidate.hasMany(Voter)
Voter.belongsTo(Candidate)

db.sync({alter:true})
    .then(()=>console.log("success"))
    .catch((err)=>console.error(err))
module.exports = {
    db,Voter, Candidate
}