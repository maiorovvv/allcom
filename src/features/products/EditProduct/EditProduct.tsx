import { FC, ChangeEvent, useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';

import { ProductValidationSchema, initialValues } from '../../../forms/ProductForm';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { loadProductById, resetError, updateProduct } from '../productsSlice';
import { selectError, selectLoadingProductById, selectProductById } from '../selectors';
import ProductFields from '../ProductFields/ProductFields';
import { ProductFormValues } from '../../../types/product/ProductFormValues';
import resizeAndCompressImage from '../../../components/utils/imageResizer';

const EditProduct: FC = () => {
	const { productId } = useParams();
	const dispatch = useAppDispatch();
	const loading = useAppSelector(selectLoadingProductById);
	const error = useAppSelector(selectError);
	const product = useAppSelector(selectProductById);
	const {
		name,
		description,
		categoryId,
		color,
		weight,
		imageLinks,
		lastCreatedAuction: { id: auctionId, startPrice, startAt, currentPlannedEndAt },
		storage: { id: storageId, area, rack, section, shelf },
	} = product;

	const [files, setFiles] = useState<File[]>([]);
	const [resizingError, setResizingError] = useState<string | undefined>(error);
	const [isFileLoading, setIsFileLoading] = useState<boolean>(false);
	const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);
	const [currentImageLinks, setCurrentImageLinks] = useState<string[]>([]);

	useEffect(() => {
		dispatch(loadProductById(Number(productId)));
	}, [dispatch, productId]);

	useEffect(() => {
		setCurrentImageLinks(product.imageLinks || []);
	}, [loading, product]);

	const handleImagesChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
		if (event.target.files) {
			setIsFileLoading(true);
			const newFileList = Array.from(event.target.files);
			const allFiles = [...files];

			for (const newFile of newFileList) {
				if (!allFiles.some((file) => file.name === newFile.name && file.size === newFile.size)) {
					try {
						const resizedFile = await resizeAndCompressImage({
							file: newFile,
							maxWidth: 1600,
							maxHeight: 1200,
							maxSizeMB: 3,
						});
						allFiles.push(resizedFile);
					} catch (e) {
						if (e instanceof Error) {
							setResizingError(`Error resizing file ${newFile.name}: ${e.message}`);
						} else {
							setResizingError(`Error resizing file ${newFile.name}`);
						}
					}
				}
			}

			setFiles(allFiles);
			const fileLinkList = allFiles.map((file) => URL.createObjectURL(file));
			const filteredImageLinks = [...fileLinkList, ...currentImageLinks].filter(
				(link) => !imagesToRemove.includes(link)
			);
			setCurrentImageLinks(filteredImageLinks);
			setIsFileLoading(false);
		}
	};

	const handleSave = async (formValues: ProductFormValues): Promise<void> => {
		formValues.imagesToRemove = imagesToRemove;
		formValues.images = files;
		const dispatchResult = await dispatch(updateProduct({ ...formValues, id: Number(productId) }));
		if (updateProduct.fulfilled.match(dispatchResult)) {
			dispatch(resetError());
			dispatch(loadProductById(Number(productId)));
		}
	};

	const formInitialValues = useMemo(() => {
		return initialValues(
			startAt,
			currentPlannedEndAt,
			startPrice,
			auctionId,
			Number(productId),
			name,
			description,
			weight,
			color,
			categoryId,
			imageLinks,
			storageId,
			area,
			rack,
			section,
			shelf
		);
	}, [loading]);

	const handleDeleteImage = (index: number): void => {
		if (files.length - 1 <= index) {
			if (imageLinks.includes(currentImageLinks[index])) {
				setImagesToRemove([...imagesToRemove, currentImageLinks[index]]);
			}
			setCurrentImageLinks(currentImageLinks.filter((_, fileIndex) => fileIndex !== index));
		} else {
			const updatedFiles = files.filter((_, fileIndex) => fileIndex !== index);
			setFiles(updatedFiles);
		}
	};

	return (
		<div>
			<Formik
				initialValues={formInitialValues}
				validationSchema={ProductValidationSchema}
				enableReinitialize={true}
				onSubmit={(formValues, { setSubmitting }) => {
					handleSave(formValues).finally(() => setSubmitting(false));
				}}
			>
				{({ handleSubmit, values, handleChange, setFieldValue }) => (
					<>
						<Form onSubmit={handleSubmit}>
							<ProductFields
								onFileChange={handleImagesChange}
								linkList={currentImageLinks}
								values={values}
								handleChange={handleChange}
								onDeleteImage={handleDeleteImage}
								setFieldValue={setFieldValue}
								resizingError={resizingError}
								loadingImage={isFileLoading}
								loading={loading}
								submitButtonName="save"
							/>
						</Form>
					</>
				)}
			</Formik>
			{error && <div className="warning_message--validation">{error}</div>}
		</div>
	);
};

export default EditProduct;
