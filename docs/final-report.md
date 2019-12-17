# Final Report

**⚠️  Remember to also fill in the individual final reports for each group member at `https://github.com/jhu-oose/2019-student-<identifier>/blob/master/final-report.md`.**

**⚠️  You don’t need to do anything special to submit this final report—it’ll be collected along with Iteration 6.**

# Revisiting the Project Proposal & Design

<!--
How did the Project Proposal & Design documents help you develop your project?
What changed in your project since you wrote the initial version of those documents?
-->

The project proposal would have been useful if we were aware of each other's skill levels and experience. There was a lot of confusion as to what people were comfortable in doing and how strong each other's coding skills were. So, we did not understand what was possible given the time that we had. We assigned each other responsibilities informally and wish that they were explicitly discussed and written out in the project proposal at creation. About half of the design was implemented due to the short amount of time that we had to complete this project. The other half we just did not have the time to implement. The MVC stayed relatively intact with minor changes. The architecture stayed intact as well. We did not have any integration with Facebook or Google Calendar unfortunately due to time constraints. 

# Challenges & Victories

The main problem with our group on this project was inertia. We had a relatively strong start, and we were able to get the map up and running quickly, and started interacting with it shortly after.

However, after constant problems with the server and the database and problems with the API, it seemed like nothing was working. Progress and motivation for the project just came to a crawl 
while we tried to get the bare minimum over the line for every iteration. This caused us all to start working on our own branches and own ideas in the repository, and by the time we all started to get
a hang of things, we had an entangled mess of confused branches each with half-baked codebases that was a mess to merge together. It wasn't until the very end that we really started to gel as a team 
and get into a clean ryhthm/workflow, but at that point there was only so much time to get features and fixes in.

Despite this, we did a lot of great work and had a lot of really tough problems that we solved in this project together.

<!--
In software engineering things rarely go as planned: tools don’t work as we expect, deadlines aren’t met, debugging sessions run longer than we hoped for, and so forth.

What were some of the biggest challenges you found when developing your project? How did you overcome them?
-->
# Experience with Tools
We learned to love Postman, Javalin, and React because they are both powerful tools that enabled our tight workflow to be just a little easier. We cannot imagine working through all the problems that we had without them. In the future, if we were to make an API, Postman would be strongly considered for testing the API. It was difficult to learn because we did not understand how to write any tests or the basic concepts of API calls, but it makes automated testing of the API so easy. 
We hated the Google Maps API because it gave us so many errors and had restrictions on how many calls we made to their API before it locked up. This gave us a lot of headaches as we tried to understand why we were getting those errors and how to avoid them. In the future, we will find a more open source mapping API for the same job.
<!--
Which tools did you learn to like? Why?

Which tools did you learn to dislike? Why? And what other tools would you have replaced them with if you were to start all over again?
-->

# Iteration 7 & Beyond
We had started building our Facebook integration but we did not have the time to add it's many features like login, friends list, and event discovery into our app. This would make our app that much more awesome and also increase our network of users and helping us achieve our goals of reconnecting forgotten friends that are only a click away. 
We also need to fix the fact that our app needed to be refreshed every time there was a change to the database because when we first implemented automatic updates, it would refresh the map and markers, causing annoying flashes. So, we made the hard design decision to just load everything upon loading the map after logging in. 
<!--
Where would you take your project from here? What features would you add to make your application even more awesome? How would you prioritize that work?

Update the project board with tasks for a hypothetical Iteration 7.
-->

# A Final Message to Your Advisor
Shreyas was a great asset and motivating advisor every week. Despite our challenges, he was able to patiently answer and help us with the problems while offering words of encouragement as we were at our lowest. We had no problems working with Shreyas and hope he continues helping and motivating us and other budding software engineers. 
<!--
What did you like in working with them?

What do you think they need to improve?

And anything else you’d like to say.
-->
