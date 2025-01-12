import axios from 'axios'
import fs from 'fs'

const API_URL = 'https://engineering.multividas.com/'

async function fetchData() {
  try {
    const response = await axios.get(API_URL)
    const data = response.data
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2))
    console.log('Data fetched and saved to data.json')
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

fetchData()
