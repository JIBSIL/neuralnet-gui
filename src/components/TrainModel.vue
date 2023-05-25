<template>
    <div class="container mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <div class="flex flex-col space-y-6 h-full">
                <DataSelection />
                <ModelSelection />
                <InputData />
                <TrainingProgress />
                <!-- Add other components here -->
            </div>
            <div class="flex flex-col space-y-6 h-full">
                <HelpAndInstructions />
                <Advertising />
                <FollowUs />
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import DataSelection from './DataSelection.vue';
  import ModelSelection from './ModelSelection.vue';
  import InputData from './InputData.vue';
  import TrainingProgress from './TrainingProgress.vue';
  import HelpAndInstructions from './HelpAndInstructions.vue';
  import Advertising from './Advertising.vue';
  import FollowUs from './FollowUs.vue';
  
  export default {
    components: {
        DataSelection,
        ModelSelection,
        InputData,
        TrainingProgress,
        HelpAndInstructions,
        Advertising,
        FollowUs,
    },
  }
  </script>
  