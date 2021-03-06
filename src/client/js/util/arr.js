export default {
  inArray: (value, array) => {
    if (!Array.isArray(array)) return false
    if (array.length === 0) return false
    return array.includes(value)
  },

  isEqualArray: function(array1, array2) {
    var i = array1.length
    if (i != array2.length) return false

    while (i--) {
      if (array1[i] !== array2[i]) return false
    }
    return true
  },

  compareValues: (key, order='asc') => {
    return function(a, b) {
      if (Object.hasOwnProperty.call(a, key) && Object.hasOwnProperty.call(b, key)) {
        const varA = (typeof a[key] === 'string') ?
          a[key].toUpperCase() : a[key]
        const varB = (typeof b[key] === 'string') ?
          b[key].toUpperCase() : b[key]

        let comparison = 0;
        if (varA > varB) {
          comparison = 1
        } else if (varA < varB) {
          comparison = -1
        }
        return (
          (order == 'desc') ? (comparison * -1) : comparison
        )
      } else {
        if (!Object.hasOwnProperty.call(a, key)) return -1
        if (!Object.hasOwnProperty.call(b, key)) return -1
      }
      return 0
    }
  },
}
