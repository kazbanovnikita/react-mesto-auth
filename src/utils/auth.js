export const baseUrl = "https://auth.nomoreparties.co";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то не так... код ошибки ${res.status}`);
}

export function register({email, password}){
    return fetch(`${baseUrl}/signup`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }).then((res) => checkResponse(res))
}

export function login({ email, password }) {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((res) => checkResponse(res));
};

export function checkToken(token) {
    return fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((res) => checkResponse(res));
};
