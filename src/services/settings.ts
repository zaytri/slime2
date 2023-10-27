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
