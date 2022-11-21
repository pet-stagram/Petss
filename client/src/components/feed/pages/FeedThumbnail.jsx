import React from 'react'

export default function FeedThumbnail({imageUrl}) {
    console.log(imageUrl);
  return (
    <>
        <img src={imageUrl} alt='' />
    </>
  )
}
