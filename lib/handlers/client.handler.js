import dbConnect from "../db/dbConnect";
import clientModel from "../db/models/client.model.mjs";

export const createClientInformation = async (information) => {
  
    let result = {status: 'error', message: "An Error Occurred", data: []};
    await dbConnect();

    try {
        let data = await clientModel.create(information);
        result = {status: 'ok', message: "Client created successfully", data: data}

    } catch (error) {   

        console.log(error)
    }

    return result

}