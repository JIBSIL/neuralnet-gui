<template>
  <header class="text-black body-font bg-gray-300">
    <div class="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
      <a class="flex title-font font-medium items-center text-black mb-4 md:mb-0">
        <svg xmlns="http://www.w3.org/2000/svg" class="mx-1" width="28" height="32">
          <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a">
              <stop stop-color="#00BFFB" offset="0%" />
              <stop stop-color="#0270D7" offset="100%" />
            </linearGradient>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="b">
              <stop stop-color="#1F232A" stop-opacity=".48" offset="0%" />
              <stop stop-color="#1F2329" stop-opacity="0" offset="100%" />
            </linearGradient>
            <linearGradient x1="87.665%" y1="103.739%" x2="-3.169%" y2="38.807%" id="c">
              <stop stop-color="#FFF" stop-opacity="0" offset="0%" />
              <stop stop-color="#FFF" stop-opacity=".64" offset="100%" />
            </linearGradient>
            <linearGradient x1="-14.104%" y1="111.262%" x2="109.871%" y2="26.355%" id="d">
              <stop stop-color="#0270D7" offset="0%" />
              <stop stop-color="#0270D7" stop-opacity="0" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="none" fill-rule="evenodd">
            <path fill="url(#a)" transform="rotate(90 14 16)" d="M6 2l-8 13.999L6 30h16l8-14.001L22 2z" />
            <path fill="url(#b)" d="M14 0v32L0 24V8z" />
            <path fill="url(#c)" d="M28 24L0 8l14.001-8L28 8z" />
            <path fill-opacity=".48" fill="url(#d)" style="mix-blend-mode:multiply" d="M28 8L0 23.978V8l14.001-8L28 8z" />
          </g>
        </svg>
        <!-- <span class="ml-3 text-xl">Obit</span> -->
        <span class="ml-3 text-xl">NeuralNetwork</span>
      </a>
      <nav
        class="mt-4 bg-gray-300 md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700 flex flex-wrap items-center text-base justify-center">
        <RouterLink to="/" class="mr-5 hover:text-white">Home</RouterLink>
        <RouterLink to="/train" class="mr-5 hover:text-white">Train</RouterLink>
        <RouterLink to="/models" class="mr-5 hover:text-white">Models</RouterLink>
        <RouterLink to="/faq" class="mr-5 hover:text-white">FAQ</RouterLink>
      </nav>
      <!-- <RouterLink to="/logout">
        <button
          class="inline-flex items-center bg-gray-300 border-0 py-1 px-3 focus:outline-none hover:bg-gray-400 rounded text-base mt-4 md:mt-0">Log
          Out
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            class="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </RouterLink> -->
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>