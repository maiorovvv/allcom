import { FC, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';

interface ImagesProps {
	images: string[];
}

const INITIAL_ACTIVE_INDEX = 0;
const SPACE_BETWEEN_SLIDES = 10;
const SLIDES_PER_VIEW = 4;

const SwiperModalWindow: FC<ImagesProps> = ({ images }) => {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const [activeIndex, setActiveIndex] = useState<number>(INITIAL_ACTIVE_INDEX);

	return (
		<div className="swiper_modal_window__container">
			<Swiper
				modules={[Navigation, Thumbs]}
				navigation={true}
				thumbs={{ swiper: thumbsSwiper }}
				onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
				className="swiper_modal_window__big_img"
			>
				{images.map((i) => (
					<SwiperSlide key={i} className="swiper_modal_window__big_img--items">
						<img src={i} className="swiper_modal_window__big_img--item" />
					</SwiperSlide>
				))}
			</Swiper>
			<Swiper
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				onSwiper={setThumbsSwiper}
				spaceBetween={SPACE_BETWEEN_SLIDES}
				slidesPerView={SLIDES_PER_VIEW}
				modules={[Navigation, Thumbs]}
				className="swiper_modal_window__thumbs"
			>
				{images.map((i, index) => {
					const classActiveThumb =
						index === activeIndex ? 'swiper_modal_window__thumbs--active-slide' : '';
					return (
						<SwiperSlide
							key={i}
							className={`swiper_modal_window__thumbs--item ${classActiveThumb}`}
						>
							<img src={i} className="swiper_modal_window__thumbs--small_img" />
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default SwiperModalWindow;
