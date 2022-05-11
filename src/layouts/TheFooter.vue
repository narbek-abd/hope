<script setup></script>

<template>
	<footer class="footer">
		<div class="container">
			<p class="footer__copyright">
				© 2022 Designthemes. All Rights Reserved.
			</p>
		</div>
	</footer>
</template>

<style scoped lang="scss">
.footer {
	flex-shrink: 0;
	margin-top: 50px;
	background-color: var(--color-dark-blue);
	padding: 24px 0;

	@media only screen and (max-width: 992px) {
		padding-bottom: 74px;
	}
}
.footer__copyright {
	color: #fff;
}
</style>
