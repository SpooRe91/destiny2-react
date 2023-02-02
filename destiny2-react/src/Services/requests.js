const API_KEY = process.env.REACT_APP_BUNGIE_API_KEY;

export const getClanInfo = (signal, controller) => {

    return fetch('https://www.bungie.net/Platform/GroupV2/4131725', {
        signal: signal,
        headers: {
            'content-type': 'application/json',
            "X-API-Key": API_KEY
        }
    })
        .then(res => res.json())
        .then(data => data)
        .catch(error => {
            if (controller.signal.aborted) { return }
            console.log(error);
        });
};

export const getClanMembers = (signal, controller) => {

    return fetch('https://www.bungie.net/Platform/GroupV2/4131725/Members/', {
        signal: signal,
        headers: {
            'content-type': 'application/json',
            "X-API-Key": API_KEY
        }
    })
        .then(res => res.json())
        .then(data => data)
        .catch(error => {
            if (controller.signal.aborted) { return }
            console.log(error);
        });
};

export const getUser = (id, signal, controller) => {

    return fetch(`https://www.bungie.net/Platform/User/GetBungieNetUserById/${id}/`, {
        signal: signal,
        headers: {
            'content-type': 'application/json',
            "X-API-Key": API_KEY
        }
    })
        .then(res => res.json())
        .then(data => data)
        .catch(error => {
            if (controller.signal.aborted) { return }
            console.log(error);
        })
}

export const getCharacter = (membershipType, destinyMembershipId, signal, controller) => {
    return fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${destinyMembershipId}/Character/0/Stats`, {
        signal: signal,
        headers: {
            'content-type': 'application/json',
            "X-API-Key": API_KEY
        }
    })
        .then(res => res.json())
        .catch(error => {
            if (controller.signal.aborted) { return }
            console.log(error);
        });
}