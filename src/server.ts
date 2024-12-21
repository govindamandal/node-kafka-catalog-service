import * as dotenv from 'dotenv';
import app from './expressApp';
const PORT = process.env.PORT || 8000;

const StartServer = async () => {
    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`);
    });
    process.on('uncaughtException', async (err) => {
        console.log(err);
        process.exit(1);
    })
}

StartServer().then(() => {
    console.log('Server is started!');
})
