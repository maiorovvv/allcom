import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Spinner from '../../../components/Spinner/Spinner';
import SwiperProduct from '../../../components/Swiper/SwiperProduct/SwiperProduct';

import { getNameCategory } from '../../categories/utilsCategories';
import { loadProductById } from '../../products/productsSlice';
import { selectLoadingProductById, selectProductById } from '../../products/selectors';
import { selectCategories } from '../../categories/selectors';

import HeartIcon from '../../../img/svg/heart.svg?react';
import { ProductDto } from '../../../types/product/ProductApiResponse';
import Auction from './components/Auction';

const ProductDetails: FC = (): JSX.Element => {
	const locale = i18next.language;
	const { t } = useTranslation('product_details');

	const { productID } = useParams();

	const dispatch = useAppDispatch();

	const [isLoadProduct, setIsLoadProduct] = useState(false);

	const loading = useAppSelector(selectLoadingProductById);
	const product: ProductDto | null = useAppSelector(selectProductById);
	const categories = useAppSelector(selectCategories);

	const { name, description, color, weight, categoryId, imageLinks } = product;

	useEffect(() => {
		const fetchProduct = async (): Promise<void> => {
			await dispatch(loadProductById(Number(productID)));
			setIsLoadProduct(true);
		};
		fetchProduct();
	}, [productID]);

	if (loading)
		return (
			<div className="text-center">
				<Spinner />
			</div>
		);

	return (
		<>
			<section className="section--padding">
				<div className="product_details__container container">
					<div className="product_details__swiper">
						<SwiperProduct images={imageLinks} />
					</div>
					<div className="product_details">
						<h2 className="product_details__title">{name}</h2>
						<p>{description}</p>
						<div className="product_details__info">
							<div>
								<strong>{t('category')}:</strong>
								<span className="ms-3">{getNameCategory(categories, categoryId, locale)}</span>
							</div>
							<div className="mt-2 mb-2">
								<strong>{t('color')}:</strong>
								<span className="ms-3">{color}</span>
							</div>
							<div>
								<strong>{t('weight')}:</strong>
								<span className="ms-3">{weight} kg</span>
							</div>
						</div>
						{isLoadProduct && <Auction product={product} />}
						<a
							className="product_details__wishlist_icon"
							href="/user/my_account/products"
							title={t('wishlist')}
						>
							<HeartIcon />
							{t('add_to_wishlist')}
						</a>
					</div>
				</div>
			</section>
		</>
	);
};

export default ProductDetails;
