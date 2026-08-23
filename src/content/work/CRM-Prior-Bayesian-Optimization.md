---
title: "Using Bayesian Optimization on CRM Prior"
description: "Experiment with Bayesian optimization as a viable method to easily determine the best parameters for CRM prior skeleton in FACTS."
company: "Berry Consultants"
date: "2026-08-14"
tags: ["Python", "Machine Learning", "BoTorch"]
featured: true
---

# Phase I CRM Prior Skeleton Optimizer

> **Project Scope:** Using Bayesian Optimization as an efficient, algorithmic method for determining optimal parameter configurations for CRM skeletal priors within FACTS.

This project runs several CRM prior configurations in FACTS, evaluates them, fits the gaussian process to them, generates new points, and runs them again.

You can find the repo [here](https://github.com/Wise05/Bayesian-Optimizer-for-CRM-Prior). Note that I have been given permission to share this. However, it cannot be run unless you have access to FACTS.  

The biggest accomplishment that I achieved with the project was achieving a 3.93% averaged improved accuracy over mTPI-2 in not-cherry-picked, three toxicity profiles case (averaged over the three profiles).
Also, less notably there was a mixed but technically still greater improvement of 0.54% average improved accuracy when increasing to five toxicity profiles case. 

---

## Overview of CRM 

In phase 1 dose escalation trials, the goal is to find the maximum tolerable dose (MTD), the highest dose of a drug that results in below a certain rate of toxicities (also called dose-limiting toxicities [DLTs] which are defined by a set of criteria). 
To do this, patients are allocated to different dose levels, typically starting at one of the lowest levels. 
Then, as each dose level gets cleared, stronger and stronger dose levels are tried until we find a dose that appears to follow the target rate. 

Other designs, like the ones I did in the rules checker including mTPI-2, follow an algorithmic decision process for determining what dose level to allocate to the next set of patients (also called a cohort). Making them straightforward but having less customization. 
However, CRM follows a model to make decisions. 
This model is meant to try and mimic the toxicity curve (the graph of toxicity level vs. the rate of getting a toxicity) of the toxicity profile. 
This allows for a greater level of specification for the model, possibly resulting in higher accuracy at finding MTD. 
This model looks similar to logistic regression, but differs and is defined by five variables. 

The variables are as follows: alpha is the intercept of the reference dose, ln(beta) is the slope on a log scale, then there are two variables for the uncertainty of the previous two, finally rho is the correlation coefficient between alpha and ln(beta). 
Alpha and beta go into an inverse logit function to produce p(d) or the probability of a toxicity at some dose d. 
This inverse logit function also produces the sigmoid-like curve and allows for alpha and ln(beta) to be any real number. 

## The Prior Problem

An issue with CRM is that it requires a good prior (initial curve) in order to perform well. 
However, the process of finding a good prior is difficult, and has no best method. 
So, the idea of this project is to allow for a trial designer to run a search algorithm where they set what they want to look for, and overnight the search finds the best possible parameters to meet their goals. 

---

## The Bayesian Optimization 

The basis of Bayesian optimization is a simple loop where it starts with an initial set of evaluated points, then a model (typically the Gaussian process) is fit to the points, then an acquisition function proposes a set of new points, then those points are evaluated, and then it loops back to fitting for a certain number of iterations. 

My bayesian optimizer follows this same pattern.
First, a Latin hypercube generates a spread of random points, which are run in FACTS over 1000 simulations, evaluated with a score function, and fit to the Gaussian process. 
Then the acquisition function (I tried qKG, qLogNEI, and qUCB from the botorch library) generates some new priors it wants to try. 

The score function is the most difficult aspect to this because there are many ways to write a score function, but which one is best is difficult to discover. 
The one that I found to work best was by looking at each dose levels' rates and finding the distance from the target. 
Then the model is penalized by taking the chance of choosing a specific dose as MTD times the distance. 
This is summed over all the doses. 
The score is averaged over all the toxicity profiles. 

Since over dosing the MTD is more dangerous than under dosing, the distance above the target is doubled (or customized to what the user wants). 
Also, an issues that came up was that some profiles would be penalized less than others for being less accurate, meaning that the model would prioritize certain profiles over others. 
To combat this, a spread penalty over the scores of each profile was utilized. This was the standard deviation over all the profiles' scores. 

Additions to the score were penalizing for toxicity and enrollment, which also were averaged over the profiles. 
These ended up not being used when benchmarking against mTPI-2 because they did slightly worsen accuracy. 
However, they could potentially be useful if these are worrisome features. 
Squared distance also proved to be a better distinguisher at showing which of close scores were better. 

Every aspect of the score function would be weighted to the user's preference. 
This included the per scenario scores, which would be done in the averaging process by weighting them accordingly. 

---

## The Problem with Visualizing 5 + 1 Dimensions

Visualizing 5 parameters and the score is very hard. 
Theoretically, it is possible on a 3D plot also utilizing color, shape, and size. 
However, viewing any trend from this is close to impossible unless it is fairly obvious, and unfortunately the five parameters that make up the prior are volatile, with many small plateaus and valleys across the sample space. 
Therefore, my early efforts to try and identify trends were fruitless, and in the end I just stuck with evaluating how well it did by looking at the data and comparing it to the benchmarks, which were other designs. 

--- 

## The Boundary Seeking Dilemma

Boundary seeking is a phenomenon that occurs with Bayesian Optimization because the of how the Gaussian process and the acquisition functions work. 
Since there are defined borders for each variable in the sample space (you cannot have an infinite sample space), 
at the borders there is nothing on the outside. 
This results in higher variance at the borders. 
This causes an issue with the acquisition function. 
The acquisition functions try to balance exploration (reducing model uncertainty across the space) and exploitation (sampling near known high-scoring points).
the elimination of uncertainty in the model and the design to explore near the best points because we want to achieve high scores. 
However, in the case of a flat or very volitile space, the acquisition function has no exploitation to look for, so it tries desperately to at least remove uncertainty. 
This means that once we have done a seemingly "good job" at exploring the sample space and there is not clear trend, the acquisition function tried to go to the boundaries. 
This results in a disproportionate number of points at the edges than in the middle. 

Now, there is another case of boundary seeking that needs distinction. 
If the best point or a plateau is believed by the acquisition function to be outside of the boundaries, then it will cling to the edge. 
However, in some cases, the acquisition function may want to cling to that edge for as far as you extend it. 
This is the degeneration of a parameter. 
Pushing the boundary so far that the points become degenerate is not productive. 
As increasing the sample space size is costly, since it requires more searching by the model. 

Thus choosing the best boundaries is more complicated than choosing a large range that is believed to contain the best point. 
Often, multiple iterations need to be done to shrink, shift, or expand the sample space to account for what the optimizer finds. 

---

## Results 

### Early Results 

Early results were promising.
In the case where it optimized for one toxicity profile, the optimizer found a prior that very closely resembled the actual toxicity curve it was optimizing for. 
A similar story was evident when optimizing for two profiles, with the prior resembling both curves utilizing the uncertainty of alpha to do so. 

### Three Profiles 

After several runs of the optimizer and needing to rescore, the case where CRM beat mTPI-2 (the best benchmark in this case) in accuracy was found. 
This resulted in a 3.93% increase in average accuracy, mainly coming from a tricky toxicity where the correct MTD could have been argued to be interpreted, so mTPI-2 was somewhat split on what to decide. 
However, there was a slight issue in the fact that MTD overshooting was slightly worse in the CRM model, an increased trade-off risk for getting higher accuracy. 
There may be a better prior that accounts for that, but since this was still a proof of concept, the project moved on to 5 profiles. 

### Five Profiles 

The initial run of this after achieving good results with three profiles, was good but not great.
The CRM won in some cases and did worse in others. 
Overall, it was very tight, but the CRM technically did 0.54% better than mTPI-2 on average. 
However, the overdosing issue still existed. 

I attempted several changes to the score function, but it seemed like any change made only decreased accuracy. 
At this point, I ran out of time and could not continue the project. 
Meaning that there was some success, but it was not the perfect solution. 

---

## Conclusion

This project was very interesting and far outside of my realm of knowledge before beginning. 
I learned a ton from this project, and was somewhat sad that it could not be continued. 
As for why I was not able to achieve a much better accuracy, I think that it is complicated. 
First off, I had to run this program on my old laptop overnight, so there was not much compute available for me to utilize. 
Running this on a beefy machine would have led to more evaluations and potentially finding a better point. 
There is an asterisk to this because I noticed from progress plots that at higher iterations, the boundary seeking problem was already very common even at the low iterations I was running. 

During my presentation, there were a few hypotheses given. 
One was that that the way FACTS models the CRM prior is actually not the best way. 
They mentioned someone else who had tried something that worked better, so that would definitely be worth looking into. 
Another idea was that algorithmic designs like mTPI-2 do worse for larger experiments, where there are more dose levels and possibly more patients. 
So, the benefit of CRM might be more prevalent there. 

---

## Future Endeavors

Unfortunately, I cannot continue my research because my internship has finished, but perhaps in the future I or someone else can look into it. 
However, if I did continue with the project, there are some things I would like to try. 

First, I would attempt to solve the boundary seeking problem using BOCK or a boundary penalty. 
Utilizing these requires that you know that near the bounds is not the best point, or you have a degenerate parameter. 
This would allow for a more thorough look at the space with potentially higher iterations. 

Another thing I would try is using a sparse GP model to save on compute. 
This prunes the points so we keep the inducing points, which helps when fitting GP which is O(n^3), where n is the number of points. 

After some of these issues are thoroughly tested, and a consistent method for scoring above mTPI-2 is found, then expanding the scope of the optimizer to work with other forms of CRM would be great. 
Since CRM is significantly more customizable in FACTS than the algorithmic models. 
Also it would be great to see an actual application for the optimizer on a trial design and hear feedback on it from a real trial designer. 
That would be the definitive result on how decent of a tool this thing is. 
