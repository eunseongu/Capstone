const setToken = (config) => {
    const token = localStorage.getItem('token');
  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  
    return config;
  };
  
  export { setToken };
  