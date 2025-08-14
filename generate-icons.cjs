// Simple script to generate PWA icons
// You'll need to install sharp: npm install sharp
// Then run: node generate-icons.js

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const sizes = [72, 96, 128, 144, 152, 192, 384, 512]
const inputSvg = './public/quran-icon.svg'
const outputDir = './public/icons'

// Create icons directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

async function generateIcons() {
  try {
    for (const size of sizes) {
      await sharp(inputSvg)
        .resize(size, size)
        .png()
        .toFile(path.join(outputDir, `icon-${size}x${size}.png`))
      
      console.log(`Generated icon-${size}x${size}.png`)
    }
    
    console.log('All icons generated successfully!')
    console.log('You can now delete this file: generate-icons.js')
  } catch (error) {
    console.error('Error generating icons:', error)
    console.log('Make sure to install sharp: npm install sharp')
  }
}

generateIcons()
