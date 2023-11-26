<script setup lang="ts"></script>

<template>
	<Head>
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
		      rel="stylesheet">
	</Head>
	<NuxtLayout>
		<NuxtPage keepalive :page-key="route => route.fullPath"/>
	</NuxtLayout>
</template>

<style lang="scss">
body {
	@apply bg-gray-200;
}
</style>
