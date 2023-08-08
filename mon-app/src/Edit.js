import { useState, useEffect} from "react";
import axios from "axios";
import { useHistory,useParams} from "react-router-dom";
const Edit = () => {
    const history = useHistory();
    const params=useParams();
    
    const id=params.id;

    const [nom, setNom] = useState("");
    const [nombreJours, setNbJours] = useState();
    const [taux, setTaux] = useState();

    const handleOnSubmit = (e) => {
         e.preventDefault();
         axios.put("http://localhost:5000/medecin/update/"+id, { nom, nombreJours, taux })
             .then(() => { history.push("/"); })
    }
    
    useEffect(() => {
        axios.get('http://localhost:5000/medecin/get/'+id)
            .then(res => {
                const medecin=res.data.medecin;

                setNom(medecin.nom);
                setNbJours(medecin.nombreJours)
                setTaux(medecin.taux)
            })
            .catch(err => console.log(err.message))
    },[])

    return (
        <div className="create">
            <h2>Modification les informations du médecin </h2>
            <form onSubmit={handleOnSubmit}>
                <label>Nom:</label>
                <input type="text" value={nom} onChange={(e) => { setNom(e.target.value) }} required />
                <label>Nombre de jours:</label>
                <input type="number" value={nombreJours} onChange={(e) => { setNbJours(e.target.value) }} required />
                <label>Taux journalier:</label>
                <input type="number" value={taux} onChange={(e) => { setTaux(e.target.value) }} required />
                <button type="submit">Modifier</button>
            </form>
        </div>
    );
}

export default Edit;