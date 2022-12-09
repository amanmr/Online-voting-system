const Sequelize = require('sequelize')

const db = new Sequelize('voting_system', 'adminvote', 'mypass', {
    host: 'localhost',
    dialect: 'mysql',
})
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

/*db.sync({force:true})
    .then(()=>console.log("success"))
    .catch((err)=>console.error(err))*/
module.exports = {
    db,Voter, Candidate
}