//* show this when the token is invalid
// use inline styles and absolute positioning to ensure that
// the user doesn't accidentally override or hide them
export default function InvalidToken() {
  return (
    <div
      style={{
        backgroundColor: '#881337',
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
          color: 'white',
          fontSize: 24,
          marginLeft: 10,
          marginRight: 10,
          fontFamily: 'sans-serif',
        }}
      >
        <strong>Token Invalid</strong>: You haven't set a token or your token
        expired. Get a new token at{' '}
        <a href='https://slime.chat/token' style={{ color: '#fecdd3' }}>
          slime.chat/token
        </a>
      </span>
    </div>
  )
}
