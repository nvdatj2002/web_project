import axios from "axios"

const domain = "http://localhost:8080";
const callAPI = async (path, method, data = {}) => {
    try {
        if (method === "GET") {
            console.log(domain + path)
            const response = await axios.get(domain + path);
            if (response.status == 200) {
                return response.data;
            } 
        } else if (method === "POST") {
            console.log(domain + path)
            const response = await axios.post(domain + path, data);
            if (response.status == 200 || response.status == 201) {
                return response.data;
            }
            
        } else if (method === "DELETE") {
            console.log(domain + path)
            const response = await axios.delete(domain + path);
            if (response.status == 200) {
                return response.data;
            }
        } else if (method === "PUT") {
            console.log(domain + path)
            const response = await axios.put(domain + path, data);
            if (response.status == 200) {
                return response.data;
            }
        } else if (method == "uploadFile") {
            console.log(domain + path)
            const response = await axios.post(domain + path, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status == 200) {
                return response.data;
            }
        }

        return;
    } catch (error) {
        console.error(error);
    }
}
export default callAPI;