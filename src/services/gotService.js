export default class GotService {
    constructor() {
        this._apiBase = 'http://localhost:3000/posts';
    }
    getResource = async () => {
       
        const res = await fetch(`${this._apiBase}`);
        if (!res.ok) {
          throw new Error(`Could not fetch ` +
            `, received ${res.status}`);
        }
        
        return await res.json();
    }
    postResource = async (data) => {
        const response = await fetch(this._apiBase, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
    deleteResource = async (data) => {
        const response = await fetch(this._apiBase+`/${data}`, {
            method: "DELETE",
        });
            
    }
    putResource = async (data) => {
        console.log(data.id);
        const response = await fetch(this._apiBase+`/${data.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

}