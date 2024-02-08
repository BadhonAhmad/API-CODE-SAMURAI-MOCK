const express = require('express');
const {itemsClear,createItem, getAllBooks, updateItem, deleteItem,getSingleItem} = require('./crud');

const app = express();

app.use(express.json());

const port = 5000;
app.listen(port,()=> console.log(`listening to port ${port}`));
//add books
app.post('/api/books',(req, res) =>{
    const {id, title, author, genre, price} = req.body
    createItem(id, title, author, genre, price, (err) =>{
        if(err){
            res.status(500).send(err.message);            
        }else{
            res.status(201).send({id, title, author, genre, price})
        }
    })
})
//update books with error message
app.put('/api/books/:id',(req,res)=>{
    const id = req.params.id;
    const {title, author, genre, price} = req.body;
    updateItem(id,title,author,genre,price,(err)=>{
        if(err){
            res.status(404).send({
                message : err.message
            });
        }
        else{
            res.status(200).send({id,title,author,genre,price});
        }
    })
})

//get a single book
app.get('/api/books/:id',(req,res)=>{
    getSingleItem(req.params.id,(err,row) => {
        if(err){
            res.status(500).send({
                message : err.message
            });
        }
        else{
            res.status(200).send(row);
        }
    }); 
});


app.get('/api/books',(req,res) =>{
    getAllBooks((err,row)=>{
        res.status(200).send({books:row});
    })
})
//