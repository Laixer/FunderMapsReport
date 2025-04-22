export const getItemsStartingWith = function getItemsStartingWith(str: string) {

  // All available keys
  return Object.keys(sessionStorage)
    // Filter on starts with
    .filter(key => key.startsWith(str))
    // And retrieve item, if set
    .reduce(
      (acc: { [key: string]: string }, key: string) => {
        const val = sessionStorage.getItem(key)
        if (val) acc[key] = val
        return acc
      },
      {}
    )
}