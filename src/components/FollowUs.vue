<template>
    <div class="mt-10 bg-white p-6 rounded-lg">
        <h2 class="text-xl font-bold mb-4">Follow Us</h2>
        <div class="space-x-4">
            <a href="https://t.me/your_username" target="_blank"><font-awesome-icon :icon="['fab', 'telegram']"
                    class="fa-2x"
                    style="color: #29a9ea;" /></a>
            <a href="https://discord.com/users/your_username" target="_blank"><font-awesome-icon :icon="['fab', 'discord']"
                    class="fa-2x" 
                    style="color: #5865F2;" /></a>
            <a href="https://twitter.com/your_username" target="_blank"><font-awesome-icon :icon="['fab', 'twitter']"
                    class="fa-2x" 
                    style="color: #1d9bf0;" /></a>
            <a href="https://www.reddit.com/user/your_username" target="_blank"><font-awesome-icon :icon="['fab', 'reddit']"
                    class="fa-2x" 
                    style="color: #ff4300;" /></a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FollowUs',
}
</script>