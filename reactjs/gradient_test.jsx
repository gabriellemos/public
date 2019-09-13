import React, { useState, useEffect } from 'react'

const randomItens = []
for (let i = 0; i < 48; i++) {
  randomItens.push({
    fraction: Math.random()
  })
}

const GradientTest = ({
  startColor = [235, 237, 240],
  finishColor = [25, 97, 39],
  granularity = 5,
  itens = randomItens,
  dates = ['11/09/2019', '12/09/2019']
}) => {
  const [gradient, setGradient] = useState([])

  function interpolateColor(color1, color2, factor) {
    if (arguments.length < 3) {
      factor = 0.5
    }
    var result = color1.slice()
    for (var i = 0; i < 3; i++) {
      result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]))
    }
    return result
  }

  function interpolateColors(color1, color2, steps) {
    var stepFactor = 1 / (steps - 1),
      interpolatedColorArray = []

    for (var i = 0; i < steps; i++) {
      interpolatedColorArray.push(
        interpolateColor(color1, color2, stepFactor * i)
      )
    }

    return interpolatedColorArray
  }

  useEffect(() => {
    setGradient(interpolateColors(startColor, finishColor, granularity))
  }, [startColor, finishColor, granularity])

  function getGradientColor(value) {
    if (gradient.length === 0) {
      return 'rgb(0,0,0)'
    } else {
      const bgColor = gradient[Math.floor(value * gradient.length)]
      return `rgb(${bgColor.join()})`
    }
  }

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: '15px', height: '15px' }} />
          {dates.map(date => (
            <p style={{ fontSize: '0.65em', margin: '0px' }}>{date}</p>
          ))}
        </div>
        <div>
          <div style={{ display: 'flex' }}>
            {[...Array(24).keys()].map(hour => (
              <p
                style={{
                  width: '15px',
                  fontSize: '0.65em',
                  marginBottom: '0px',
                  textAlign: 'center'
                }}
              >
                {hour}
              </p>
            ))}
          </div>
          <div style={{ display: 'flex', width: '360px', flexWrap: 'wrap' }}>
            {itens.map(({ fraction }, index) => (
              <div
                key={index}
                style={{
                  width: '15px',
                  height: '15px',
                  backgroundColor: getGradientColor(fraction)
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default GradientTest
