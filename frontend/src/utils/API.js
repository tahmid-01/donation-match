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
