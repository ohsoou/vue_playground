export default {
    //https://github.com/typicode/json-server
    // return fetch(`https://jsonplaceholder.typicode.com${url}`)
    methods: {
        async $fetch(url, params, method) {
            let _request;
            if(method?.toUpperCase() === 'POST') {
                console.log(params);
                _request = new Request(`http://localhost:3000${url}`,
                    {
                        method: 'POST',
                        headers: {"Content-Type": "application/json" },
                        body: JSON.stringify(params)}
                );
            } else {
                const queryString = params? `${new URLSearchParams(params).toString()}` : '';
                _request = `http://localhost:3000${url}${queryString}`;
            }
            const response = await fetch(_request)
            return response.json();
        }
    }
}