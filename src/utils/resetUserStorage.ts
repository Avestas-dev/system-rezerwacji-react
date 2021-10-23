const resetUserStorage = () => {
  localStorage.setItem('token', '')
  localStorage.setItem('role', '')
}
export default resetUserStorage
