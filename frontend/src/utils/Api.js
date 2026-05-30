import { API_URL } from "@/lib/utils";

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    return res.json().then((data) => {
      if (res.ok) {
        return data;
      }

      return Promise.reject(new Error(data.message || "Erro na requisicao"));
    });
  }

  login({ email, password }) {
    return fetch(`${this._baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  }

  signup(user) {
    return fetch(`${this._baseUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: API_URL,
});

export default api;
