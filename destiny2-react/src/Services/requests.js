const API_KEY = process.env.REACT_APP_BUNGIE_API_KEY;

export const getClanInfo = () => {

    return fetch('https://www.bungie.net/Platform/GroupV2/4131725', {
        headers: {
            'content-type': 'application/json',
            "X-API-Key": API_KEY
        }
    })
        .then(res => res.json())
        .then(data => data)
        .catch(error => {
            alert(error);
        });
};

export const getClanMembers = () => {

    return fetch('https://www.bungie.net/Platform/GroupV2/4131725/Members/', {
        headers: {
            'content-type': 'application/json',
            "X-API-Key": API_KEY
        }
    })
        .then(res => res.json())
        .then(data => data)
        .catch(error => {
            alert(error);
        });
};

export const getUser = (id) => {

    return fetch(`https://www.bungie.net/Platform/User/GetBungieNetUserById/${id}/`, {
        headers: {
            'content-type': 'application/json',
            "X-API-Key": API_KEY
        }
    })
        .then(res => res.json())
        .then(data => data)
        .catch(error => {
            alert(error);
        })
}

export const getCharacter = (membershipType, destinyMembershipId) => {
    return fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${destinyMembershipId}/Character/0/Stats`, {
        headers: {
            'content-type': 'application/json',
            "X-API-Key": API_KEY
        }
    })
        .then(res => res.json())
        .catch(error => {
            alert(error)
        });
}