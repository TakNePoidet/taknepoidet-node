<template>
	<div>
		<section class="section section-home">
			<div class="container">
				<div class="section-content">
					<div class="section-content-home">
						<div class="content-home-title">
							<div class="content-home-title__before">Привет, меня зовут</div>
							<h1 class="content-home-title__main">Якин <span>Никита</span></h1>
							<div class="content-home-title__after">
								и я
								<div class="text-carousel">
									<span ref="textCarouselElement">
										{{ textCarousel[0] }}
									</span>
								</div>
							</div>
						</div>
						<div class="section-home-img">
							<svg xmlns="http://www.w3.org/2000/svg" height="0">
								<clipPath id="clip-path">
									<path
										d="M7.087,6.391,39.514.53A9.951,9.951,0,0,1,42.063.387L84.054,3.323a9.655,9.655,0,0,1,8.141,5.243l5.711,10.971a8.844,8.844,0,0,1,.711,6.716L91.2,53.011a9.6,9.6,0,0,1-8.062,6.953l-35.46,5.272a9.772,9.772,0,0,1-5.009-.5L17.234,55.509a9.4,9.4,0,0,1-5.8-5.623L-.382,19.043A8.888,8.888,0,0,1,.3,11.055,9.615,9.615,0,0,1,7.087,6.391Z"
									/>
								</clipPath>
							</svg>
							<picture>
								<img :src="require('@images/h84PVxFeA7k.jpg')" alt="" />
							</picture>
						</div>
					</div>
				</div>
			</div>
			<div class="section-home-img-mob">
				<picture>
					<img :src="require('@images/h84PVxFeA7k.jpg')" alt="" />
				</picture>
			</div>
		</section>

		<section class="section section-social">
			<div class="container">
				<h3 class="section-title">Где можно со мной связаться</h3>
				<div class="section-content">
					<div
						v-for="(group, keyGroup) in socialList"
						:key="keyGroup"
						class="social-group"
					>
						<h4>
							<span>{{ group.title }}</span>
						</h4>
						<ul>
							<li
								v-for="item in group.items"
								:key="item.key"
								:class="['social-item-link', `social-item-link--${item.key}`]"
							>
								<a :href="item.link" target="_blank">
									<div v-if="item.icon" class="social-item-link__icon">
										<svg width="40" height="40">
											<use
												:xlink:href="`${require('@images/sprite.svg')}#superellipse-${
													item.key
												}`"
											></use>
										</svg>
									</div>
									<div class="social-item-link__content">
										<div class="social-item-link__name">
											<b>{{ item.name }}</b>
										</div>
										<div class="social-item-link__nik">
											<b>{{ item.nik }}</b>
										</div>
									</div></a
								>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import { MethodApiSocialGetAll, ModelSocialItem, parallel } from '../libs/Api';
import TxtRotate from '../libs/TxtRotate';

const iconsMediaLink = [
	'facebook',
	'github',
	'instagram',
	'telegram',
	'vk',
	'whatsapp'
];

interface SocialItem extends ModelSocialItem {
	icon: boolean;
}
export default defineComponent({
	async setup() {
		const textCarouselElement = ref(null);
		const textCarousel = ['разработчик', 'фотограф', 'велосипедист'];

		let txtRotate: TxtRotate;
		onMounted(() => {
			txtRotate = new TxtRotate(textCarouselElement.value, textCarousel, 2000);
		});
		onBeforeUnmount(() => {
			txtRotate.destory();
		});
		const result = await parallel<{
			socialList: MethodApiSocialGetAll;
		}>({
			socialList: ['social.getAll', { count: 1 }]
		});

		const socialList = ref<
			Record<
				string,
				{
					title: string;
					items: SocialItem[];
				}
			>
		>({});

		if (result.socialList.response === 'ok') {
			const groupTitle = {
				work: 'Работа',
				social: 'Социальные сети',
				messenger: 'Мессенджеры',
				email: 'Почта'
			};
			socialList.value = result.socialList.items.reduce(
				(accumulator, currentValue) => {
					currentValue.types.forEach((type) => {
						if (!accumulator[type]) {
							accumulator[type] = {
								title: groupTitle[type],
								items: []
							};
						}
						(currentValue as SocialItem).icon = iconsMediaLink.includes(
							currentValue.key
						);

						accumulator[type].items.push(currentValue);
					});
					return accumulator;
				},
				{}
			);
		}

		return {
			textCarousel,
			textCarouselElement,
			socialList
		};
	}
});
</script>

<style lang="scss">
@import '@style/pages/home';
</style>
