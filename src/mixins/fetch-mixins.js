export async function $fetch(url, params, method) {
    let _request;
    if(method?.toUpperCase() === 'POST') {
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