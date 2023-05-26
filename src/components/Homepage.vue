<template>
    <div class="h-screen bg-gray-200">
        <Header />
        <div class="bg-gray-200 p-6">
            <div class="container mx-auto">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="bg-white p-6 rounded-lg">
                        <h2 class="text-xl font-bold mb-4">Welcome to Neural Network Builder</h2>
                        <p class="text-gray-700">A powerful tool designed to simplify the process of building, training, and
                            evaluating neural network models. Here are some of our key features:</p>
                        <ul class="list-disc ml-5 mt-4">
                            <li class="mb-2">Choose from a variety of data sets and neural network models.</li>
                            <li class="mb-2">Easy-to-use interface for entering input and output data.</li>
                            <li class="mb-2">Keep track of the training process with our ETA timer and progress bar.</li>
                            <li>Comprehensive help section to guide you through the process.</li>
                        </ul>
                        <RouterLink to="/train" class="inline-block bg-blue-500 text-white py-2 px-4 rounded mt-4">Start Building</RouterLink>
                    </div>
                    <div class="bg-white p-6 rounded-lg">
                        <h2 class="text-xl font-bold mb-4">Why Neural Network Builder?</h2>
                        <p class="text-gray-700">Neural Network Builder is designed for both beginners and experienced
                            users. Our goal is to make neural network modeling accessible to everyone, regardless of their
                            coding skills or mathematical background. We also provide support and resources to help you get
                            started on your journey into the world of neural networks.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import Header from './Header.vue';

export default {
    name: 'Homepage',
    components: {
        Header
    }
}
</script>