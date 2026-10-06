const express=require("express");
const app =express();
const path=require("path");
const mysql=require("mysql2/promise");
const { faker } = require('@faker-js/faker');
// for hadling views through ejs(embedded java script) 
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


// for giving a static  express folder permission
app.use(express.static(path.join(__dirname,"..","Frontend")));
// for hadling post request
app.use(express.urlencoded({extended:true}));
// working with UUID package (so install it first)for genreating unique id 
// starting the server on port 6969
app.listen(6969,(req,res)=>{
    console.log("server started");
});
// work to convert a post request in the form to delete or patch
const methodOverride=require("method-override");
app.use(methodOverride("_method"));

const {v4:idv4}=require("uuid");
// working with faker 
 function createRandomUser() {
  return [
     faker.string.uuid(),
     faker.internet.username(),
     faker.internet.email(),
     faker.internet.password(),
    
];
}

// // data base in array 
// let posts=[{username:"NANI",
// uid:idv4(),
// image:"https://imgs.search.brave.com/nx7-uGe0gYdkBGqpc-yylKEkUFFBSLXpj9ysosvyTo8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2Frc2hpLmNvbS9n/YWxsZXJ5X2ltYWdl/cy8yMDI2LzA5LzIz/L05hbmklMjAoMiku/anBn",
// caption:"JADAL ZAMANA SHURU"
// },
// {username:"ANISH",
// uid:idv4(),
// image:"https://imgs.search.brave.com/V35b2N5QOgPUmnASQzpsNcXcshNMwyHZl81xSIA2jk8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudG9paW1nLmNv/bS90aHVtYi85OTAx/Mjc5NC5qcGc_aW1n/c2l6ZT0yMzQ1NiZw/aG90b2lkPTk5MDEy/Nzk0JndpZHRoPTYw/MCZyZXNpemVtb2Rl/PTQ",
// caption:"CALM AS FUCK!!!!"
// },
// {username:"ANISH",
// uid:idv4(),
// image:"https://imgs.search.brave.com/qYSqwmhYSjxC1l0mKEOTdPrsFVdDfNPRknMmneKvmTo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDczMDk4/NjIuanBn",
// caption:"ME WITH MY NOSTALGIA"
// },
// {username:"BHANU",
// uid:idv4(),
// image:"https://imgs.search.brave.com/tkKShP6qMz9XVa0llpt-sRxE_RyYJhEBHjfqlFFKTto/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZmlsbWliZWF0/LmNvbS9waC1iaWcv/MjAyNC8wMi9uYW5p/XzE3MDY4NTQwNjIx/MC5qcGc",
// caption:"rady for for my new movie "
// }
// ];

async function main() {
// setting up the database(sql) link
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'instagram',
  password:'Anish@9188863'
}); 
// // database
// let q="insert into users(id,username,email,password) values ?";
// // // creating fake data
//  let data=[];
//  for(let i=0;i<50;i++){
//      data.push(createRandomUser());
// }

// // // inserting into database
// try {
//     await connection.query(q,[data]);
//  } catch (err) {
//    console.log(err);
//  }




// hadling the requests (api gateway)

    app.get("/", async(req,res)=>{
         try {
            let [rows]= await connection.query("select * from users");
            res.render("home.ejs",{users:rows});   
        } catch (err) {
          console.log(err);
           res.status(500).send(err.message);
        }
});


app.get("/post",(req,res)=>{
     res.render("add.ejs");
 });

 app.post("/post",async (req,res)=>{
     let pot=req.body;
     const post=[idv4(),pot.username,pot.email,pot.password];
      try { 
            let q="insert into users(id,username,email,password) values (?,?,?,?)";
            await connection.query(q,post);
                
                res.redirect("/");
            }   
         catch (err) {
          console.log(err);
           res.status(500).send(err.message);
        }
 });

//  app.delete("/:uid/delete",(req,res)=>{
    //  let did=req.params.uid;
    //  posts=posts.filter(item => item.uid !== did)
    //  res.redirect("/");
//  });
//  app.get("/:uid/edit",(req,res)=>{
    //  let did=req.params.uid;
    //  let delpost=posts.filter(item => item.uid === did);
    //  res.render("edit.ejs",{delpost});
//  })
//  app.patch("/:uid/edit",(req,res)=>{
    //  const id=req.params.uid;
    //  const pot=req.body;
    //  let pos=posts.filter(item => item.uid === id);
    //  pos.caption=pot.caption;
    //  pos.image=pot.image;
    //  posts=posts.filter(item => item.uid !== id);
    //  posts.unshift(pos);
    //  res.redirect("/");
//  });
// 


}
main();


