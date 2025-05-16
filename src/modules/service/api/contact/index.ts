import axios from "../../../../lib/axios";

class ContactoService{
    async create(contactoData: contacto){
        const { data } = await axios.post("/contacto", contactoData);
        return data;
    }

    async getAll(){
        return await axios.get("contacto")
    }

//         async getAll(contactoData: contacto){
//         return await axios.get("contacto", {
//             params: contactoData,
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         })
//     }
 }

export const contactoService = new ContactoService()