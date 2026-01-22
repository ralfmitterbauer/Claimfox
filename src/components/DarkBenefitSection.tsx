import React from 'react'

type Benefit = {
  title: string
  body: string
}

type Props = {
  title: string
  benefits: Benefit[]
  imageUrl: string
}

export default function DarkBenefitSection({ title, benefits, imageUrl }: Props) {
  return (
    <section className="dark-section">
      <div>
        <h2>{title}</h2>
        <p className="disclaimer">
          Indicative annual insurance exposure (model-based). Exposure is not premium, not revenue.
        </p>
      </div>
      <div className="dark-grid">
        {benefits.map((benefit) => (
          <article key={benefit.title} className="dark-tile">
            <h3>{benefit.title}</h3>
            <p>{benefit.body}</p>
          </article>
        ))}
      </div>
      <div className="dark-visual">
        <img src={imageUrl} alt="" />
      </div>
    </section>
  )
}
