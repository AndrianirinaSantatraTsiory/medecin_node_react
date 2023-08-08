const db=require("../models/base");
//affiche tout
const getAll=(req,res) => {
    const all="SELECT numedecin,numed,nom,nombreJours,taux,nombreJours*taux as prestation FROM medecin";
    db.query(all,(err,results) => {
        if(err){
            res.json({
                status:false,
                error:err});
        }else{
            res.json({
                status:true,
                medecins:results});
        }
    });
}

//Selectionner
const get=(req,res) => {
    const one="SELECT numedecin,numed,nom,nombreJours,taux,nombreJours*taux as prestation FROM medecin where numed=?";
    db.query(one,req.params.id,(err,result) => {
        if(err){
            res.json({
                status:false,
                error:err});
        }else{
            res.json({
                status:true,
                medecin:result[0]});
        }
    });
}

//nouveau
const create_new=async (req,res) => {
    const creer="INSERT INTO medecin (nom,nombreJours,taux,numedecin) VALUES (?,?,?,?)";
    console.log(await suggest());
    db.query(creer,[req.body.nom, req.body.nombreJours, req.body.taux,await suggest()],(err,result) => {
        if(err){
            res.json({
                status:false,
                error:err});
        }else{
            res.json({
                status:true,
                message:"ajout avec succès"});
        }
    });
}

//suppression
const del=(req,res) => {
    const del="DELETE FROM medecin WHERE numed=?";
    db.query(del,req.params.id,(err,results) => {
        if(err){
            res.json({
                status:false,
                error:err});
        }else{
            res.json({
                status:true,
                message:"suppression effectué"});
        }
    })
}

//modifier
const update=(req,res) => {
    const modif="UPDATE medecin SET nom=?, nombreJours=?, taux=? WHERE numed=?";
    
    db.query(modif,[req.body.nom, req.body.nombreJours, req.body.taux, req.params.id],(err,results) => {
        //console.log(modif);
        if(err){
            res.json({
                status:false,
                error:err});
        }else{
            res.json({
                status:true,
                message:"mise à jour effectué"});
        }
    })   
}

//rechercher
const search=(req,res) => {
    const recherche="SELECT numedecin,numed,nom,nombreJours,taux,nombreJours*taux as prestation FROM medecin where nom like '%"+req.params.rech+"%' or numedecin like'%"+req.params.rech+"%'";
    db.query(recherche,(err,results) => {
        if(err){
            res.json({
                status:false,
                error:err});
        }else{
            res.json({
                status:true,
                medecins:results});
        }
    });
}
const suggest=async () => {
    let base="Med";
    const medExists = await already_exist("med");
    console.log(medExists);
    //console.log(already_exist("med"));
    ret=base+1;
    for(let i=2;await already_exist(ret);i++){
        ret=base+i;
    }
    return ret;
}

const already_exist = (med) => {
    return new Promise((resolve, reject) => {
      const sel = "SELECT * FROM medecin where numedecin=?";
      db.query(sel, med, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.length !== 0);
        }
      });
    });
  };
  
module.exports={
    getAll,
    del,
    get,
    create_new,
    update,
    search,
    suggest
}