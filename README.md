# skillup

## Project Description

The SkillUP! app is an app that helps users to improve their skills through practice. The user will be able to select a skill and choose a challenge to practice. 
At its core, this app is essentially a collection of project ideas (prompts) to give users a springboard to develop their abilities in a select skill and potentially build portfolio pieces. In much later development, I can see this concept being a powerful community development tool as well, where users can share progress, provide feedback, and even add extra challenges to build on concepts.
This version will only include two skills to start with.

Models:

Skill Model: 
name: String (required)

Challenge Model: 
name: String (required)
description: String
challenge: String
**tags: [String]

User Model:
name: String (required, unique)
password: String
**validatePassword: String

Routes: 
(I might need to add more, there are quite a few to keep track of. And it was weird doing this out of context...)
sign-in:
GET /signin shows sign-in page
POST /signin allows users to sign-in with their info

sign-up:
GET /signup shows sign-up page
POST /signup allows users to sign-up

sign-out:
GET /signout (use session.destroy) stops the current user session

skills:
GET /skills allows users to see the skill index page

skill practice: (would these even work this way?... guess I'll find out xD)
GET /skills/:id/practice allows users to see the practice index page
GET /skills/:id/practice/new allows users to see the add practice page
POST /skills/:id/practice creates the new item on the practice list
GET /skills/:id/practice/:id/edit  allows users to see the edit page
PUT /skills/:id/practice/:id  updates the edited content from the user
DELETE /skills/:id/practice/:id deletes the selected item


skill practice show:
GET /skills/:id/practice/:id allows users to see the challenge page
** not new routes, just new links
GET /skills/:id/practice/:id/edit  allows users to see the edit page
PUT /skills/:id/practice/:id  updates the edited content from the user
DELETE /skills/:id/practice/:id deletes the selected item
**

## Wireframes
> Wireframes with basic page layouts<br />
> Copy and paste or drag and drop your images here.

![IMG_2942](https://media.git.generalassemb.ly/user/36461/files/1f09fc80-1b29-11ec-8102-b6b0552b953b)
![IMG_2943](https://media.git.generalassemb.ly/user/36461/files/2204ed00-1b29-11ec-8f58-fdd28062e9c1)
![IMG_2944](https://media.git.generalassemb.ly/user/36461/files/26310a80-1b29-11ec-8b08-3cf79d506538)
![IMG_2945](https://media.git.generalassemb.ly/user/36461/files/6e9df780-1b2c-11ec-9650-e6cef40418ab)

## User Stories
> User stories detailing app functionality<br />
> Add user stories following the _As a [type of user], I want [what the user wants], so that [what it helps accomplish]_ format.

- As a user, I want to be able to access a skill challenge so that I can improve my skills.
- As a user, I want to be able to create my own skill challenges, so that I can work on the things I need.
- As a user, I want to be able to edit my skill challenge, so that I can fix any errors or typos.
- As a user, I want to be able to keep track of my challenge goals, so that I can feel good about my progress

### MVP Goals
- A functional app
- Clean design
- User must be able to edit and update challenges
- User must be able to access and create challenges
- Two skills with challenges for seed data (personal goal: 20+ challenges each skill)

### Stretch Goals
- Add a delete user route (they are with me forever right now muahahaha)
- Add filter options for the Practice/Challenge Page
- Active User Profile Page with: 
    - list of the skills they're actively trying to improve
    - calendar to plan out how many days they would like to do challenges, and specify what challenges to do when
   - a goal tracker to give user visual feedback on goal progress
- Add another skill