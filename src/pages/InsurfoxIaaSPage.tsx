import React, { useMemo } from 'react'
import BciaDeckPage, { type BciaSlide } from '@/pages/BciaDeckPage'
import Startslide from '@/assets/images/startslide.png'
import '@/styles/insurfox-iaas.css'

export default function InsurfoxIaaSPage() {
  const introSlide = useMemo<BciaSlide>(() => ({
    key: 'insurfox-iaas-intro',
    node: (
      <div className="insurfox-iaas-slide">
        <div className="insurfox-iaas-stage">
          <img
            className="insurfox-iaas-image"
            src={Startslide}
            alt="Insurfox overview"
          />
        </div>
      </div>
    )
  }), [])

  return (
    <BciaDeckPage
      includeKeys={['program-structure-intro', 'markets', 'premium']}
      prependSlides={[introSlide]}
      showPrint={false}
      showPrintButton={false}
      scaleFactor={0.9}
    />
  )
}
