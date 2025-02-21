# Countries API Application

## Welcome! 👋

Your challenge is to integrate with the [REST Countries API](https://restcountries.com) to pull country data and display it like in the designs.

You should use [React](https://reactjs.org).

Goals for Version 1 of the project:

- Mobile responsive application build with React.js/Vite
- Code deployed to a URL through a Github repo
- As a user, I can see all countries from the API on the homepage, with data displayed about each country
- As a user, I can search for a country using an `input` field
- As a user, I can submit a form with my information

Stretch goals for the project (not required for assignment completion)
- As a user, I can filter countries by region
- As a user, I can toggle the color scheme between light and dark mode
- As a user, I can click on a country to see more detailed information on a separate page
- As a user, I can click through to the border countries on the detail page
- As a user, I can add a country to my Saved Countries list (note: we will work on this during a later version of the project)


**⚠️ NOTE ⚠️: Sometimes the REST Countries API can go down. We've added a `data.json` file with all the country data. You should use this as a backup, if the API responds with an error.**

## Where to find everything

You will need to use this [Figma file](https://www.figma.com/design/YuEMNteoQic0h6RRiYprpV/Countries-API-Project?m=auto&t=C9b6FsfUdPspzaqu-1) for the designs

There are no assets for this challenge, as the country flags will be pulled from the [REST Countries API](https://restcountries.com) and you can use an icon font library for the icons.

There is also a `style-guide.md` file containing the information you'll need, such as color palette and fonts.

## Building your project
1. Initialize your project as a public repository on [GitHub](https://github.com/). Creating a repo will make it easier to share your code with the community if you need help. If you're not sure how to do this, [have a read-through of this Try Git resource](https://try.github.io/).
2. Look through the designs to start planning out how you'll tackle the project. This step is crucial to help you think ahead for CSS classes to create reusable styles.
3. Write out the base styles for your project, including general content styles, such as `font-family` and `font-size`.
4. Start adding styles to the top of the page and work down. Only move on to the next section once you're happy you've completed the area you're working on.
5. Feel free to use a UI library like Chakra to help create your components.

## Deploying your project

As mentioned above, there are many ways to host your project for free. Our recommended hosts are:

- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)


## notes
- login flow with user authentication (password/email) using Firebase SDK 
- have a section at the beginning with the projects tech stack
    - react, firebase, REST Countries API, Vite, Chakra UI
    - talk about versions (local storage, firebase, later own SQL API layer)
- Some errors are visible to users, the ones that they care about, others are only in the console. - search up error handling on the user end for what they care about 
    - implemented user feedback 
    - Implemented UX feedback messages for user authentication adressing password validation and error handling
    - explain more about what the firebase SDK does.... 
    - look up some firebase words like realtime database definition and specifics about how the authentication works in the browser, saving tokens in weird places and stuff. 
    - no sql databse using expression based around userauth and databse
    - what tokens are being stored and what form they are in. - what's the tool that is used to validate, it is in 
    - IndexedDB - object of key value pairs as a way to authenticate the user.





    ### copied notes from firebase
    - Store and sync data with our NoSQL cloud database. Data is synced across all clients in realtime, and remains available when your app goes offline.
    - Data is stored as JSON and synchronized in realtime to every connected client
    

    ### from chat GPT

User Authentication & Data Persistence with Firebase

Developed a robust login flow using the Firebase SDK that enables secure email/password authentication.
The solution leverages Firebase’s authentication module and Realtime Database to seamlessly manage user sessions—persisting authentication tokens in the browser’s IndexedDB for secure, persistent access.
 
Only user-relevant errors are surfaced in the UI (e.g., password validation and common authentication errors), while technical errors remain in the console for debugging.

Tech Stack:

Front End: React, Vite, Chakra UI

Backend & Data: Firebase (Authentication & Realtime Database), REST Countries API

Future Enhancements: Transitioning from Firebase’s NoSQL approach and local storage mechanisms to a dedicated SQL API layer for enhanced data management.

This project demonstrates my ability to integrate modern front-end technologies with secure, scalable back-end services, ensuring a user-friendly experience through thoughtful error handling and responsive feedback.


JSON WEB TOKEN (JWT)