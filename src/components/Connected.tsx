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
      className='bg-emerald-800 absolute top-3 inset-x-3 rounded-xl p-3 flex items-center justify-center'
    >
      <span className='text-lime-100 text-md mx-3 font-grandstander'>
        Connected to [<strong className='text-lime-200'>{broadcaster.userName}</strong>]
      </span>
    </motion.div>
  )
}
