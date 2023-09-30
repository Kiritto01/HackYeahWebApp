async function postEndpoint(endpoint, postData, toJSON = false) {
    if(toJSON) {postData = JSON.stringify(postData);}
    const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'},
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: postData,
        timeout: 5000
    };
    return await this.fetchEndpoint(endpoint, options);
}

async function getEndpoint(endpoint) {

    const options = {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {'Accept': 'application/json'},
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        timeout: 5000
    };
    return await this.fetchEndpoint(endpoint, options);
}

async function fetchEndpoint(endpoint, fetchOptions) {
    endpoint = this.BASE_ENDPOINT+endpoint;
    try{
        const response = await fetch(endpoint, fetchOptions);

        return {
            body: await response.json(),
            status: response.status
        }
    } catch {
        return {
            body: {message: "unable to connect to server"},
            status: 503
        }
    }
}