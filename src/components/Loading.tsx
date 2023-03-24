import { ScaleLoader } from 'react-spinners'

//* show this while the app is initially loading data
// use inline styles and absolute positioning to ensure that
// the user doesn't accidentally override or hide them
export default function Loading() {
  const loader = (
    <ScaleLoader
      color='rgb(190, 242, 100)'
      loading={true}
      speedMultiplier={0.5}
      height={16}
      width={3}
      radius={10}
    />
  )

  return (
    <div
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
      {loader}
      <span
        style={{
          color: 'rgb(236, 252, 203)',
          fontSize: 24,
          marginLeft: 10,
          marginRight: 10,
          fontFamily: 'sans-serif',
        }}
      >
        Connecting to Chat...
      </span>
      {loader}
    </div>
  )
}
