import {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
const Create = () => {
    const history=useHistory();
    const [nom,setNom]= useState("");
    const [nombreJours, setNbJours]= useState();
    const [taux, setTaux] = useState();

    const handleOnSubmit = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:5000/medecin/new",{nom,nombreJours,taux})
            .then(() => {history.push("/");})
        
    }
    return ( 
        <div className="create">
            <h2>Ajouter un nouveau médecin</h2>
            <form onSubmit={handleOnSubmit}>
                <label>Nom:</label>
                <input type="text" value={nom} onChange={(e) => {setNom(e.target.value)}} required />
                <label>Nombre de jours:</label>
                <input type="number" value={nombreJours} onChange={(e) => { setNbJours(e.target.value) }} required />
                <label>Taux journalier:</label>
                <input type="number" value={taux} onChange={(e) => { setTaux(e.target.value) }} required />
                <button type="submit">Ajouter</button>
            </form>    
        </div>
     );
}
 
export default Create;