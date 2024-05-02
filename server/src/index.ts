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

app.listen(5000, () => {
    try{
        prisma.$connect()
        console.log('Database connected')
    }catch(err){
        console.log('Error: ', err)
    }

   
    console.log('Server is running on port 5000')
}).on('error', (err) => {
    console.log('Error: ', err)
})

export default app