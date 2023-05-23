class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то не так... код ошибки ${res.status}`);
  }

  getInitialCards() {
    const url = this._baseUrl + "/cards";
    return fetch(url, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getUserInfo() {
    const url = this._baseUrl + `/users/me`;
    return fetch(url, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getDataFromServer() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  updateUserInfo(body) {
    const url = this._baseUrl + `/users/me`;
    return fetch(url, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(body),
    }).then(this._checkResponse);
  }

  setUserAvatar(body) {
    const url = this._baseUrl + `/users/me/avatar`;
    return fetch(url, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(body),
    }).then(this._checkResponse);
  }

  addNewCard(data) {
    const url = this._baseUrl + "/cards";
    return fetch(url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    const url = this._baseUrl + `/cards/likes/${cardId}`;
    if (!isLiked) {
      return fetch(url, {
        method: "PUT",
        headers: this._headers,
      }).then(this._checkResponse);
    } else {
      return fetch(url, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._checkResponse);
    }
  }

  deleteCard(cardId) {
    const url = this._baseUrl + `/cards/${cardId}`;
    return fetch(url, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-62",
  headers: {
    "Content-Type": "application/json",
    Authorization: "b31c2277-db08-430d-b0af-66935b76357e",
  },
});
