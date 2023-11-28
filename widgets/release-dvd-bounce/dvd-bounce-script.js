let currentVideoUrl = null
let currentMediaType = null

// the slime2:ready event is fired once
// indicates that the slime2 global variable is ready to use
addEventListener('slime2:ready', () => {
  run()
})

// this event is fired every time a widget setting is changed
// use this to update the widget live, rather than the user having to refresh
addEventListener('slime2:widget-data-update', () => {
  // slime2.widget.getData() will always fetch the latest data
  const data = slime2.widget.getData()

  const { opacity, mediaType, image, video, text } = data

  $('#dvd')
    .removeClass()
    .addClass(`media-${mediaType}`)
    .css({
      '--imageScale': image.scale / 100,
      '--videoScale': video.scale / 100,
      '--opacity': opacity / 100,
      '--image': `url('${image.url}')`,
    })

  const videoSource = $('#video source')
  const videoElement = $('#video')[0]
  videoElement.volume = video.volume / 100

  if (mediaType === 'video') {
    if (currentVideoUrl !== video.url || currentMediaType !== mediaType) {
      if (currentVideoUrl) videoElement.pause()
      videoSource.attr('src', video.url)
      currentVideoUrl = video.url
      videoElement.load()
    }
  } else {
    videoElement.pause()
    videoSource.removeAttr('src')
    videoElement.load()
  }

  $('#text').css({
    textAlign: text.textAlign,
    fontFamily: text.font.name,
    fontSize: text.font.size,
    fontWeight: text.font.weight,
    color: text.color,
    backgroundColor: text.backgroundColor,
    paddingTop: text.padding.top,
    paddingBottom: text.padding.bottom,
    paddingLeft: text.padding.left,
    paddingRight: text.padding.right,
    borderRadius: text.border.radius,
    borderWidth: text.border.width,
    borderColor: text.border.color,
    borderStyle: text.border.style,
  })

  $('#text').text(text.text)

  currentMediaType = mediaType
})

/***********
 * Physics *
 ***********/

let previousTimeStamp = null
const position = { x: -1, y: -1 }
const velocity = { x: 0, y: 0 }

function run() {
  window.requestAnimationFrame(update)
}

function update(currentTimestamp) {
  if (previousTimeStamp) move(currentTimestamp - previousTimeStamp)
  previousTimeStamp = currentTimestamp
  window.requestAnimationFrame(update)
}

function move(timeElapsed) {
  const dvdElement = $('#dvd')
  const { speed, mediaType, video, image } = slime2.widget.getData()
  const elementWidth = dvdElement.width()
  const elementHeight = dvdElement.height()

  let scaleMultiplier = 1
  if (mediaType === 'video') scaleMultiplier = video.scale / 100
  if (mediaType === 'image') scaleMultiplier = image.scale / 100

  // collision box for the text/image/video
  const collisionWidth = elementWidth * scaleMultiplier
  const collisionHeight = elementHeight * scaleMultiplier

  if (!speed || !collisionWidth || !collisionHeight) return

  const pixelsMoved = (speed * timeElapsed) / 1000
  const boundingWidth = window.innerWidth
  const boundingHeight = window.innerHeight

  // collide left
  if (position.x < 0) {
    position.x = 0
    velocity.x = 1
  }

  // collide right
  if (position.x > boundingWidth - collisionWidth) {
    position.x = boundingWidth - collisionWidth
    velocity.x = -1
  }

  // collide top
  if (position.y < 0) {
    position.y = 0
    velocity.y = 1
  }

  // collide bottom
  if (position.y > boundingHeight - collisionHeight) {
    position.y = boundingHeight - collisionHeight
    velocity.y = -1
  }

  position.x += velocity.x * pixelsMoved
  position.y += velocity.y * pixelsMoved

  dvdElement.css({
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
  })
}
