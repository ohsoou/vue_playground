export default {
    //https://github.com/typicode/json-server
    methods: {
        $fetch(url, params) {
            const queryString = params? `?${new URLSearchParams(params).toString()}` : '';
            // return fetch(`https://jsonplaceholder.typicode.com${url}`)
            return fetch(`http://localhost:3000${url}${queryString}`)
                .then(response => response.json())
        }
    }
}