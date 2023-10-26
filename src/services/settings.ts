const settings: Slime2.Settings = {
  twitch: {
    key: import.meta.env.VITE_TWITCH_KEY,
    clientId: 'xrjkdmui65qd33jdx8itfslt61qys8',
    scopes: [
      'chat:read',
      'channel:read:redemptions',
      'moderator:read:followers',
    ],
  },
  youtube: {
    key: import.meta.env.VITE_GOOGLE_KEY,
    clientId:
      '932208815805-oq2sevf3ida5idi4k84tlsh03nqc35cs.apps.googleusercontent.com',
    scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
  },
}

if (typeof slime2key_twitch !== 'undefined') {
  settings.twitch.key = slime2key_twitch
}

if (typeof slime2key_google !== 'undefined') {
  settings.youtube.key = slime2key_google
}

export default settings

export const infiniteCache = {
  gcTime: Infinity,
  staleTime: Infinity,
  retry: 1,
  retryOnMount: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
}
