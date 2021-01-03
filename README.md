# chatapp
<ul>
  <li> It allows user to join a room and chat with the participants in the room in real-time. </li>
  <li> After the user enters the room, he/she gets an avatar containing the initials of his/her name </li>
  <li> The message sent by the users are displayed in card containing the message, the name of user and the time it was sent.</li>
  <li> The number of participants in the room can be seen in the left side of page </li>
  <li> When a user joins room, he/she is notified using snackbars saying welcome user</li>
  <li> When a user joins or leaves the chat, all other user in the room are notified of it using snackbar </li>
  <li> A Chatapp created using Vue.js, Node.js, Express, socket.io</li>
  <li> Vue.js was used to create the frontend using Vuetify(UI Library)</li>
  <li> socket.io was used for real-time instant messaging </li>
  <li> moment.js was used to get the current time when the message is sent.</li>
</ul>

## Initial Landing Page
![](https://github.com/niranjanblank/chatapp/blob/master/images/landing_page.PNG)

## Group Chat Page on Larger Screen
![](https://github.com/niranjanblank/chatapp/blob/master/images/chat_page_2.PNG)

## Group Chat Page on Smaller Screen
![](https://github.com/niranjanblank/chatapp/blob/master/images/chat_page_1.PNG)

## Project setup
```
npm install
```

### Run the frontend
```
npm run serve
```
### Run the backend server
```
node app
  or
nodemon app
```
