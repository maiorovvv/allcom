import { FC, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/free-mode';
import 'swiper/scss/navigation';
import 'swiper/scss/thumbs';

import CloseIcon from '../../img/svg/crossSmall.svg?react';

interface ImagesProps {
	images: string[];
	onDelete?: (index: number) => void;
}

const INITIAL_ACTIVE_INDEX = 0;
const SPACE_BETWEEN_SLIDES = 10;
const SLIDES_PER_VIEW = 4;

const MediaSwiper: FC<ImagesProps> = ({ images, onDelete }) => {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const [activeIndex, setActiveIndex] = useState<number>(INITIAL_ACTIVE_INDEX);

	const handleDelete = (index: number): void => {
		if (onDelete) {
			onDelete(index);
		}
	};

	return (
		<div className="swiper_modal_window__container">
			<Swiper
				modules={[Navigation, Thumbs]}
				navigation={true}
				thumbs={{ swiper: thumbsSwiper }}
				onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
				className="swiper_modal_window__big_img"
			>
				{images.map((item) => (
					<SwiperSlide key={item} className="swiper_modal_window__big_img--items">
						<img src={item} className="swiper_modal_window__big_img--item" />
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
				{images.map((item, index) => {
					const classActiveThumb =
						index === activeIndex ? 'swiper_modal_window__thumbs--active-slide' : '';
					return (
						<SwiperSlide
							key={item}
							className={`swiper_modal_window__thumbs--item ${classActiveThumb}`}
						>
							<img src={item} className="swiper_modal_window__thumbs--small_img" />
							{onDelete && (
								<CloseIcon
									onClick={() => handleDelete(index)}
									className="swiper_modal_window__thumbs--delete"
								/>
							)}
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default MediaSwiper;
