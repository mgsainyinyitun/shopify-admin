
console.log("process:", import.meta.env.API_HOST);

export const API_HOST = import.meta.env.VITE_API_HOST;
console.log("API_HOST is:", API_HOST);

// export function checkIsLogin() {
//     const token = localStorage.getItem('admin_id');
//     const url = `${API_HOST}/auth/check`;
//     axios.post(url, { token })
//         .then(response => {
//             return true;
//         })
//         .catch(error => {
//             return false;
//         });
// }