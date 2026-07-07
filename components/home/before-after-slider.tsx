"use client"

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider"

interface BeforeAfterSliderProps {
  before: string
  after: string
}

export function BeforeAfterSlider({
  before,
  after,
}: BeforeAfterSliderProps) {
  return (
    <ReactCompareSlider
      itemOne={
        <ReactCompareSliderImage
          src={before}
          alt="Before"
        />
      }
      itemTwo={
        <ReactCompareSliderImage
          src={after}
          alt="After"
        />
      }
    />
  )
}