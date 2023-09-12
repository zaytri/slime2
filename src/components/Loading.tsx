import { ScaleLoader } from 'react-spinners'

type LoadingProps = {
  message: string
}

//* show this while the app is initially loading data
// use inline styles and absolute positioning to ensure that
// the user doesn't accidentally override or hide them
export default function Loading({ message }: LoadingProps) {
  const loader = (
    <ScaleLoader
      color='#ecfccb'
      loading={true}
      speedMultiplier={0.5}
      height={16}
      width={3}
      radius={10}
    />
  )

  return (
    <div
      className='bg-emerald-800 absolute top-3 inset-x-3 rounded-xl p-3 flex items-center justify-center'
    >
      {loader}
      <span className='text-lime-100 text-md mx-3 font-grandstander'>
        {message}
      </span>
      {loader}
    </div>
  )
}
