// CLIMA

// obtengo ubicacion del usuario
window.addEventListener('load', () => {
  
    let lat
    let lon
    let cnt 
  
    let temperaturaValor = document.getElementById('temperatura-valor')
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion')
  
    let ubicacion = document.getElementById('ubicacion')
    let iconoAnimado = document.getElementById('iconoAnimado')

    let tempMin = document.getElementById('tempMin')
    let tempMax = document.getElementById('tempMax')

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(posicion => {
        lat = posicion.coords.latitude
        lon = posicion.coords.longitude
        
  
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lang=es&units=metric&lon=${lon}&${cnt}=10&appid=495e29ffe2618a1c71e17084c4e8ee1f`
        
        console.log(url)
  
        // peticiones a la api
  
        fetch(url)
        .then(response => {return response.json()})
        .then (data => {
  
          let temp = Math.round(data.main.temp)
          temperaturaValor.textContent = `${temp} ºC `
          
          let desc = data.weather[0].description
          temperaturaDescripcion.textContent = desc
  
          ubicacion.textContent = data.name

          tempMin.textContent = `${data.main.temp_min} ºC minima`
          tempMax.textContent = `${data.main.temp_max} ºC maxima`
        
          // ICONOS ANIMADOS
  
  
          console.log(data.weather[0].main)
          switch (data.weather[0].main) {
  
              case 'Thunderstorm':
                iconoAnimado.src='../../assets/animated/thunder.svg'
                break;
  
              case 'Drizzle':
                iconoAnimado.src=' ../../assets/animated/rainy-2.svg'
                break;
  
              case 'Rain':
                iconoAnimado.src='../../assets/animated/rainy-7.svg'
                break;
  
              case 'Snow':
                iconoAnimado.src='../../assets/animated/snowy-6.svg'
                break;   
  
              case 'Clear':
                  iconoAnimado.src='../../assets/animated/day.svg'
                break;
  
              case 'Atmosphere':
                iconoAnimado.src='../../assets/animated/weather.svg'
                  break;  
  
              case 'Clouds':
                  iconoAnimado.src='../../assets/animated/cloudy-day-1.svg'
                  break;  
  
              default:
                iconoAnimado.src='../../assets/animated/cloudy-day-1.svg'
            }
    
        })
          .catch(error => {
            console.log(error)
          })
  
        })
  
    }
  
  })
  
  
  
  // FIN CLIMA

  