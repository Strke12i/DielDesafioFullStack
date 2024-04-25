import express from 'express'
import routes from './routes/Routes'
import cors from 'cors'
import prisma from './lib/prisma'

const app = express()

app.use(express.json())
app.use(cors(
    {
        origin: "*"
    }
))

app.use('/api', routes)

app.listen(3000, () => {
    try {
        prisma.$connect()
    } catch (error) {

        console.log('Error: ', error)
    }
    console.log('Server is running on port 3000')
}).on('error', (err) => {
    console.log('Error: ', err)
})

export default app