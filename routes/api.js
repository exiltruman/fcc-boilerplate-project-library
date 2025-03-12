/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const { json } = require('body-parser');
const { v4: uuidv4 } = require('uuid');

module.exports = function (app) {

  const books = [];

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      return res.json(books.map((book) => {
        if(!book.commentcount) book.commentcount = 0;
        return book;
      }))
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title

      if(!title) return res.json('missing required field title')

      const newBook = {_id: uuidv4(), title};
      books.push(newBook)

      return res.json(newBook)
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
