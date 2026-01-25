import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { Slide1Markets, Slide2Premium, Slide3Program, Slide4Governance } from '@/components/slides/BusinessPlanSlides'
import '@/styles/slides-shared.css'
import '@/styles/print-deck.css'

export default function BusinessPlanPrintPage() {
  const [searchParams] = useSearchParams()
  const lang = searchParams.get('lang') === 'en' ? 'en' : 'de'

  return (
    <main className="printDeck" aria-label="Business plan print deck">
      <section className="printSlide">
        <div className="printCanvas">
          <div className="enterprise-page">
            <Slide1Markets lang={lang} />
          </div>
        </div>
      </section>
      <section className="printSlide">
        <div className="printCanvas">
          <div className="enterprise-page">
            <Slide2Premium lang={lang} />
          </div>
        </div>
      </section>
      <section className="printSlide">
        <div className="printCanvas">
          <div className="enterprise-page">
            <Slide3Program />
          </div>
        </div>
      </section>
      <section className="printSlide">
        <div className="printCanvas">
          <div className="enterprise-page">
            <Slide4Governance />
          </div>
        </div>
      </section>
    </main>
  )
}
