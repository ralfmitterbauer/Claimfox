import React from 'react'

type Feature = {
  number: string
  title: string
  body: string
}

type Props = {
  features: Feature[]
}

export default function FeatureCards({ features }: Props) {
  return (
    <div className="feature-cards">
      {features.map((feature) => (
        <article key={feature.number} className="feature-card">
          <div className="icon-circle">◎</div>
          <div className="number">{feature.number}</div>
          <h3>{feature.title}</h3>
          <p>{feature.body}</p>
        </article>
      ))}
    </div>
  )
}
