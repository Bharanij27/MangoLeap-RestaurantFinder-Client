export const setUser = (name) => localStorage.setItem('usertype', name);

export const getUser = () => localStorage.getItem('usertype');