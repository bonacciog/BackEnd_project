# Back-end Node.js project

This project has been developed for a personal training. The objective was to learn the **Node.js** environment and to realize a realistic back-end part for a mobile app. 


**Abstract:**
  Develop the back-end part for a mobile app with these features:
  - Users can register in the system.  
  - Users can challenge other users on a specific topic.
  - Users can compile a personal profile.  
  - The home shows the leaderboard for every topic.
  - A challenge consists in 10 multiple choice questions with a maximum time for the answer.
  
  
**Short explanation of the solution**:
It has been developed in javascript with Node.js using the MVC pattern (view is the mobile app).
An **HTTP** server (**Server.js**) listens on a specific ip/port address. It emits an event for every request.
The controller (**Controller.js**) manages every event calling the persistence part (**PersistenceManager.js**),
The role of the persistence is to comunicate with DB (**MySQL**). Notifications are sent throught **WebSocket**.


*I know that Node.js and SQL together aren't efficient (MongoDB I think is the best solution), but it has used MySQL only for a personal training.*  
  
 
