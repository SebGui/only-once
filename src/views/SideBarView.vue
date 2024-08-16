<template>
    <section class="sidebarMain">
        <NameLogo :name="conf.title" class="nameLogo"/>
        
        <SideNav :options="conf.SideNav"/>
    </section>
</template>

<script setup lang="ts">
  import conf from '@/../onceConfig'
  import NameLogo from '@/components/NameLogo.vue';
  import SideNav from '@/components/SideNav.vue';

</script>

<style scoped>
.sidebarMain {
    height: 100vh;
    width: var(--sidebar-width);
}
.nameLogo {
    height: var(--topnav-height);
    display: flex;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    font-size: 24px;
}
</style>