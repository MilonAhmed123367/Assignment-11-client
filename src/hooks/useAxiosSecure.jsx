import axios from "axios";

const axiosSecure = axios.create({
  // নিশ্চিত করুন লাস্টে যেন '/' না থাকে
  baseURL: "https://assignment-11-server-git-main-milon-ahmeds-projects.vercel.app",
  withCredentials: true
});

const useAxiosSecure = () => {
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;