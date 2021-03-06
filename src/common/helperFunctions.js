export const formatTime = (time = Date.now()) =>{
    const between = (Date.now() - Number(time)) / 1000
    if (between < 3600) {
      return pluralize(~~(between / 60), ' minute')
    } else if (between < 86400) {
      return pluralize(~~(between / 3600), ' hour')
    } else {
      return pluralize(~~(between / 86400), ' day')
    }
  }
  
  function pluralize (time, label) {
    if (time === 1) {
      return time + label
    }
    return time + label + 's'
  }
  

export const getID = (path) => path.substring(path.lastIndexOf('/') + 1, path.length);