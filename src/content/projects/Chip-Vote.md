---
title: "Chip Vote"
description: "A chip tune battle app. Users produce their own chip tune song based on a prompt in a lobby. After a certain time period, songs are finalized and then voted on."
date: "2025-12-20"
tags: ["React", "Express.js", "Tone.js"]
featured: false
---

# Chip Vote: Building a Browser-Based Chiptune Battle Arena

> **Note**: This project is a work in progress (and a massive labor of love).

The concept behind **Chip Vote** is simple: a browser-based, multiplayer chiptune battle arena. Imagine *Minecraft Build Battle*, but for music production. 

Users drop into a lobby, enter a competitive round, and use a stripped-back, built-in digital audio workstation (DAW) to compose the best chiptune track they can before the timer runs out. When the round ends, everyone listens to the submissions in real-time, votes on their favorites, and crowns a winner. 

Here is a look under the hood at what is built, what went sideways, and where the project is headed.

---

## Key Features & Current State

### 1. The Toy DAW (The Ultimate Hurdle)
This component has easily taken the longest to create. Building a DAW from scratch—even a "toy" version—with enough flexibility to allow for unique musical expressions is a massive undertaking. Because this is a side project, managing its complexity is the main reason development has taken a backseat. I fully intend to finish it, but realistic scope management means it will likely pan out over the next few years.

The goal of the Toy DAW is playback efficiency and intuitive organization. Implementing notes, piano rolls, different instrument types, filters, effects, and automation requires walking a fine line between system performance and user experience.

* **Current Instrument State**: The DAW currently supports "3.5" instruments. The half-instrument is the drum machine; it functions, but it doesn't quite sound like a proper drum kit yet (I'll likely need to implement manual sampling into the piano roll). 
* **The Synths**: The other three instruments are functional synthesizers designed with a bit of AI assistance. They cover the essentials—lead, bass, and chords/alto—creating a cohesive, retro soundscape. Moving forward, adding a customizable synth engine will be crucial for letting users truly stand out.

Currently, the DAW only exists in a localized sandbox mode. There is no multiplayer connectivity yet—just a quiet place to test the audio engine.

### 2. The Home Page & Aesthetic
The home page acts as the structural anchor and establishes the visual identity of the platform. 

The UI design heavily echoes the visual patterns of my own personal Neovim configuration. I fell down the Neovim rabbit hole right around the time I started building this project (which is another reason progress slowed down—tweaking a text editor is incredibly addictive). 

The result is a highly minimalist dark mode accented by vibrant, high-contrast highlights, clean borders, and distinct spacing. It feels technical, retro, and clean.

---

## The Roadmap: Future Implementations

The following features live entirely in the design phase, but they represent the ultimate vision for Chip Vote.

### Lobby, Voting, and the Podium
The multiplayer flow relies on three distinct states:

* **The Lobby**: Where players land after selecting multiplayer. To keep players engaged while waiting for a room to fill, I plan to implement a simple, collaborative musical mini-game that everyone in the lobby can interact with simultaneously.
* **Real-Time Voting**: Once the countdown ends, the voting stage begins. Borrowing inspiration from *Build Battle*, players will listen to tracks concurrently and vote via a dynamic visualizer. I want to experiment with interactive feedback: if a song gets poor marks, the screen might tint red and the audio might fade out early. While harsh, a "skip" mechanic keeps the pacing fast, thwarts trolls, and mirrors real-world streaming metrics where artists have to hook the listener within the first 30 seconds.
* **The Podium**: A celebratory screen displaying the top three composers alongside a full leaderboard breakdown. Climbing the ranks will eventually reward players with UI customization options or profile badges to showcase their skills.

### Interactive Learning
I envision Chip Vote as a potential educational tool for music theory classrooms. It offers a gamified, competitive environment to teach songwriting basics. The early stages will focus purely on chiptune-style arrangements, though future iterations could branch into other genres depending on how far I scale the audio engine.

### The Global Scoreboard
To give compositions a life after the round ends, the highest-rated podium tracks will be preserved on a global leaderboard. To keep the content fresh and prevent an amazing track from 2026 dominating forever, the board will feature weekly, monthly, yearly, and all-time filters. Players will also have their historical tracks saved automatically to their profiles, with the option to opt-out or purge files.

---

## Conclusion

Chip Vote is an incredibly ambitious undertaking for a solo developer's side project. It might take years of incremental updates to fully realize, but that is exactly what a passion project is for. The longer the runway, the better the final output will be.
