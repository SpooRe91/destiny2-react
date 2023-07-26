const API_KEY = process.env.REACT_APP_BUNGIE_API_KEY;
const URL = "https://mb-cook-server.vercel.app/d2";

export const getClanInfo = (signal, controller) => {
  return fetch(`${URL}/clanInfo`, {
    signal: signal,
    headers: {
      "content-type": "application/json",
      "X-API-Key": API_KEY,
    },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => {
      if (controller.signal.aborted) {
        return;
      }
      console.log(error);
    });
};

export const getClanMembers = (signal, controller) => {
  return fetch(`${URL}/getClanMembers`, {
    signal: signal,
    headers: {
      "content-type": "application/json",
      "X-API-Key": API_KEY,
    },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => {
      if (controller.signal.aborted) {
        return;
      }
      console.log(error);
    });
};

export const getUser = (id, signal, controller) => {
  return fetch(`${URL}/getUser/${id}`, {
    signal: signal,
    headers: {
      "content-type": "application/json",
      "X-API-Key": API_KEY,
    },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => {
      if (controller.signal.aborted) {
        return;
      }
      console.log(error);
    });
};

export const getCharacter = (
  membershipType,
  destinyMembershipId,
  signal,
  controller
) => {
  return fetch(`${URL}/getCharacter/${membershipType}/${destinyMembershipId}`, {
    signal: signal,
    headers: {
      "content-type": "application/json",
      "X-API-Key": API_KEY,
    },
    body: {
      membershipType,
      destinyMembershipId,
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      if (controller.signal.aborted) {
        return;
      }
      console.log(error);
    });
};
