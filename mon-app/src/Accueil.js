//import MedecinsList from "./MedecinsList";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Accueil = () => {
    const [find, setFind] = useState()
    const [medecins, setMedecins] = useState([]);

    let total=0;
    let minimum=0;
    let maximum=0;
    let once=true;

    const handleDelete = (id) =>{
        if(window.confirm("Voulez-vous vraiment supprimer?")){
            axios.delete("http://localhost:5000/medecin/remove/"+id)
                .then(() => {window.location.reload()})
        }
    }

    useEffect(() => {
        axios.get('http://localhost:5000/medecin/getAll')
            .then(res => setMedecins(res.data.medecins))
            .catch(err => console.log(err.message))
    }, [])

return ( 
        <div className="accueil">
            <form className="search">
                <input type="text" onChange={(e) => {setFind(e.target.value)}} required />&nbsp;
                <Link to={"/Search/" + find} type="submit" className="btnSearch">Rechercher</Link>
            </form>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Numéro</th>
                                <th>Nom</th>
                                <th>Nombre de jours</th>
                                <th>Taux journalier</th>
                                <th>Prestation</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                {medecins.length > 0 && medecins.map((medecin,index) => {
                                total=total+medecin.prestation;
                                if (once){
                                    minimum=medecin.prestation;
                                    maximum=medecin.prestation;
                                    once=false;
                                }
                                if (minimum > medecin.prestation) {
                                    minimum = medecin.prestation;
                                }
                                if (maximum < medecin.prestation) {
                                    maximum = medecin.prestation;
                                }
                                return <tr className="medecin-preview" key={index}>
                                    <td> {medecin.numedecin} </td>
                                    <td> {medecin.nom} </td>
                                    <td> {medecin.nombreJours.toLocaleString()} </td>
                                    <td> {medecin.taux.toLocaleString()} </td>
                                    <td> {medecin.prestation.toLocaleString()} </td>
                                <td>
                                    <Link to={"/Edit/" + medecin.numed} className="modifier" >Modifier</Link>&nbsp;&nbsp;&nbsp;
                                    <button className="supprimer" onClick={() => {handleDelete(medecin.numed)}}>Supprimer</button>
                                </td>
                            </tr>})}
                        </tbody>
                    </table>    
            <div className="basTableau">
            <p> Total : {total.toLocaleString()} </p>&nbsp;&nbsp;&nbsp;&nbsp;
            <p> Minimal : {minimum.toLocaleString()} </p>&nbsp;&nbsp;&nbsp;&nbsp;
            <p> Maximal : {maximum.toLocaleString()}</p>
            </div>
        </div>
     );
}
 
export default Accueil;