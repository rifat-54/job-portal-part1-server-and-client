require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin:['http://localhost:5173'],
  credentials:true
}));

app.use(cookieParser())

const logger=(req,res,next)=>{
  console.log('inside the logger');
  next()
}

const verifyToken=(req,res,next)=>{
  const token=req.cookies.token;
  if(!token){
  return  res.status(401).send({message:'unauthorized access'})
  }
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
    if(err){
    return  res.status(401).send({message:'unauthorized accress'})
    }
    req.user=decoded;
    next()
  })
}


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.umkvz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });

    const jobCollection = client.db("jobs").collection("jobscollection");

    const jobApplicationCollection = client
      .db("jobs")
      .collection("job_application");


      // token api

      app.post('/jwt',async (req,res)=>{
        const user=req.body;
        const token=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'5h'})
         
        res.cookie('token',token,{
          httpOnly:true,
          secure:false,
        })
        .send({success:true})
       
      })




      // jobs

    app.get("/jobs",logger, async (req, res) => {
      // console.log('inside the api callback');
      const email=req.query.email;
      let query={};
      if(email){
        query={hr_email:email}
      }
      const cursor = jobCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // job post

    app.post("/jobs",async(req,res)=>{
      const newJob=req.body;
      const result=await jobCollection.insertOne(newJob)
      res.send(result)
    })

    app.get("/jobs/:id", async (req, res) => {
      const id = req.params.id;
      const cursor = { _id: new ObjectId(id) };
      const result = await jobCollection.findOne(cursor);
      res.send(result);
    });

    // job aplication

    app.post("/job-application", async (req, res) => {
      const application = req.body;
      const result = await jobApplicationCollection.insertOne(application);

      // count job number

      const id=application.job_id;
      const query={_id:new ObjectId(id)}
      const job= await jobCollection.findOne(query)
      // console.log(job);

      let jobCount=0;
      if(job.applicationCount){
        jobCount=job.applicationCount+1;
      }else{
        jobCount=1;
      }

      const filter={_id:new ObjectId(id)}

      const updateDoc={
        $set:{
          applicationCount:jobCount
        }
      }

      const updateResult=await jobCollection.updateOne(filter,updateDoc)

      res.send(result);
    });

    app.patch('/job-application/:id',async(req,res)=>{
      const id=req.params.id;
      const data=req.body;
      const filter={_id:new ObjectId(id)};
      const updateDoc={
        $set:{
          status:data.status
        }
      }
      const result=await jobApplicationCollection.updateOne(filter,updateDoc)
      res.send(result)
    })

    // view job who apllied my job

    app.get('/job-applicaiton/jobs/:job_id',async(req,res)=>{
      const jobId=req.params.job_id;
      const query={job_id:jobId};
      const result= await jobApplicationCollection.find(query).toArray();
      res.send(result)

    })

    app.get("/job-application",verifyToken, async (req, res) => {
      const email = req.query.email;
      if(req.user.email!==req.query.email){
        return res.status(403).send({message:'forbidden access'});
      }
      const query = { application_email: email };
    //  console.log('cuk cuk cokkkie',req.cookies)
      const result = await jobApplicationCollection.find(query).toArray();

      for (const application of result) {
        // console.log(application.job_id);
        const query1 = { _id: new ObjectId(application.job_id) };
        const job = await jobCollection.findOne(query1);
        if (job) {
          application.title = job.title,
          application.company = job.company,
          application.company_logo = job.company_logo,
          application.location=job.location
        }
      }
      
      res.send(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("job is falling form sky");
});

app.listen(port, () => {
  console.log("server is runnig on port:", port);
});
