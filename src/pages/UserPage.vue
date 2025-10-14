<template>
    <div>
        <header class="relative">
            <IconHeader />
            <div class="nav">
                <NavBar />
            </div>
        </header>

        <main>
            <router-view />
        </main>

        <footer class="footer">
            <WebFooter />
        </footer>
    </div>
</template>

<script setup>
import IconHeader from '@/components/IconHeader.vue'
import NavBar from '@/components/NavBar.vue'
import WebFooter from '@/components/WebFooter.vue'
</script>

<style scoped>
.nav {
    position: absolute;
    bottom: -40px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: calc(100% - 240px);
    z-index: 9999;
}
</style>
