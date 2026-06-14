<template>
  <div class="starfield-container">
    <vue-particles id="tsparticles" :options="starOptions" />
    
    <div class="site-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
const starOptions = {
  // Deep space background color
  background: {
    color: {
      value: '#000000' 
    }
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      // Makes stars gently push away or react when mouse moves
      onHover: {
        enable: true,
        mode: 'bubble'
      }
    },
    modes: {
      bubble: {
        distance: 100,
        duration: 2,
        opacity: 0.8,
        size: 3
      },
    repulse: {
        distance: 60,
        duration: 0.4,
        factor: 50,  
        speed: 1,     
        maxSpeed: 25
      }
    }
  },
  particles: {
    // Star color
    color: {
      value: '#ffffff'
    },
    // Gentle floating movement
    move: {
      enable: true,
      direction: 'none',
      random: true,
      speed: 0.5, // Keep it slow and elegant
      straight: false,
      outModes: {
        default: 'out' // Stars re-enter from the opposite side when they leave
      }
    },
    number: {
      density: {
        enable: true,
        area: 800 // Controls how crowded the sky is
      },
      value: 120
    },
    // Star opacity and twinkling effect
    opacity: {
      value: { min: 0.2, max: 0.8 },
      animation: {
        enable: true,
        speed: 1,
        sync: false
      }
    },
    // Random sizes give a 3D depth effect (distant vs close stars)
    size: {
      value: { min: 0.5, max: 2 },
      animation: {
        enable: true,
        speed: 2,
        sync: false
      }
    }
  },
  detectRetina: true
};
</script>

<style scoped>
.starfield-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #0a0a16; /* Fallback deep space background color */
  z-index: 0; /* Establishes a stacking context for children */
}

#tsparticles {
  position: fixed; /* Stays fixed while user scrolls */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Pushes behind everything */
  pointer-events: none; /* Allows clicking buttons through the canvas */
}

.site-content {
  position: relative;
  z-index: 1;
}
</style>
