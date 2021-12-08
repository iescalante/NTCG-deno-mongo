# NTCG-deno-crud

This project is from the NodeJS The Complete Guide from Maximilian S.

Some fixes I had to make sure to include are seen in the deno folder, regarding MongoDB

- connecting to Atlas;
- how to use the ObjectId;

Also, a small change in the Frontend that I might have missed during the course is in regards with the famous \_id that needed to also change to be able to send the requests to Atlas.

To spin up the FE server, simply use the usual command `npm start`.
For the BE server, go to the deno folder and use `deno run --allow-all --unstable app.ts`.

Also, you will need to put your credentials for MongoDB :)
