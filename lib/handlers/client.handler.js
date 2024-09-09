import dbConnect from "../db/dbConnect.js";
import clientModel from "../db/models/client.model.mjs";

export const createClientInformation = async (information) => {
  
    let result = {status: 'error', message: "An Error Occurred", data: []};
    await dbConnect();

    try {


        let client = await clientModel.find({ip: information.ip, port: information.port});

        if(client.length > 0 && !client.name) {

            let data = await clientModel.updateOne({ip: information.ip}, information);
            result = {status: 'error', message: "Client Updated", data: data}
            return result;        
        }   
        console.log('information', information)
        let data = await clientModel.create(information);
        result = {status: 'ok', message: "Client created successfully", data: data}

    } catch (error) {   

        console.log(error)
    }

    
    return result

}