import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'



const AllPictures = () => {
  const [stars, setStars] = useState([])
  const [newStars, setNewStars] = useState([])
  const [hasError, setHasError] = useState(false)
  const newDate = new Date()
  const currentDay = `2021-${newDate.getMonth() + 1}-${newDate.getDate()}`
  let endDate = `2021-${newDate.getMonth() + 1}-${newDate.getDate()}`
  const currentMonth = `${newDate.getMonth() + 1}`
  let startMonth = `${newDate.getMonth() + 1}`
  let search = ''
    
  const getData = async () => {
    try {
      const { data } = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=dg5GyW52DZwLxZIT4MpUfvRa01eHvDU3sbgf94zE&start_date=2021-${startMonth}-01&end_date=${endDate}`)
      setStars(data)
      setNewStars(data)
    } catch (err) {
      setHasError(true)
    }
    
  }

  useEffect(() => {
    getData()
    filteredStars()
  }, [])
  
  const filteredStars = () => {
    return newStars.filter((star)=> star.media_type === 'image')
  }

  const handleChange = (event) => {
    startMonth = event.target.value
    if (event.target.value === currentMonth) {
      endDate = currentDay
    } else {
      endDate = `2021-${startMonth}-30`
    }
    getData()
  }

  const  filterPics = () => {
    const regexSearch = new RegExp(search, 'i')
    
    const newSearch = stars.filter(star => {
      return regexSearch.test(star.title)
    })
    setNewStars(newSearch)
  }
  
  const handleKeyUp = (event) => {
    search = event.target.value
    filterPics()
  }


  return (
    <>
      <div className='is-fullheight is-black' id='allpictures'>
        <div id='buttons'>
          <select id='selectbutton' className='background-is-dark is medium mt-6 ml-6' >
            <option>2021</option>
          </select>
          <select onChange={handleChange} className='background-is-dark is medium mt-6 ml-6' id='selectbutton'>
            <option value='01'>January</option>
            <option value='02'>February</option>
            <option value='03'>March</option>
            <option value='04'>April</option>
            <option value='05'>May</option>
            <option value='06'>June</option>
            <option value='07'>July</option>
            <option value='08'>August</option>
            <option value='09'>September</option>
            <option value='10'>October</option>
            <option value='11'>November</option>
            <option value='12'>December</option>
          </select>
          <div>
            <input placeholder='Search...' className='background-is-dark is medium mt-6 ml-6' id='searchbutton' onKeyUp={handleKeyUp}>
            </input>
          </div>
        </div>
      </div>
      {stars.length > 0 ? 
        <section className='section is-large' id='allpics'>
          <div className='container' id='picturescontainer'>
            <div className='columns is-multiline'>
              {filteredStars().map(star => {
                return (
                  <div key={star.date} className='card column is-one-quarter-desktop is-one-third-tablet' id='allpicscard'>
                    <Link to={`/pictures/${star.date}`}>
                      <div className='card'>
                        <div className='card-header'>
                          <div className='card-header-title has-background-black is-centered' id='cardtitle'>{star.title}</div>
                        </div>
                        <div className='card-image'>
                          <figure className='image is-5by4'>
                            <img src={star.url} alt={star.title}></img>
                          </figure>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              }
              )}
            </div>
          </div> 
        </section>
        :
        <section className='hero is-large' id='loading'>
          <div className='hero-body'>
            <div className='container'>
              <h2 id='loading-text'>
                {hasError ? 'Something went wrong...' : 'Loading...'}
              </h2>
            </div>
          </div>
        </section>
      }
    
    </>
    
  )
}


export default AllPictures

