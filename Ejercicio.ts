import express, {Request, Response} from "npm:express@4.18.2"
import mongoose from "npm:mongoose@7.6.3"

const Schema= mongoose.Schema;

enum raza {
    Hobbits,
    Humanos,
    Elfos,
    Enanos,
    Ents
}

const personajeschema = new Schema({
    nombre: { type: String, requires:true},
    raza: {type: raza, requires: true},
    descripcion: {type: String, requires: true},
    habilidades: {type: String, requires: true},
    id: { type: String, requires:true},
})

type personaje={
    nombre: String,
    raza: String,
    descripcion: String,
    habilidades: String,
    id: mongoose.Types.ObjectId
}

const Modelopersonaje= mongoose.model<personaje>("personaje", personajeschema);

await mongoose.connect("mongodb+srv://nacho:12345@cluster0.mfoc843.mongodb.net/TierraMedia?retryWrites=true&w=majority");

const miapp= express();

miapp.get("/api/tierramedia/personajes", async (res:Request, req:Response) =>
{
    const personajes = await Modelopersonaje.find().exec();
    res.send(JSON.stringify(personajes));
})

miapp.get("/api/tierramedia/personajes/:id", async (res:Response, req:Request) =>
{
    try 
    {
        const ID = req.params.id;
        const resultado = await Modelopersonaje.find({id: ID}).exec();
        res.send(JSON.stringify(resultado));
    } catch (e) {
        res.status(404).send("ID no valido")
    }
})

miapp.post("/api/tierramedia/personajes", async (res:Response, req:Request) =>
{
    try     
    {
        const nuevomodelo =  new Modelopersonaje({
            nombre: req.params.nombre,
            raza: req.params.raza,
            descripcion: req.params.descripcion,
            habilidades: req.params.habilidades,
            id: req.params.id,
        });

          await nuevomodelo.save();
        
          res.send(JSON.stringify(nuevomodelo));   
    } catch (e) {
        res.status(404).send("No existe esa raza")
        //res.status(500).send("Faltan datos")
    }
})

miapp.put("/api/tierramedia/personajes/:id", async (res:Response, req:Request) =>
{
    try 
    {
        const ID = req.params.id;
        const Update = await Modelopersonaje.findOneAndUpdate({id: ID},{
            nombre: req.params.nombre,
            raza: req.params.raza,
            descripcion: req.params.descripcion,
            habilidades: req.params.habilidades,
            id: req.params.id,
        });
     
        res.send(JSON.stringify(Update));
    } catch (e) {
        res.status(404).send("ID no valido")
        res.status(500).send("No existe esa raza")
    }
})

miapp.delete("/api/tierramedia/personajes/:id", async (req:Request, res:Response) =>
{
    try 
    {
        const ID = req.params.id;
        const resultado = await Modelopersonaje.findOneAndDelete({id: ID}).exec();
        res.send(JSON.stringify(resultado));
    } catch (e) {
        res.status(404).send("ID no valido")
    }
})

miapp.listen(3000)