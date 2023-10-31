export const auth: Slime2.Auth.Settings = {
  twitch: {
    clientId: 'xrjkdmui65qd33jdx8itfslt61qys8',
    scopes: [
      'chat:read',
      'channel:read:redemptions',
      'moderator:read:followers',
    ],
  },
  google: {
    clientId:
      '932208815805-oq2sevf3ida5idi4k84tlsh03nqc35cs.apps.googleusercontent.com',
    scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
  },
}

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
