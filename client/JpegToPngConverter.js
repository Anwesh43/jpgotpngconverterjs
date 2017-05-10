class JpegToPngConverter {
    constructor(src) {
        this.src = src
    }
    createConvertedImage() {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        const image = new Image()
        image.src = this.src
        image.onload = () => {
            canvas.width = image.width
            canvas.height = image.height
            context.drawImage(image,0,0,image.width,image.height)
            let imgData = context.getImageData(0,0,canvas.width,canvas.height)
            let data = imgData.data
            if(data.length > 4 && data.length%4 == 0) {
                const alpha = data[3],red = data[0],green = data[1],blue = data[2]
                for(var i = 4;i<data.length;i+=4) {
                    const currRed = data[i],currGreen = data[i+1],currBlue = data[i+2],currAlpha = data[i+3]
                    if((red == currRed && green == currGreen && blue == currBlue && alpha == currAlpha) || ( currRed >= 200 && currGreen >=  200 && currBlue >= 200)) {
                        data[i+3] = 0
                    }
                }
                context.putImageData(imgData,0,0)
                const imgDom = document.createElement('img')
                imgDom.src = canvas.toDataURL()
                document.body.appendChild(imgDom)
            }
        }
        context.drawImage()
    }
}
