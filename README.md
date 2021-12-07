# Advent of Code 2021
## About
This year I'm challenging myself to complete at least half of the Advent of Code challenges using MongoDB's aggregation framework.
I will be using an M10 MongoDB Atlas cluster to host the data and MongoDB Compass as an IDE to build my pipelines.
## Setup
1. Go to MongoDB Atlas at https://cloud.mongodb.com/
2. Create an account and provision an M10 cluster (minimum tier required for running server side javascript)
3. Ensure you can access your cluster from your local IP address
4. Create a username/password pair with rights to access data on your cluster
5. Note down the connection string for your cluster
6. Download MongoDB Compass https://www.mongodb.com/products/compass
7. Open Compass and connect to your cluster, using the connection string you noted down earlier
8. Create a new database, we will add collections for each day's sample and input data later
## Methodology
1. Read the question carefully
2. Save the sample data and your input as separate CSVs, adding a field name as the 1st row in both
3. Open Compass abd create two collections, one for the sample data and one for your input, e.g. for day 1 call these e.g. '1_sample' and '1' 
4. Load the CSVs into the respective collections, making sure to choose an appropriate data type, e.g. number for day 1
5. Open the Aggregations tab on the sample collection and start building an aggregation pipeline
6. Once you're getting the correct result with the sample data, export your pipeline as text
7. Create a new pipeline on your input data collection by importing the text you've just copied
8. Fingers crossed you now have your solution!
9. Rinse and repeat for part 2
## Tips and Tricks
1. Use more stages than you need, breaking each stage of the problem into chunks will make debugging and refactoring easier
2. Add debug fields, keep temporary fields as part of the output for each stage to give you more visibility into what's going on
3. Someone's probably run into the same problem before, lots of questions and answers about the aggregation framework are available on sites like stackoverflow
4. If you're getting the "properly formatted document" error, remove and replace individual parts of the stage until the error disappears, better yet, see tip 1
5. Sometimes things break between sample and real inputs, this is usually due to memory contraints or hitting document size limits, for the former, a different approach may be required, for the latter, try combining operations to reduce the number of fields, especially arrays
