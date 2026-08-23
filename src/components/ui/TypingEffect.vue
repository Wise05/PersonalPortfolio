<template>
  <div class="inline-flex items-center font-mono font-bold">
    <span class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl light:text-zinc-950">
      {{ displayText }}
    </span>
    <span 
      class="text-4xl sm:text-5xl inline-block ml-1 tracking-tight text-slate-500 leading-none"
      :class="isTyping ? 'opacity-100' : 'animate-[blink_0.8s_infinite]'"
    >|</span>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  words: {
    type: Array,
    default: () => ['Hello!', 'I am a...', 'Software Engineer', 'Iowa State Student', 'Berry Consultants Intern', 'Linux Lover', 'SWE Intern', 'Aspiring Developer', 'vim user btw', 'Climber', 'Java enjoyer']
  },
  typeSpeed: {
    type: Number,
    default: 100
  },
  eraseSpeed: {
    type: Number,
    default: 50
  },
  delay: {
    type: Number,
    default: 1500
  }
})

const displayText = ref('')
const currentWordIndex = ref(0)
const isTyping = ref(false)
let timeoutId = null

const typeWord = async () => {
  const currentWord = props.words[currentWordIndex.value]
  isTyping.value = true
  
  // Type
  for (let i = 0; i <= currentWord.length; i++) {
    displayText.value = currentWord.substring(0, i)
    await new Promise(resolve => {
      timeoutId = setTimeout(resolve, props.typeSpeed)
    })
  }
  
  isTyping.value = false
  
  // Pause
  await new Promise(resolve => {
    timeoutId = setTimeout(resolve, props.delay)
  })
  
  // Erase
  for (let i = currentWord.length; i >= 0; i--) {
    displayText.value = currentWord.substring(0, i)
    await new Promise(resolve => {
      timeoutId = setTimeout(resolve, props.eraseSpeed)
    })
  }

  currentWordIndex.value = (currentWordIndex.value + 1) % props.words.length
  timeoutId = setTimeout(typeWord, 500)
}

onMounted(() => {
  typeWord()
})

onUnmounted(() => {
  clearTimeout(timeoutId)
})
</script>

<style>
/* 
  Tailwind doesn't include a 'blink' keyframe out of the box, 
  so we add this small utility to your global styles or inside the file.
*/
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
