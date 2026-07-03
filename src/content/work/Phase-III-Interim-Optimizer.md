---
title: "Using Bayesian Optimization on CRM Prior"
description: "Experiment with bayesian optimization as a viable method for easily determine the best parameters for CRM prior skeleton."
company: "Berry Consultants"
date: "2026-06-14"
tags: ["Python", "Machine Learning", "BoTorch"]
featured: false
---

# Phase I/III CRM Prior Skeleton Optimizer

> **Note:** This project is actively in development and is scheduled to be finalized in late August 2026 at the conclusion of my software engineering internship.
>
> **Project Scope:** Evaluating Bayesian Optimization as a highly efficient, algorithmic method for determining optimal parameter configurations for CRM skeletal priors within the FACTS platform.

In adaptive clinical trial design, the Continual Reassessment Method (CRM) relies heavily on a "skeletal prior"—a baseline probability curve representing the anticipated true toxicity rates across various dose levels. This project involves building a dedicated **Bayesian Optimizer** integrated with the FACTS simulator to dynamically discover the optimal hyper-parameters (such as $\alpha$, $\beta$, $\rho$, and their corresponding standard deviations) for this prior skeleton, given a diverse set of target toxicity profiles.

## The Optimization Engine

From a pure data dimensionality perspective, the optimization space is tightly constrained but computationally intensive:
* **The Search Space:** The algorithm actively tunes one to three continuous parameters simultaneously ($\alpha$, $\beta$, $\rho$), adjusting boundaries to narrow down the target variability.
* **The Objective Function (The Weight):** The optimizer evaluates the "fitness" of a given parameter combination based on a composite scoring metric. This weight functions as a balance between two competing clinical priorities:
  1. **Accuracy:** Maximizing the statistical probability of correctly identifying the true Maximum Tolerated Dose (MTD).
  2. **Patient Safety:** Minimizing the number of simulated patients exposed to unacceptably high toxicities during the trial.

Because running a full trial simulation to evaluate a single parameter set is computationally expensive, treating this as a **black-box optimization problem** via Bayesian networks allows us to find the global optimum with drastically fewer evaluation steps compared to traditional brute-force grid searches.

---

## Current Status & R&D Roadmap

As the project is currently in its initial research and prototyping phase, our efforts are focused on baseline algorithm selection and integration architecture. The trajectory for the remainder of the summer focuses on three core milestones:

1. **Pipeline Integration**: Finalizing the bridge between the optimization loop and the FACTS core execution engine to automate the simulation-evaluation cycle.
2. **Fitness Curve Tuning**: Calibrating the objective function's weights to ensure the optimizer consistently aligns with clinical safety guidelines and statistical power requirements.
3. **Performance Benchmarking**: Stress-testing the optimizer across multi-core server environments. 

## Conclusion & Business Impact

If this optimization workflow proves viable, it has the potential to move from a prototype to a core production feature within the FACTS ecosystem. Instead of a trial designer spending days manually guessing, testing, and fine-tuning skeletal priors, they could configure their toxicity profiles, push the job to a server overnight, and wake up to a mathematically optimized, safety-bounded trial design.
