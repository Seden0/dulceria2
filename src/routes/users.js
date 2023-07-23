const {Router}= require('express');
const {db, admin}= require('../firebase');
const router = Router();
const {FieldValue}= require('firebase-admin/firestore');

router.get('/users', async(req, res)=>{
    const querySnapshot = await db.collection('users').get()
 
    const usersget = querySnapshot.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
    }))
    res.send(usersget)
})


router.get('/users/:id', async(req, res)=>{
        const cityRef = db.collection('users').doc(req.params.id);
        const doc = await cityRef.get();

        if (!doc.exists) {
            res.status(400).json({
                error:true,
                message:"Ocurrio un error al procesar",
        
            });
          } else {
            console.log('Document data:', res.json(doc.data()));
          }
})
router.get('/user/:name', async(req, res)=>{
        const usersRef = db.collection('users');
        const snapshot = await usersRef.where('name', '==', req.params.name).get();
        if (snapshot.empty) {
            res.status(400).json({
                error:true,
                message:"Ocurrio un error al procesar",
        
            });
        }  
        snapshot.forEach(doc => {
        res.send(doc.data());
        });

})

router.post('/create-user', async (req, res)=>{
try{
    const user={
        email:req.body.email,
        password:req.body.password,
        name:req.body.name,
        lastname:req.body.lastname,
        phone:req.body.phone,
    }

    const users= await admin.createUser({
        email:user.email,
        password:user.password,
        emailVerified:false,
        disabled:false
    });

    const querySna = await db.collection('users').add({
        name:user.name,
        lastname:user.lastname,
        phone:user.phone,
        email:user.email,
        password:user.password,
    })

    res.send(users); 
}catch(error){
    res.status(400).send("Ocurrio algo");
}
})

router.put('/update/:id', async(req, res) => {
    try {
      const userRef = await db.collection("users").doc(req.params.id)
      .update({
        ...req.body
      });
      res.send(userRef);
    } catch(error) {
        return res.status(400).json({
            error:true,
            message:"Ocurrio un error al procesar",
    
        });
    }
});

router.delete('/delete/:id', async (req, res)=>{
        const usersRef = db.collection('users');
        const doc =await usersRef.doc(req.params.id).get();
        if (!doc.exists) {
            console.log(doc)
            res.status(400).json({
                error:true,
                message:"Ocurrio un error al procesar",
        
            });
          } else {
            const doc =await usersRef.doc(req.params.id).delete();
            res.send("Se elimino")
          }
});

router.delete('/deleteEm/:email', async (req, res)=>{
    try{
        const response =await db.collection('users').where('email', '==', req.params.email).delete();
        res.send(response);
    }catch(error){
        return res.status(400).json({
            error:true,
            message:"Ocurrio un error al procesar",
    
        });
    }
})


module.exports = router;