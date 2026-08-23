---
title: "Chip Vote"
description: "A chip tune battle app. Users produce their own chip tune song based on a prompt in a lobby. After a certain time period, songs are finalized and then voted on."
date: "2025-12-20"
tags: ["React", "Express.js", "Tone.js"]
featured: false
---

# Chip Vote

**Note**: This project is a work in progress.

A chip tune battle app intended to be on the browser. Users produce their own chip tune song in a toy digital audio workstation (DAW). I have many ideas for different game modes and prompts. However, the general idea is that users will be in a lobby where they will compete to make the best song in the set time. At the end of the round, all users' songs are played and voted on. The song voted best wins! 

## Key Features

### Toy DAW

This part has taken me the longest to create and is reason that this project may never be completed. Building a DAW, even a toy one, with enough options to allow for unique styles of music is very challenging. As this is a side project, this is the main reason that this project has taken a back seat. I hope to finish it some day, however, it will likely take several years for it to pan out.

The toy DAW is where the user can build music and play it back to listen. There needs to be many considerations put into creating a DAW, especially since we are implementing a toy version, where lots of features in a fully built DAW will be lacking. The greatest hurtle is organization and performance. There are many notes, different types of notes, different instruments, and a whole host of things that could be implemented such as filters, effects, and automation. 

Currently, the DAW supports 3.5 instruments. The half of an instrument comes from the drums, which do work, but they do not sound much like a drum. Likely using manual sampling into a piano roll will be required. The other 3 instruments are synths that I asked AI to create for me, and it did a decent job. These three synths make up the lead, bass, and alto or chords that allow for a homogenous sounding song. However, as the project progresses, the requirement to add more instruments or a customizable synth will be required to allow users to make unique pieces.

### Home page 



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
