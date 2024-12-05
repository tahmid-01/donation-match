const fetchData = async (url, options, success, error) => {
 try {
  const response = await fetch(url, options);
  const data = await response.json();
  if (response.ok) {
   if (success) success(data);
  } else {
   if (error) error(data);
  }
 } catch (err) {
  if (error) error(err);
 }
};

export const login = async (email, password, success, error) => {
 await fetchData(
  "/api/v1/user/login",
  {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({ email, password }),
  },
  success,
  error
 );
};

export const signup = async (displayName, email, password, success, error) => {
 await fetchData(
  "/api/v1/user/signup",
  {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({ displayName, email, password }),
  },
  success,
  error
 );
};

export const onAuth = async (success, error) => {
 await fetchData(
  "/api/v1/user/login",
  {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("t$n")}`,
   },
   body: JSON.stringify({ auth: true }),
  },
  success,
  error
 );
};

export const logout = async (success, error) => {
 await fetchData(
  "/api/v1/user/logout",
  {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("t$n")}`,
   },
  },
  () => {
   localStorage.removeItem("t$n");
   success();
  },
  error
 );
};

export const topDonors = async (success, error) => {
 await fetchData(
  "/api/v1/donate/latest",
  {
   method: "GET",
   headers: {
    "Content-Type": "application/json",
   },
  },
  success,
  error
 );
};

export const recentRequests = async (success, error) => {
 await fetchData(
  "/api/v1/request/latest",
  {
   method: "GET",
   headers: {
    "Content-Type": "application/json",
   },
  },
  success,
  error
 );
};

export const createRequest = async (data, success, error) => {
 await fetchData(
  "/api/v1/request/create",
  {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("t$n")}`,
   },
   body: JSON.stringify(data),
  },
  success,
  error
 );
};

export const createDonation = async (data, success, error) => {
 await fetchData(
  "/api/v1/donate/create",
  {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("t$n")}`,
   },
   body: JSON.stringify(data),
  },
  success,
  error
 );
};

export const getDonationsByCategory = async (category, success, error) => {
 await fetchData(
  `/api/v1/donate/category/${category}`,
  {
   method: "GET",
   headers: {
    "Content-Type": "application/json",
   },
  },
  success,
  error
 );
};

export const getRequestsByCategory = async (category, success, error) => {
 await fetchData(
  `/api/v1/request/category/${category}`,
  {
   method: "GET",
   headers: {
    "Content-Type": "application/json",
   },
  },
  success,
  error
 );
};

export const getAllDonations = async (success, error) => {
 await fetchData(
  "/api/v1/donate/all",
  {
   method: "GET",
   headers: {
    "Content-Type": "application/json",
   },
  },
  success,
  error
 );
};

export const getAllRequests = async (success, error) => {
 await fetchData(
  "/api/v1/request/all",
  {
   method: "GET",
   headers: {
    "Content-Type": "application/json",
   },
  },
  success,
  error
 );
};

export const getDonationById = async (id, success, error) => {
 await fetchData(
  `/api/v1/donate/${id}`,
  {
   method: "GET",
   headers: {
    "Content-Type": "application/json",
   },
  },
  success,
  error
 );
};

export const getRequestById = async (id, success, error) => {
 await fetchData(
  `/api/v1/request/${id}`,
  {
   method: "GET",
   headers: {
    "Content-Type": "application/json",
   },
  },
  success,
  error
 );
};
