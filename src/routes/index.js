const admin = require('firebase-admin')

var serviceAccount = require("../../node-firebase-example-8ae44-firebase-adminsdk-akzgc-38cdde64f2.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://node-firebase-example-8ae44-default-rtdb.firebaseio.com/"
});
const db = admin.database();

const { Router}= require('express');
const router = Router();

router.get('/', (req, res) => {
    db.ref('contacts').once('value', (snapshot) => {
       let data = snapshot.val();
       res.render('index', {contacts: data})
    });
})

router.post('/new-contact', (req, res) => {
    
    const newContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
    }
    db.ref('contacts').push(newContact);
    res.redirect('/');
});

router.get('/delete-contact/:id', (req, res) => {
    db.ref('contacts/' + req.params.id).remove();
    res.redirect('/');
});

router.get('/update/:id', ( req, res) =>{
    db.ref('contacts/' + req.params.id).once('value', (snapshot) => {
        let data = snapshot.val();
        console.log(data)
        res.render('update', {contact: data, id: req.params.id}) 
    })
})

router.post('/update-update', (req, res) => {
    
    const contact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
    }

    const id = {id: req.body.id,}

    console.log("jaojaojo")
    console.log(id.id)
    
    db.ref('contacts/' + id.id).update(contact);
    res.redirect('/');
});

module.exports = router;

