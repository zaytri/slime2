import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTokenInfo } from '../Twitch/hooks/useTokenInfo'

//* show this when the app is ready to read messages
// use inline styles and absolute positioning to ensure that
// the user doesn't accidentally override or hide them
export default function Connected() {
  const [hidden, setHidden] = useState(false)
  const { broadcaster } = useTokenInfo()

  useEffect(() => {
    setTimeout(() => {
      setHidden(true)
    }, 2000) // remove from DOM after 2 seconds
  }, [])

  if (hidden) return null

  return (
    <motion.div
      // show for 1 second, then fade out in .3 seconds
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: 1 }}
      style={{
        backgroundColor: 'rgb(6, 95, 70)',
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        borderRadius: 10,
        padding: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          color: 'rgb(236, 252, 203)',
          fontSize: 24,
          marginLeft: 10,
          marginRight: 10,
          fontFamily: 'sans-serif',
        }}
      >
        Connected to <strong>{broadcaster.userName}</strong>'s channel!
      </span>
    </motion.div>
  )
}
