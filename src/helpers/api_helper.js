import axios from "axios";
// import accessToken from "./jwt-token-access/accessToken";

//pass new generated access token here
// const token = accessToken;

//apply base url for axios
const API_URL = "https://msmesuraksha-backend.azurewebsites.net";


const axiosApi = axios.create({
  baseURL: API_URL,
});

const axiosPrivate = axios.create({
  baseURL: API_URL,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('tokenemployeeRegister');
    if (token) {
      config.headers['x-access-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {

    const originalRequest = error.config;
    if (error.response.status === 401) {
      if (!originalRequest._retry) {
        // 
        originalRequest._retry = true;
        try {
          const refreshToken = sessionStorage.getItem('refreshToken');
          const response = await axiosApi.post('/api/admin/refreshToken', {
            refreshToken,
          });
          const token = response.data.response.token;
          sessionStorage.setItem('tokenemployeeRegister', token);
          // Retry the original request with the new token
          originalRequest.headers['x-access-token'] = token;
          return axiosPrivate(originalRequest);
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          window.location.href = "/login"
          sessionStorage.clear()
        }
      } else {
        window.location.href = "/login"
        sessionStorage.clear()
      }
    }
    return Promise.reject(error);
  }
);



export async function get(url, config = {}) {
  // 
  const token = sessionStorage.getItem("tokenemployeeRegister");
  // 
  const headers = {
    ...config.headers,
    'x-access-token': token,
  };

  return await axiosPrivate
    .get(url, { ...config, headers })
    .then((response) => response)
    .catch((error) => {
      if (error.response) {
        console.log("Server responded with an error:", error.response.status);
      } else if (error.request) {
        console.log("No response received from the server:", error.request);
      }
    });
}

export async function postForLOgs(url, data, config = {}) {

  const token = sessionStorage.getItem("tokenemployeeRegister");
  const headers = {
    ...config.headers,
    'x-access-token': token,
  };
  return axiosPrivate
    .post(url, data, { ...config, headers })
    .then((response) => response).catch((error) => {
      if (error.response) {
        console.log("Server responded with an error:", error.response.status);
      } else if (error.request) {
        console.log("No response received from the server:", error.request);
      }
    });

}
export async function post(url, data, config = {}) {
  // 

  if (url != '/api/admin/login' && url != '/api/admin/change-new-password') {
    const token = sessionStorage.getItem("tokenemployeeRegister");
    const headers = {
      ...config.headers,
      'x-access-token': token,
    };
    return axiosPrivate
      .post(url, { ...data }, { ...config, headers })
      .then((response) => response).catch((error) => {
        if (error.response) {
          console.log("Server responded with an error:", error.response.status);
        } else if (error.request) {
          console.log("No response received from the server:", error.request);
        }
      });

  } else {
    return axiosApi
      .post(url, { ...data }, { ...config })
      .then((response) => response).catch((error) => {
        if (error.response) {
          console.log("Server responded with an error:", error);
          if (error.response.status == 400) {
            // window.alert()
          }
        } else if (error.request) {
          console.log("No response received from the server:", error.request);
        }
      });
  }

}

export async function forgetPasswordthroughToken(url, data, config = {}) {


  // console.log("UJUJU", JSON.parse(sessionStorage.getItem("authUser")).token)
  const token = JSON.parse(sessionStorage.getItem("USERDETAILS")) != null ? JSON.parse(sessionStorage.getItem("USERDETAILS")).token : '';
  const userID = JSON.parse(sessionStorage.getItem("USERDETAILS")) != null ? JSON.parse(sessionStorage.getItem("USERDETAILS")).userID : '';
  const urrll = `${url}/${userID}/${token}`



  const headers = {
    ...config.headers,
    'x-access-token': token != null ? token : '',
  };
  return axiosPrivate
    .post(urrll, { ...data }, { ...config })
    .then((response) => response)
    .catch((error) => {
      // console.log("Server responded with an error:", error);

      error => error
      if (error.response) {
        window.alert(error.response.data.message)
      } else if (error.request) {
        console.log("No response received from the server:", error.request);
      }
    });
}
export async function getWithdata(url, data, config = {}) {
  // 

  const token = sessionStorage.getItem("tokenemployeeRegister");
  const headers = {
    ...config.headers,
    'x-access-token': token,
  };
  return axiosPrivate
    .get(url, { ...data }, { ...config, headers })
    .then((response) => response).catch((error) => {
      if (error.response) {
        console.log("Server responded with an error:", error.response.status);
      } else if (error.request) {
        console.log("No response received from the server:", error.request);
      }
    });
}



export async function loginPostMethod(url, data, config = {}) {


  return axiosApi
    .post(url, { ...data }, { ...config })
    .then((response) => response).catch((error) => {
      if (error.response) {

        // if(error.response.status == 400 ){
        window.alert(error.response.data.message)
        // }
        console.log("Server responded with an error:", error.response.status);
      } else if (error.request) {
        console.log("No response received from the server:", error.request);
      }
    });


}



export async function put(url, data, config = {}) {
  return axiosPrivate

    .put(url, { ...data }, { ...config })
    .then((response) => {

      response.data
    })
    .catch((error) => {
      if (error.response) {
        console.log("Server responded with an error:", error.response.status);
      } else if (error.request) {
        console.log("No response received from the server:", error.request);
      }
    });
}

export async function del(url, config = {}) {
  return await axiosPrivate
    .delete(url, { ...config })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        console.log("Server responded with an error:", error.response.status);
      } else if (error.request) {
        console.log("No response received from the server:", error.request);
      }
    });
}

export async function addEmployeeAPImethod(url, data, config = {}) {

  const token = sessionStorage.getItem("tokenemployeeRegister")
  const headers = {
    ...config.headers,
    'x-access-token': token != null ? token : '',
  };
  return axiosPrivate
    .post(url, { ...data }, { ...config, headers })
    .then((response) => response)
    .catch((error) => {
      if (error.response) {
        console.log("Server responded with an error:", error.response.status);
      } else if (error.request) {
        console.log("No response received from the server:", error.request);
      }
    });
}

export async function addEmployeeAPImethodTwo(url, data, config = {}) {

  const token = sessionStorage.getItem("tokenemployeeRegister")
  const headers = {
    ...config.headers,
    'x-access-token': token != null ? token : '',
  };
  return axiosPrivate
    .post(url, [...data], { ...config, headers })
    .then((response) => response)
    .catch((error) => {
      if (error.response) {
        console.log("Server responded with an error:", error.response.status);
      } else if (error.request) {
        console.log("No response received from the server:", error.request);
      }
    });
}