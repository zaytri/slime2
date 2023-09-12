//* show this when the token is invalid
// use inline styles and absolute positioning to ensure that
// the user doesn't accidentally override or hide them
export default function InvalidToken() {
  return (
    <div
      className='bg-rose-900 absolute top-3 inset-x-3 rounded-xl p-3 flex items-center justify-center'
    >
      <span className='text-white text-md mx-3 font-radiocanada'>
        <strong className='font-semibold'>Token Invalid</strong>: You haven't set a token or your token
        expired. Get a new token at{' '}
        [<a
          href='https://slime2.stream/token'
          target='_blank'
          rel='noreferrer'
          className='text-rose-200 underline'
        >
          slime2.stream/token
        </a>]
      </span>
    </div>
  )
}
