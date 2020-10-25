/* eslint-disable no-undef */
<template>
	<section class="section section-home">
		<div class="container">
			<div class="section-content">
				<div class="section-content-home">
					<div class="content-home-title">
						<div class="content-home-title__before">Привет, меня зовут</div>
						<h1 class="content-home-title__main">
							Якин<br /><span>Никита</span>
						</h1>
						<div class="content-home-title__after">
							и я
							<div class="text-carousel">
								<span ref="textCarouselElement">
									{{ textCarousel[0] }}
								</span>
							</div>
						</div>
					</div>
				</div>

				<div class="section-home-img">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1000"
						height="676.061"
						viewBox="0 0 1000 676.061"
					>
						<defs>
							<clipPath id="clip-path">
								<path
									d="M80.091,63.078,404.357,2.117A95.742,95.742,0,0,1,429.847.635l419.905,30.53c35.865,2.569,65.406,22.329,81.412,54.538l57.107,114.115c11.263,22.527,13.635,45.547,7.114,69.853l-74.2,278.323c-10.374,38.829-40.9,66.2-80.622,72.323l-354.6,54.835a94.194,94.194,0,0,1-50.092-5.236L181.56,573.979c-27.862-10.473-47.721-30.53-58-58.49L5.4,194.681c-10.473-28.356-8.1-56.91,6.817-83.092C27.133,85.308,50.45,68.709,80.091,63.078Z"
								/>
							</clipPath>
						</defs>
						<g id="main-foto-mask" clip-path="url(#clip-path)">
							<image :xlink:href="require('@images/IMG_0113.jpg')"></image>
						</g>
					</svg>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import TxtRotate from '../libs/TxtRotate';

export default defineComponent({
	setup() {
		const textCarouselElement = ref(null);
		const textCarousel = ['разработчик', 'фотограф', 'велосипедист'];

		// const textCarouseActive = ref<number>(0);
		// const interval = setInterval(() => {
		// 	const maxIndex = textCarousel.length - 1;
		// 	if (textCarouseActive.value + 1 > maxIndex) {
		// 		textCarouseActive.value = 0;
		// 	} else {
		// 		textCarouseActive.value += 1;
		// 	}
		// }, 5000);
		let txtRotate: TxtRotate;
		onMounted(() => {
			// Logs: `Headline`
			// eslint-disable-next-line no-new
			txtRotate = new TxtRotate(textCarouselElement.value, textCarousel, 500);
		});

		onBeforeUnmount(() => {
			txtRotate.destory();
		});
		// useBe
		return {
			textCarousel,
			textCarouselElement
			// textCarousel,
			// textCarouseActive
		};
	}
});
</script>

<style lang="scss">
.content-home-title {
	padding-top: 80px;
	&__before {
		font-weight: normal;
		font-size: 40px;
		line-height: 1;
		padding: 15px 0;
		color: var(--color-gray-3);
	}
	&__main {
		font-size: 170px;
		line-height: 140px;
		font-weight: bold;
		color: var(--main-color-text);
		position: relative;
		border-left: 6px solid var(--brand-color-4);
		padding-left: 20px;
		padding-top: 20px;
		left: 3px;
		& > span {
			left: -13px;
			position: relative;
		}
	}
	&__after {
		font-size: 40px;
		color: var(--color-gray-3);
		padding-left: 290px;
		display: flex;
		align-items: center;
		& > .text-carousel {
			display: block;
			overflow: hidden;
			height: 50px;
			margin-left: 10px;
			position: relative;
			// background: var(--brand-color);
			// color: var(--brand-color-invert);
			padding: 5px 0px;
			line-height: 1;
			display: inline-block;
			& > span {
				color: var(--brand-color);
				// text-align: center;
			}
		}
	}
}
.section-home {
	.section-title-home {
	}
}
.section-content {
	min-height: 800px;
	max-height: calc(100vh - 80px);
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	// align-items: center;
	padding: 50px 0;
	justify-content: space-between;

	.section-home-img {
		svg {
			filter: drop-shadow(10px 10px 20px rgba(0, 0, 0, 0.05));
			max-width: 900px;
			image {
				width: 100%;
			}
		}
		// filter: drop-shadow(-1px 6px 20px rgba(50, 50, 0, 0.2));
	}
}
.component-fade-enter-active,
.component-fade-leave-active {
	transition: all 0.1s cubic-bezier(0.62, -0.26, 0.74, 0.05);
}
/* .component-fade-leave-active до версии 2.1.8 */
.component-fade-enter,
.component-fade-leave-to {
	opacity: 0;
}

.list-item {
}
.list-enter-active,
.list-leave-active {
	transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
	opacity: 0;
	transform: translateY(-100%);
}
</style>
