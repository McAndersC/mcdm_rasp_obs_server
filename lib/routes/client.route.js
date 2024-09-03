
const clientRouter = express.Router();
clientRouter.post('/client/information', async (req, res) => {
    
    const {name, port, ip} = req.body;

    const newClientInformatione = {
        name: name,
        port: port,
        id: id
    }



    const result = await createEmployee(newClientInformation);
    
    if(result.status === 'ok') {

        return res.status(200).send(
            { message: result.message, 
                data: result.data 
            }
        );

    } else {

        return res.status(200).send(
            { 
                message: result.message, 
                data: [] 
            }
        );

    }
    
});

export default clientRouter;