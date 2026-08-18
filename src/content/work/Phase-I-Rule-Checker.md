---
title: "Phase 1 Trial Rules Checker For FACTS"
description: "A rules checker for phase I dose escalation non-CRM trials simulated in FACTS."
company: "Berry Consultants"
date: "2026-08-13"
tags: ["FACTS", "Testing", "Python"]
featured: false
---

# Phase 1 Trial Rules Checker For FACTS
> **Project Scope**: Build an automatic validation engine for Phase I clinical dose-escalation trials simulated within FACTS (Fixed and Adaptive Clinical Trial Simulator), which is the primary clinical trial simulation software developed by Berry Consultants.

This project runs checks on the outputs of FACTS independently. The code provides comprehensive rule validation for rule-based, non-model, designs, including **3+3**, **i3+3**, **BOIN**, **mTPI**, and **mTPI-2**. 

Find the repo [here](https://github.com/Wise05/Automatic-Rules-Checker-for-Non-CRM-Phase-1-Designs). Note that I have been given permission to share this project.

The biggest accomplishment from this project was that I found 8 bugs, and had to make design decisions around that these bugs were likely to change after I left. 

---
## Building The Project

### Introduction

Every FACTS simulation ran outputs a folder of results. Like any good software, these outputs need to be checked.
For many design types in FACTS, especially the more frequently used phase 2 and 3 designs, there already exists a rule checker of sorts. 
However, for phase 1 these checks had not been implemented, so I was asked to implement them as part of my internship experience.

I started the project with the easier designs, which are the rule based designs. 
They are called rule based because at the end of each cohort allocation, they follow a set of rules to decide what to do next. 
The more complex design(s) are model based.
This primarily means CRM and its variations, which use a mathematical model to decide which dose to allocate next based on what the model estimates to be the most likely MTD.
I did not do CRM in the rules checker because it has about twice the number of variables as the other designs especially since they share many of the same variables. 
So, the scope was decided to be too large for the three month internship. 

### Gathering Documentation

The first step to tackling this project was collecting all documentation. 
Since this was QA and I was unfamiliar with these clinical trial designs, I needed to map out how everything was connected and what meant what. 
However, in doing so, I discovered that there was documentation missing for the input variables. 

So, the next step became reverse engineering all the input variables from the GUI because I did not have the source code initially, and even when I was given the source code, using the GUI to discern what variables meant was easier. 
I chose to write the documentation in json form so it could potentially be used later in the code. 
This ended up being an unnecessary choice, but it did leave things well organized and provide future flexibility. 

I needed to account for several things besides just a simple term and description dictionary. 
Many of the variables do not populate unless under specific conditions. 
Also, many of the variables populate, but cannot be configured in the GUI, these are irrelevant to the simulation, but still need to be accounted for in parsing. 

The solution I went for was to have a section in each of my json entries that says under what design they populate, and under what design they can be edited. 
Added exceptions such as needing an expansion cohort are mentioned in the description since there are far too many conditions that populate certain variables to be fully organized.

### Parsers and Classes

The second step was to write the parsers and classes. 
The parsers were fairly straightforward now that all variables have been documented. 
Since there are so many variables, and this is a tedious process, I decided that I would see how well Claude could do on writing it. 
After writing the simple classes (everything is either a trial with a sub-class of shared design shared variables or design specific possibly null variables, or it is a csv put into an object) Claude had almost no problem after a little bit of testing and re-prompting with the stack error. 

### The Checks 

The checks can be split into three categories: bounds checks, calculation checks, and cross checks. 

Bounds checks are fairly self explanatory. Make sure a variable is within its expected bounds. 
This also included things like monotonicity and ensuring that probabilities add up to 1 when needed. 

Calculation checks primarily apply to the most atomic parts, or looking at a single simulation.
An example of this is the checks that follow the escalate/stay/de-escalate decision at each allocation, making sure that the correct decision was made. 
This requires following the exact algorithm that the model follows, meaning a decent bit of math. 
External libraries were utilized and reading the source code was leveraged (I had access by the time I got here). 
So, this was a manageable endeavor.
However, this is where most of the bugs were found, which was the most frustrating part of this project. 

Cross checks are what I call any check that pull data from a more atomic set of files in order to populate, sometimes with calculations, a field of a less atomic file. 
So, these were mostly straighforward, especially since the naming convention for these fields did make sense and was consistant between files (not the case for input vars). 

### Wrapping Up The Main Project 

After implementing all checks, the final thing to do was to make a visually appealing and easy to read cli interface to report the checker's findings. 
This was fairly straighforward: every checker that was broken writes its name and context to standard output, or a file. 

---

## Testing 

I approached false positive testing in a primitive way. I simply ran the program on several real data folders and made the checker conform so that it checked every field according to how the FACTS engine populates it. 
This was where most of the bugs in my program were found.

False negative testing was more complicated. For this I used an automatic tester, which ran the checker on data that had been purposefully mutated from a normal specimen folder. 
The mutations were created by using several json files which contained what needed changing, a description, and what rule to break. 
If a given rule was not broken when it should have been, the tester would signal the discrepancy. 
This resulted in finding only one bug, which was somewhat expected, as this step is primarily used for insurance and sanity checking. 

---

## Documentation 

The final step was documenting everything (technically done as the project went along, but finished at the end).
I won't go into too much detail here because you can read this on the repo. 
The README.md was written.
All rules that the checks follow along with the name of the rule, were consolidated into a single [md file](https://github.com/Wise05/Automatic-Rules-Checker-for-Non-CRM-Phase-1-Designs/blob/main/output_coverage.md), which also showed if we had false negative tested it (all were). 
A bug report was written, which you can find [here](https://github.com/Wise05/Automatic-Rules-Checker-for-Non-CRM-Phase-1-Designs/blob/main/bug_report.md). 

---

## Handling Engine Quirks

The initial expectation for the project was that there may be strange variable names and quirks, but the important stuff was bug free. 
The bug free part was half true. 
I found 7 bugs in various fields. And one bug that populated an extra uninformative row.
These bugs were not in super critical fields, such as the core decision logic. 
They mainly served as things that were overlooked in the polishing of the engine. 

However, this gave me a dilemma: I did not know if these bugs were actually intentional. 
This part of the software was decently old and had not been touched, so trying to ask a coworker about it would require getting them into the weeds. 
This did happen for a few of the bugs, however, I did not have the opportunity to go fully into it. 
There were two more issues though. 
I would not likely be able to get a fixed version by the time my internship ended, and I did not know if I would be finding more bugs as I continued developing. 
So, I decided that I would use flags. 
I grouped the 7 field bugs into one flag, and the spurious row into another. 
I made the default checker run how I thought the intended way should have been. 
Then with the two flags, the checker would conform to the way the FACTS engine was at the time. 
This gave options to future developers to be able to pick and choose whichever version of the check was expected. 

This choice was not perfect, as the spurious row flag caused me more headaches. 
The spurious row was the first bug I found, and as such I figured that it was irrelevant and could likely be fixed easily. 
So, the flag that I made just made a copy where the row was completely removed. 
This however, made conforming to some of the other checks harder because some of their bugginess relied on the extra row. 
So, conforming to a bug proved to be the hardest part in some of these cases because I didn't have all the info to work off of. 
However, I did pull it off. It was not perfect, but I had documented it as best I could. 

---

## Conclusion 

The project had some rather tedious aspects to it. Such as writing up documentation for hundreds of input variables, many of which were not even used or belonged to CRM (I documented all CRM variables too before I realized it was out of scope). However, with the bugs found, and the option to think about designing software that needs to account for future change, the project did have some fun aspects to it. And I think it was well worth the endeavor. 
