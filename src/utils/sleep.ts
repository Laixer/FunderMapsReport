
/**
 * An util to fake delays 
 *  Mostly usefull during development
 *  Sometime usefull for UX
 */
export const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

/**
 * Helper function for variableSleep
 *  It doesn't need to be perfectly random
 */
function getRandomInt(min: number, max: number) { 
  min = Math.ceil(min); 
  max = Math.floor(max); 
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

/**
 * Variance is a percentage of either the provided delay or of 1 second, whichever is lower
 */
export const variableSleep = async (delay: number, variance: number = 25) => {
  // Avoid great differences. Only calculate variation based on max 1 second
  const variableAspect = Math.min(1000, delay)
  variance = variance / 100

  const offset = getRandomInt(
    variableAspect - (variableAspect * variance), 
    variableAspect + (variableAspect * variance)
  )

  const variableDelay = Math.floor(delay - variableAspect + offset)
  await sleep( variableDelay )
}