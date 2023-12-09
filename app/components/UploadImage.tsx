import { useState } from 'react'
import BlurUpImage from './BlurUpImage'
import { IKContext, IKUpload } from 'imagekitio-react'

export default function () {
  const [uploadedURL, setUploadedURL] = useState()
  const [uploadedImage, setUploadedImage] = useState()
  const urlEndpoint = 'https://ik.imagekit.io/vjeqenuhn'
  const publicKey = 'public_yV9dop1iOZyFb2FnBjsdQpB+rXQ='
  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={async () => {
        return await (await fetch('/imagekit')).json()
      }}
    >
      <input value={uploadedURL} className="hidden" id="imageURL" name="imageURL" />
      {uploadedImage && (
        <div className="mt-8 border">
          <BlurUpImage loading="lazy" alt="Rishi" url={uploadedImage} />
        </div>
      )}
      <div
        onClick={() => {
          const tmp = document.querySelector('#upload-image') as HTMLInputElement
          if (tmp) tmp.click()
        }}
        className="mt-8 cursor-pointer border rounded flex flex-col items-center justify-center py-12"
      >
        <svg className="fill-gray-400" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
          <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z" />
        </svg>
        <span>Upload Image</span>
        <IKUpload
          id="upload-image"
          className="hidden"
          useUniqueFileName={true}
          onClick={() => {
            setUploadedURL(undefined)
            setUploadedImage(undefined)
          }}
          onSuccess={(res) => {
            const { url } = res
            setUploadedURL(url)
            setUploadedImage(url)
          }}
        />
      </div>
    </IKContext>
  )
}
