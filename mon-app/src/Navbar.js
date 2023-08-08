import {Link} from "react-router-dom";

const Navbar = () => {
    return ( 
        <div className="navbar">
            <h1>LISTE DES MEDECINS</h1>
            <div className="links">
                <Link to="/">Accueil</Link>
                <Link to="/create">Ajouter</Link>
            </div>
        </div>    
     );
}
 
export default Navbar;