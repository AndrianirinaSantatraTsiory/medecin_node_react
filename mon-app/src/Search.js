//import MedecinsList from "./MedecinsList";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link,useParams } from "react-router-dom/cjs/react-router-dom.min";

const Search = () => {
    const params=useParams()
    const [find,setFind]= useState(params.find)

    const [medecins, setMedecins] = useState([]);

    const handleDelete = (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer?")) {
            axios.delete("http://localhost:5000/medecin/remove/" + id)
                .then(() => { window.location.reload() })
        }
    }


    useEffect(() => {
            axios.get('http://localhost:5000/medecin/search/'+find)
                .then(res => setMedecins(res.data.medecins))
                .catch(err => console.log(err.message))     
    }, [find])

    return (
        <div className="Search">
            <form className="search">
                <input type="text" onChange={(e) => { setFind(e.target.value) }} required />&nbsp;
                <Link to={"/Search/" + find} className="btnSearch">Rechercher</Link>
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
                    {medecins.length > 0 && medecins.map((medecin, index) => {
                        return <tr className="medecin-preview" key={index}>
                            <td> {medecin.numedecin} </td>
                            <td> {medecin.nom} </td>
                            <td> {medecin.nombreJours.toLocaleString()} </td>
                            <td> {medecin.taux.toLocaleString()} </td>
                            <td> {medecin.prestation.toLocaleString()} </td>
                            <td>
                                <Link to={"/Edit/" + medecin.numed} className="modifier" >MODIFIER</Link>&nbsp;
                                <button className="supprimer" onClick={() => { handleDelete(medecin.numed) }}>SUPPRIMER</button>
                            </td>
                        </tr>
                    })}
                    {medecins.length === 0 && <tr className="medecin-preview">
                            <td>Pas de résultats</td>
                            <td>Pas de résultats</td>
                            <td>Pas de résultats</td>
                            <td>Pas de résultats</td>
                            <td>Pas de résultats</td>
                            <td>Pas de résultats</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Search;