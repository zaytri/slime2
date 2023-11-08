export const infiniteCache = {
  gcTime: Infinity,
  staleTime: Infinity,
  retry: 1,
  retryOnMount: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
}

export function generateInnerHTML(
  clientFragment: Slime2.Client.Fragment,
): string {
  const fragment =
    clientFragment instanceof DocumentFragment
      ? clientFragment // DocumentFragment
      : clientFragment[0] // JQuery<DocumentFragment>

  const clone = fragment.cloneNode(true)

  // create a temporary element to get the innerHTML of the fragment,
  // because it's not possible to directly get that from a DocumentFragment
  const tempRoot = document.createElement('div')
  tempRoot.appendChild(clone)
  const innerHTML = tempRoot.innerHTML
  tempRoot.remove()
  return innerHTML
}

export function cloneTemplate(id: string): DocumentFragment {
  const element = document.getElementById(id) as HTMLTemplateElement
  if (!element) throw Error(`Template with id "${id}" not found.`)
  if (element.tagName !== 'TEMPLATE')
    throw Error(`Element with id "${id}" is not a template.`)

  return element.content.cloneNode(true) as DocumentFragment
}

export async function loadScript(id: string, src: string) {
  return new Promise<boolean>(resolve => {
    // if it already exists, remove it
    document.getElementById(id)?.remove()

    const [head] = document.getElementsByTagName('head')

    const newScript = document.createElement('script')
    newScript.id = `slime2script.${id}`
    newScript.src = `${src}?loadedAt=${Date.now()}`
    newScript.async = true
    head.appendChild(newScript)
    newScript.onload = async () => {
      resolve(true)
    }
    newScript.onerror = async () => {
      resolve(false)
    }
  })
}
