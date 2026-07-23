/**
 * Registry of in-flight render work the PDF pipeline must wait for.
 *
 * The renderer (Gotenberg) rasterizes as soon as <html data-pdf-ready="true">
 * appears, so anything that paints late — Mapbox canvases on software WebGL,
 * async component chunks, image decodes — must be tracked here or it shows
 * up blank in the PDF. Producers wrap their pending work with trackPending();
 * PDF.vue awaits whenAllSettled() before flipping the ready flag.
 */

const pending = new Set<Promise<unknown>>()

export function trackPending<T>(promise: Promise<T>): Promise<T> {
  const guarded = promise.then(
    () => undefined,
    () => undefined
  )
  pending.add(guarded)
  guarded.then(() => pending.delete(guarded))
  return promise
}

/**
 * Resolves when every tracked promise (including ones registered while
 * waiting) has settled, or when maxWaitMs elapses — a stuck map must delay
 * the PDF, never hang it.
 */
export async function whenAllSettled(maxWaitMs = 60_000): Promise<void> {
  const deadline = Date.now() + maxWaitMs
  while (pending.size > 0 && Date.now() < deadline) {
    await Promise.race([
      Promise.allSettled([...pending]),
      new Promise((resolve) => setTimeout(resolve, 250)),
    ])
  }
  if (pending.size > 0) {
    console.warn(`pdfReadiness: gave up on ${pending.size} pending item(s) after ${maxWaitMs}ms`)
  }
}
