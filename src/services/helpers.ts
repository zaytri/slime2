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
