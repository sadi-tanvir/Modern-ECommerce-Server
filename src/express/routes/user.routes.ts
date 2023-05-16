import express from "express";
const router = express.Router();




router.get('/', (req: any, res: any) => {
    console.warn('req', req);

    res.json({
        name: 'tanvir hossain sadi',
        email: 'sadi@gmail.com.express',
    })
})


export default router;