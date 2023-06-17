class Api {
  constructor(config) {
      this._baseUrl = config.baseUrl;
      this._headers = config.headers;
  }
  _handleResponse(res) {
      if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
  }
  getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
          headers: this._headers
      }).then(this._handleResponse).catch(err => {
          return Promise.reject(err);
      });
  }
  getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
          headers: this._headers
      }).then(this._handleResponse).catch(err => {
          return Promise.reject(err);
      });
  }
  setUserAvatar(data) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
              avatar: data
          })
      }).then(this._handleResponse).catch(err => {
          return Promise.reject(err);
      });
  }
  setUserInfo(data) {
      return fetch(`${this._baseUrl}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
              name: data.name,
              about: data.about
          })
      }).then(this._handleResponse).catch(err => {
          return Promise.reject(err);
      });
  }
  createCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify(data)
      }).then(this._handleResponse).catch(err => {
          return Promise.reject(err);
      });
  }
  deleteCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
          method: 'DELETE',
          headers: this._headers,
      }).then(this._handleResponse).catch(err => {
          return Promise.reject(err);
      });
  }
  likeCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
          method: 'PUT',
          headers: this._headers,
      }).then(this._handleResponse).catch(err => {
          return Promise.reject(err);
      });
  }
  dislikeCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
          method: 'DELETE',
          headers: this._headers,
      }).then(this._handleResponse).catch(err => {
          return Promise.reject(err);
      });
  }
}
export default Api;