import { MongoClient } from "mongodb";
import moment from "moment";

async function search() {
    const client = new MongoClient("mongodb://localhost:32772");
    await client.connect();
    const db = client.db("shard");
    const users = db.collection("COLLEC_01");

    // Setup et lancement du timer
    moment.locale("fr");
    const start = moment();

    // Recherche des utilisateurs dont le nom contient 'a'
    const cursor = users.find({ nom: { $regex: /a/ } });

    // Transformation du curseur en tableau pour afficher les résultats
    const results = await cursor.toArray();

    // Fin du timer
    const end = moment();
    
    // Affichage des résultats
    //console.log(`Nombre d'utilisateurs trouvés : ${results.length}`);
    //console.log(results);
    console.log(`Recherche effectuée en ${end.diff(start, "milliseconds")} ms`);

    await client.close();
}

// Exécuter la fonction
search().catch(console.error);
