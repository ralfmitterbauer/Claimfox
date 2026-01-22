import React from 'react'

type Props = {
  title: string
  body: string
  imageUrl: string
  reverse?: boolean
}

export default function SectionSplit({ title, body, imageUrl, reverse }: Props) {
  return (
    <section className="section-split" style={{ direction: reverse ? 'rtl' : 'ltr' }}>
      <div style={{ direction: 'ltr' }}>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <div className="visual-card">
        <img src={imageUrl} alt="" />
      </div>
    </section>
  )
}
