/**
 * Registry of in-flight render work the PDF pipeline must wait for.
 *
 * The renderer (Gotenberg) rasterizes as soon as <html data-pdf-ready="true">
 * appears, so anything that paints late — Mapbox canvases on software WebGL,
 * async component chunks, image decodes — must be tracked here or it shows
 * up blank in the PDF. Producers wrap their pending work with trackPending();
 * PDF.vue awaits whenAllSettled() before flipping the ready flag.
 */

// Each tracked promise, with what to call when the wait for it runs out.
const pending = new Map<Promise<unknown>, (() => void) | undefined>()

export function trackPending<T>(promise: Promise<T>, onTimeLimit?: () => void): Promise<T> {
  const guarded = promise.then(
    () => undefined,
    () => undefined
  )
  pending.set(guarded, onTimeLimit)
  guarded.then(() => pending.delete(guarded))
  return promise
}

/**
 * Resolves when every tracked promise (including ones registered while
 * waiting) has settled, or when maxWaitMs elapses — a stuck map must delay
 * the PDF, never hang it. Then each item still pending gets its onTimeLimit
 * call (a map takes its snapshot as it is) and a moment to settle, so the
 * renderer prints that instead of a live canvas.
 */
export async function whenAllSettled(maxWaitMs = 60_000): Promise<void> {
  const deadline = Date.now() + maxWaitMs
  while (pending.size > 0 && Date.now() < deadline) {
    await Promise.race([
      Promise.allSettled([...pending.keys()]),
      new Promise((resolve) => setTimeout(resolve, 250)),
    ])
  }
  if (pending.size > 0) {
    console.warn(`pdfReadiness: gave up on ${pending.size} pending item(s) after ${maxWaitMs}ms`)
    for (const onTimeLimit of pending.values()) onTimeLimit?.()
    await Promise.race([
      Promise.allSettled([...pending.keys()]),
      new Promise((resolve) => setTimeout(resolve, 1000)),
    ])
  }
}
