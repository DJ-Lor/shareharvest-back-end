## This is Shareharvest App Back End 

## Deployed websites

---

- dev-frontend: https://dev-sharehavest.onrender.com
- dev-backend: https://dev-backend-shareharvest.onrender.com
- prod-frontend: https://shareharvest.onrender.com
- prod-backend: https://backend-shareharvest.onrender.com


## General description and overview the application.

---

1. **Application Name:**

   ShareHarvest

2. **Objective:**

   The purpose of ShareHarvest is to share homegrown produce, homemade things and excess items that might be useful for someone else. It is also an opportunity to create community connection, share knowledge and inspiration, reduce waste and encourage eating seasonal, locally produced food.

3. **Target Audience:**

   The main target users of the application would be smaller-scale backyard growers, mainly in metropolitan cities and suburbs. Local, backyard garden growers and enthusiasts, community gardens and the local neighbourhood community.

   **- Local, backyard garden growers and enthusiasts, community gardens**

   Not everyone will grow the same produce. Each backyard is different, some big, some small, some shaded, some growers have favourite produce to grow. And sometimes, our homegrown harvest produces more than what we can consume before it goes off or goes to seed - the ShareHarvest platform opens up an excellent opportunity to give what’s not useful for one to another who will find it useful.

   **- Local neighbourhood community**

   We live in a world where we are physically close to everyone, and yet feel ever so distant from our neighbours. The ShareHarvest up opens up the opportunity to build a harmonious and friendly relationship with your local community who have something to offer that you might need. The intention is to create a stronger community connection, reduce waste and promote sustainability living as well as encouraging to eat better, locally produced food.

4. **In-market Competition & Opportunity:**

   There are a couple of apps in the market that focus on sharing/swapping/buying excess produce but nothing truly holds the market in metropolitan Australia. There is [Oglio](https://olioapp.com/en/) originating from London and available globally which is a marketplace for free items from food, furniture and everything else in between. [Spare Harvest](https://www.spareharvest.com/) is more similar to what we have in mind, however, there looks to be a huge opportunity in terms of improving features, functionality and overall user experience based on the reviews online. Further, ShareHarvest is focused on a money-free exchange, more catered to smaller-scale local backyard growers.

5. **Functionality & Features:**

   **Minimum Viable Product(MVP)**

- User Registration, authentication and authorisation (required):

  - User profiles with basic information like username, email and password
  - Authorisation for user profile management (only creator and admin can edit/delete a listing)

- Excess Harvest Listing and Search (required)

  - Users are able to create Excess Harvest Listings with details such as:
    - Title
    - Postcode
    - Product Category
    - Description
    - Comments (for arranging reservation/pick up)

  **Future Improvements(outside the project timeline scope)**

- Listing Image/s upload

  - Image upload option

- Suburb/Map location (lat, long)

  - View option available for logged in and non-logged in users (messaging option only available if logged in)

- Messaging

  - For pick up details otherwise email or mobile to be provided for comms OR commenting feature

- User rating / review

  - Generally to keep a respectful and harmonious interaction amongst everyone

- User Last Online status / response rate

  - To determine approx response-rate based on historical

- Favourite a Giver

  - To be notified when the giver uploads a new post

- User profile edit and delete

  - able to perform edit and delete functions

- Commenting edit and delete

  - able to perform edit and delete functions

6. **Web APP (ShareHarvest.io)**

- Unauthenticated - Pages
  - Home / App Landing Page
  - How It Works
  - About Us
  - Contact Us
  - Login / Signup
- Authenticated - Pages
  - Login / Signup
  - Dashboard (Search Listing, Create Listing, My Active listing, Sign Out)
  - Account Profile

7. **API (api.ShareHarvest.io)**

Users

- POST /users/login
- POST /users/signup
- GET /users/info

Listings

- GET /listings
  - Default return latest 10 listings (Pagination)
  - Optional Query Parameters
- GET /listings/:id
- GET /listings/mylistings
- POST /listings/:id/comments
- POST /listings
- PUT /listings/:id
- DELETE /listings/:id

Subscribers

- POST /subscribe

8.  **Tech Stack**

**Front-end:** JavaScript, React, TailwindCSS

**Back-end:** Node.js, Express

**Database:** MongoDB/MongoAtlas

**Testing:** Jest

**Design:** Figma

**Deployment:** Render

**Project management:** Jira