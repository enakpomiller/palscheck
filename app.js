const express = require('express');
const bodyPaser = require('body-parser');
const bcrpt = require('bcrypt');
const exphbs = require ('express-handlebars');
const session = require('express-session');
const {Sequelize, QueryTpes, EmptyResultError} = require('sequelize');

const app  = express();
app.use(express.json()); 
// callign body parser
app.engine('handlebars', exphbs.engine({defaultLayer: 'main'}));
app.set('view engine','handlebars');
app.use(bodyPaser.urlencoded({ extended : false})); 

// set tatic folders
app.use(express.static("public"));
app.use("/uploads",express.static("uploads"));
app.get('/', (req, res)=> res.render('index',{ layout:'landing'}));

//linking to database via sequelize
    const sequelize = new Sequelize('palscheck', 'root', '', {
        dialect: "mysql",
    });

// test database connection
sequelize.authenticate().then(() =>{
  console.log('connection to database is successfull');

}).catch((error) => console.log(error,'sorry an error occured'));

// setting database tables
const tbl_users = sequelize.define('tbl_users',{
    number_of_downloads:Sequelize.STRING,
    number_of_users:Sequelize.STRING,
    number_of_views:Sequelize.STRING

 },{tablename:"tbl_users"});
    tbl_users.sync();










app.get('/dashboard',async (req,res) =>{ 
    try{
        const countallusers = await tbl_users.count();
        const tab_title = "Palscheck Dasgboard";
        res.render('dashboard',{tab_title,countallusers});
    }catch(error){
      return console.log(error);
    }
    
})


app.post('/addusers',async (req,res)=>{
        try{
            const {number_of_downloads,number_of_users,number_of_views} = req.body;
            const insert = await tbl_users.build({
                number_of_downloads,
                number_of_users,
                number_of_views
            });
            console.log(insert);
            insert.save();
       
        }catch(error){
          console.log(error);
        }
})


// app.get('/getdata',async(req,res) =>{
//           const getall = await tbl_users.count();
//           console.log(getall);
//     try{
    
//     }catch(eror){
//        console.log(error);
//     }
// })






const PORT = process.env.PORT || 5200;
app.listen(PORT, console.log(`app running at port ${PORT}`));