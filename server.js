const express = require('express')
const app = express()

const { db, Voter, Candidate } = require('./database/candidate')

const multer=require('multer')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public/images")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname)
    }
})
const upload=multer({storage:storage})

app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))


app.post('/login', async (req, res) => {
    try {
        const usertype = req.body.type
        let flag1 = 0
        let flag2 = 0
        const candidates = await Candidate.findAll()
        if (usertype == 'voter') {
            const voters = await Voter.findAll()
            for (let x of voters) {
                if (x.dataValues.contact == req.body.contact && x.dataValues.password == req.body.password) {
                    flag1 = 1
                    res.render('voter', {
                        id: x.dataValues.id,
                        name: x.dataValues.name,
                        contact: x.dataValues.contact,
                        address: x.dataValues.address,
                        voteStatus: x.dataValues.voteStatus,
                        image:x.dataValues.image,
                        user: "Voter",
                        candidates
                    })
                }
            }
        }
        else {
            const candidates = await Candidate.findAll()
            for (let x of candidates) {
                if (x.dataValues.contact == req.body.contact && x.dataValues.password == req.body.password) {
                    flag2 = 1
                    res.render('voter', {
                        id: x.dataValues.id,
                        name: x.dataValues.name,
                        contact: x.dataValues.contact,
                        address: x.dataValues.address,
                        voteStatus: x.dataValues.voteStatus,
                        image:x.dataValues.image,
                        user: "Candidate",
                        candidates
                    })
                }
            }
        }
        if (flag1 == 0 && flag2 == 0) {
            res.send("notfound")
        }
    }
    catch (err) {
        console.error(err)
    }
})

app.post('/register',upload.single('image'), async (req, res) => {
    try {
        await db.sync()
        const usertype = req.body.type
        console.log(req.file)
        if (usertype == 'voter') {
            await Voter.create({
                name: req.body.name,
                contact: req.body.contact,
                password: req.body.password,
                address: req.body.address,
                image: req.file.filename,
            })
        }
        else {
            await Candidate.create({
                name: req.body.name,
                contact: req.body.contact,
                password: req.body.password,
                address: req.body.address,
                image: req.file.filename,
            })
        }
        res.redirect('/')
    }
    catch (err) {
        console.error(err)
    }
})

app.post('/vote', async (req, res) => {
    try {
        await Candidate.findByPk(req.body.cid)
            .then((data) => {
                Candidate.update({
                    votes: data.votes + 1
                }, {
                    where: {
                        id: req.body.cid
                    }
                })
                if(req.body.type=='User : Voter'){
                Voter.update({
                    voteStatus: 1
                }, {
                    where: {
                        id: req.body.uid
                    }
                })}
                else{
                    Candidate.update({
                        voteStatus: 1
                    }, {
                        where: {
                            id: req.body.uid
                        }
                    })
                }
                res.send({ votes: data.votes + 1 })
            })
            .catch((err) => {
                res.send("Error detected")
            })
    }
    catch (err) {
        console.error(err)
    }
})

app.listen(3455, () => {
    console.log("Server started at http://localhost:3455")
})