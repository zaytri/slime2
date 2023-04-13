import { useTokenInfoLoader } from './hooks/useTokenInfo'
import Loading from '../components/Loading'
import InvalidToken from '../components/InvalidToken'
import Twitch from './Twitch'

export default function TokenCheck() {
  const { loading, tokenInfo } = useTokenInfoLoader()

  if (loading) {
    return <Loading message='Checking Token...' />
  }

  if (!tokenInfo) {
    return <InvalidToken />
  }

  return <Twitch />
}
