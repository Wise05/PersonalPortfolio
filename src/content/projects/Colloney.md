---
title: "Colloney"
description: "A mobile finance app for students, with an alien colonizer twist."
date: "2025-12-20"
tags: ["Java", "Android", "UX/UI"]
featured: true
---

# Colloney

This project was a mobile finance app that aims to help students save for tuition and learn about/manage their finances. This was built for Com S 3090 at Iowa State University. I workedin a group of 4 (2 backend, 2 frontend) as part of the frontend team. 

The original idea for this app was to make a fun gamified way to help students save for money. The main gimic being that the colony would grow as you made progress towards your savings goal. However, we did not implement that feature due to the requirements of the class forcing use to spend our time elsewhere. 

The frontend was built with Java using Android Studio. The backend was made with Spring Boot. 

This project got us **second place** best project out of a class of ~50 people. 

Check out the video demo: 
[Link](https://www.youtube.com/watch?v=CKpuQ5GOM_Q)

## Key Features

### Signing up 

Signing up a user requires the user to create an account, which redirects them to the budgeting form. The idea for this for was to allow students to create a savings goal with a date for their tution based on information from the College Scorecard API. We intended to modify this feature after continuing to work on the project, but ran out of time for the class. 

### Home page 

The home page contains a total balance of all the user's assets in the app and shows their goal and progress. The home page also acts as the hub to enter different "buildings" which are the pages of the app that each provide essential functionality for our features.

There was an intention to make the colony "grow" as you made progress towards your savings goal, meaning that more houses would appear possibly with minigames, but this was backlogged and never completed. 

### Stocks page

This was intended to allow users to create a watchlist of stocks (allowing them to view their history), buy and sell stocks, and view their portfolio. On the backend, this was done by running a timer to call an API for stock data and then collecting that on our given server. Then the frontend could use the API to get the data and also do mock buying and selling. We used a web socket for the stock price to give real time updates. 

### Banking page 

This was a simple banking set up that allowed users to create various accounts and withdraw, deposit, or transfer money from them. You could also see transaction history. 

### News

This showed a news feed of different articles that were collected by the backend. The backend got these articles by calling an API periodically, similar to stocks page. You could also filter based on company/topic. 

### AI Advice

This was an AI that was given a prompt to behave as a financial advisor. The AI was hosted on the app's server and the frontend just called the API. 

### Budgeting

This page allowed you to make budgeting plans. We kind of just tacked this on at the end to get points. 

### Posts page

This was a social media page that used a websocket to show real time posts. You could also filter posts based on key words. 

## My contribution

I built the frontend for Login/sign up, budget form, banking, AI advice, and posts page. I also polished the xml for the stocks page and news page. Built the volley utils and refactored the frontend midway through to give the frontend code a bit more consistency and clean up the messiness a bit. 

## Challenges 

This whole project was a real test in my people skills. There seemed to be some sort of disagreement at almost every step of the project. Many times, my teammates seemed to not understand what I was trying to convey, despite my best efforts to re-iterate. Overall, I think that the challenges that this group faced just in communication and team work prepared me for the absolute worst possible team situation you could be in without any real pressure. Since it was only a school project. Ironically, the technical part of this project was much easier than any of the team management aspects. 
