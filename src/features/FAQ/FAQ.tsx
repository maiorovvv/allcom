import * as React from 'react';
import { useTranslation } from 'react-i18next';

const FAQPage: React.FC = () => {
	const { t } = useTranslation('faq');
	const [visibleQuestion, setVisibleQuestion] = React.useState<number | null>(null);

	const handleQuestionClick = (index: number): void => {
		setVisibleQuestion((prev) => (prev === index ? null : index));
	};

	const faqData = [
		{
			question: t('question_1'),
			answer: t('answer_1'),
		},
		{
			question: t('question_2'),
			answer: t('answer_2'),
		},
		{
			question: t('question_3'),
			answer: t('answer_3'),
		},
		{
			question: t('question_4'),
			answer: t('answer_4'),
		},
		{
			question: t('question_5'),
			answer: t('answer_5'),
		},
		{
			question: t('question_6'),
			answer: t('answer_6'),
		},
		{
			question: t('question_7'),
			answer: t('answer_7'),
		},
		{
			question: t('question_8'),
			answer: t('answer_8'),
		},
		{
			question: t('question_9'),
			answer: t('answer_9'),
		},
		{
			question: t('question_10'),
			answer: t('answer_10'),
		},
		{
			question: t('question_11'),
			answer: t('answer_11'),
		},
		{
			question: t('question_12'),
			answer: t('answer_12'),
		},

		{
			question: t('question_13'),
			answer: t('answer_13'),
		},
		{
			question: t('question_14'),
			answer: t('answer_14'),
		},
		{
			question: t('question_15'),
			answer: t('answer_15'),
		},
		{
			question: t('question_16'),
			answer: (
				<div>
					<p>{t('answer_16_1')}</p>
					<table className="bietschritte-table">
						<thead>
							<tr>
								<th>{t('answer_16_2')}</th>
								<th>{t('answer_16_3')}</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>0,00 €</td>
								<td>5,00 €</td>
							</tr>
							<tr>
								<td>100,00 €</td>
								<td>10,00 €</td>
							</tr>
							<tr>
								<td>1000,00 €</td>
								<td>50,00 €</td>
							</tr>
							<tr>
								<td>10000,00 € </td>
								<td>100,00 €</td>
							</tr>
						</tbody>
					</table>
				</div>
			),
		},
	];

	return (
		<div className="faq-container">
			<h1>{t('faq')}</h1>
			{faqData.map((item, index) => (
				<div key={index}>
					<div
						className={`faq-question ${visibleQuestion === index ? 'expanded' : ''}`}
						onClick={() => handleQuestionClick(index)}
					>
						{item.question}
					</div>
					{visibleQuestion === index && <div className="faq-answer">{item.answer}</div>}
				</div>
			))}
		</div>
	);
};

export default FAQPage;
