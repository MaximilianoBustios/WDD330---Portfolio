window.addEventListener('load', () => {
  let lon
  let lat
  let temperaturaValor = document.getElementById('temperatura-valor')
  let temperaturaDescripcion = document.getElementById('temperatura-descripcion')
  let ubicacion = document.getElementById('ubicacion')
  let iconoAnimado = document.getElementById('icono-animado')
  let vientoVelocidad = document.getElementById('viento-velocidad')

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(posicion => {
      lon = posicion.coords.longitude
      lat = posicion.coords.latitude
      //ubicación actual    
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8366f17148b40dcd5f070a1a1ec28b9d`

      //ubicación por ciudad
      //const url = `https://api.openweathermap.org/data/2.5/weather?q=Madrid&lang=es&units=metric&appid=8366f17148b40dcd5f070a1a1ec28b9d`

      fetch(url)
        .then(response => {
          return response.json()
        })
        .then(data => {

          let temp = Math.round(data.main.temp)
          temperaturaValor.textContent = `${temp} ° C`
          let desc = data.weather[0].description
          temperaturaDescripcion.textContent = desc.toUpperCase()
          ubicacion.textContent = data.name
          vientoVelocidad.textContent = `${data.wind.speed} m/s`

          console.log(data.weather[0].main)
          switch (data.weather[0].main) {
            case 'Thunderstorm':
              iconoAnimado.src = 'animaciones/thunder.svg'
              console.log('TORMENTA');
              break;
            case 'Drizzle':
              iconoAnimado.src = 'animaciones/rainy-2.svg'
              console.log('LLOVIZNA');
              break;
            case 'Rain':
              iconoAnimado.src = 'animaciones/rainy-7.svg'
              console.log('LLUVIA');
              break;
            case 'Snow':
              iconoAnimado.src = 'animaciones/snowy-6.svg'
              console.log('NIEVE');
              break;
            case 'Clear':
              iconoAnimado.src = 'animaciones/day.svg'
              console.log('LIMPIO');
              break;
            case 'Atmosphere':
              iconoAnimado.src = 'animaciones/weather.svg'
              console.log('ATMOSFERA');
              break;
            case 'Clouds':
              iconoAnimado.src = 'animaciones/cloudy-day-1.svg'
              console.log('NUBES');
              break;
            default:
              iconoAnimado.src = 'animaciones/cloudy-day-1.svg'
              console.log('por defecto');
          }
        })
        .catch(error => {
          console.log(error)
        })
    })

  }
})