// const baseUrl = "http://localhost:8000/"; //local
const baseUrl = "https://jba-nodejs.herokuapp.com/" //heroku




export function url() {
  return baseUrl;
}

export function authPost(loginData, url) {
    console.log("Inside Perform Login", {
      loginData,
    });
    return fetch(baseUrl + url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...loginData,
      }),
    });
  }

  export function adminGet(url) {
    let token = localStorage.getItem("token");
    return fetch(baseUrl + url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-access-token": token,
      },
    });
  }

  export function adminPost(body,url) {
    let token = localStorage.getItem("token");
    return fetch(baseUrl + url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({
        ...body,
      }),
    });
  }

  // export function adminPostFormData(body,url) {
  //   let token = localStorage.getItem("token");
  //   return fetch(baseUrl + url, {
  //     method: "POST",
 
  //     data: body,
  //   });
  // }

  export function postFormData(url, formData) {
    let token = localStorage.getItem("token");
    return fetch(baseUrl + url, {
      method: "POST",
      redirect: "follow",
      headers: {
        Accept: "application/json; charset=utf-8",
        "x-access-token": token,
      },
      body: formData,
    });
  }