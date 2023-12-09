import ImageKit from 'imagekit'

export const urlEndpoint = 'https://ik.imagekit.io/vjeqenuhn'

export async function loader() {
  if (!process.env.IMAGEKIT_PUBLIC_KEY || !process.env.IMAGEKIT_PRIVATE_KEY) {
    return new Response(null, { status: 500 })
  }
  var imagekit = new ImageKit({
    urlEndpoint,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  })
  return new Response(JSON.stringify(imagekit.getAuthenticationParameters()), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
