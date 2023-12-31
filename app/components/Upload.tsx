import Image from './Image'
import { useState } from 'react'
import UploadIcon from './Upload-Icon'
import { UploadProps } from '@/lib/types'
import { IKContext, IKUpload } from 'imagekitio-react'

export default function ({ selector, className }: UploadProps) {
  const attribute = '_' + selector
  const [uploadedURL, setUploadedURL] = useState()
  const [uploadedImage, setUploadedImage] = useState()
  const [uploadedImageH, setUploadedImageH] = useState()
  const [uploadedImageW, setUploadedImageW] = useState()
  const publicKey = 'public_yV9dop1iOZyFb2FnBjsdQpB+rXQ='
  const openLoader = () => {
    const tmp = document.querySelector('#' + selector) as HTMLInputElement
    if (tmp) tmp.click()
  }
  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint="https://ik.imagekit.io/vjeqenuhn"
      authenticator={async () => {
        return await (await fetch('/imagekit')).json()
      }}
    >
      <input value={uploadedURL} className="hidden" id={attribute} name={attribute} />
      {uploadedImageH && <input value={uploadedImageH} className="hidden" id={attribute + '_h'} name={attribute + '_h'} />}
      {uploadedImageW && <input value={uploadedImageW} className="hidden" id={attribute + '_w'} name={attribute + '_w'} />}
      {uploadedImage && (
        <div onClick={openLoader} className={[className, 'relative'].filter((i) => i).join(' ')}>
          <svg
            width="24"
            height="24"
            viewBox="0 -960 960 960"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bg-white shadow border rounded-full top-0 right-0 cursor-pointer z-20"
          >
            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
          </svg>
          {uploadedImageW && uploadedImageH && <Image width={uploadedImageW} height={uploadedImageH} className={[className].filter((i) => i).join(' ')} url={uploadedImage} />}
        </div>
      )}
      <div
        onClick={openLoader}
        className={[className, uploadedImage && 'hidden', 'cursor-pointer border rounded flex flex-col items-center justify-center py-12'].filter((i) => i).join(' ')}
      >
        <UploadIcon />
        <span>Upload Image</span>
        <IKUpload
          id={selector}
          className="hidden"
          useUniqueFileName={true}
          onClick={() => {
            setUploadedURL(undefined)
            setUploadedImage(undefined)
            setUploadedImageW(undefined)
            setUploadedImageH(undefined)
          }}
          onSuccess={(res) => {
            const { url, height, width } = res
            setUploadedURL(url)
            setUploadedImage(url)
            setUploadedImageW(width)
            setUploadedImageH(height)
          }}
        />
      </div>
    </IKContext>
  )
}
