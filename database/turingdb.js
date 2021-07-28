
const mysql=require('mysql')
var knex=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Subhash@1234',
    database:'turing'
})
knex.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("database connected");
    }
})
