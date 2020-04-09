export const getItem = (name) => {
  return JSON.parse(localStorage.getItem(name))
}
export const setItem = (name, data) => {
  return localStorage.setItem(name, data)
}
export const removeItem = (name) => {
  return localStorage.removeItem(name)
}
