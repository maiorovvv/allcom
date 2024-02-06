import * as React from 'react';

interface Section {
	question: string;
	answer: React.ReactNode;
}

const PrivacyPolicy: React.FC = () => {
	const [visibleSection, setVisibleSection] = React.useState<number | null>(null);

	const handleSectionClick = (index: number): void => {
		setVisibleSection((prev) => (prev === index ? null : index));
	};

	const privacyPolicyData: Section[] = [
		{
			question:
				'Name und Kontaktdaten des für die Verarbeitung Verantwortlichen sowie des betrieblichen Datenschutzbeauftragten',
			answer: (
				<ul className=".ul-privacy-policy">
					<li>
						Diese Datenschutz-Information gilt für die Datenverarbeitung durch: Allcom
						Wilhelminenhofstraße 93, 12459 Berlin
					</li>
					<li>
						Tel.: 0162 00 154 / Fax: 0162 00 154 /
						<a href="http://allcom.itvm.com.ua:5173/" className="policy-link-color">
							E-Mail: kontakt@allcom.de
						</a>
					</li>
					<li>
						Beauftragter für den Datenschutz: Semen Semenych. Wilhelminenhofstraße 93,12459.Berlin
					</li>
				</ul>
			),
		},
		{
			question:
				'Erhebung und Speicherung personenbezogener Daten sowie Art und Zweck von deren Verwendung',
			answer: (
				<ul className=".ul-privacy-policy">
					<li>a. Beim Besuch der Website Beim Aufrufen unserer Website:</li>
					<li>
						<a href="http://allcom.itvm.com.ua:5173/" className="policy-link-color">
							https://www.Allcom.de
						</a>
					</li>
					<li>
						werden durch den auf Ihrem Endgerät zum Einsatz kommenden Browser automatisch
						Informationen an den Server unserer Website gesendet.
					</li>
					<li>Diese Informationen werden temporär in einem sog. Logfile gespeichert.</li>
					<li>
						Folgende Informationen werden dabei ohne Ihr Zutun erfasst und bis zur automatisierten
						Löschung gespeichert:
					</li>
					<li>• IP-Adresse des anfragenden Rechners,</li>
					<li>• Datum und Uhrzeit des Zugriffs,</li>
					<li>• Name und URL der abgerufenen Datei,</li>
					<li>• Website, von der aus der Zugriff erfolgt (Referrer-URL),</li>
					<li>
						• verwendeter Browser und ggf. das Betriebssystem Ihres Rechners sowie der Name Ihres
						Access- Providers. Die genannten Daten werden durch uns zu folgenden Zwecken
						verarbeitet:
					</li>
					<li>• Gewährleistung eines reibungslosen Verbindungsaufbaus der Website,</li>
					<li>• Gewährleistung einer komfortablen Nutzung unserer Website,</li>
					<li>• Auswertung der Systemsicherheit und -stabilität sowie,</li>
					<li>
						• zu weiteren administrativen Zwecken. Die Rechtsgrundlage für die Datenverarbeitung ist
						Art. 6 Abs. 1 S. 1 lit. f DSGVO.
					</li>
					<li>
						Unser berechtigtes Interesse folgt aus oben aufgelisteten Zwecken zur Datenerhebung.
					</li>
					<li>
						In keinem Fall verwenden wir die erhobenen Daten zu dem Zweck, Rückschlüsse auf Ihre
						Person zu ziehen. Darüber hinaus setzen wir beim Besuch unserer Website Cookies sowie
						Analysedienste ein. Nähere Erläuterungen dazu erhalten Sie unter den Ziff. 4 und 5
						dieser Datenschutzerklärung.
					</li>

					<li>
						b. Bei Anmeldung für unseren Newsletter Sofern Sie nach Art. 6 Abs. 1 S. 1 lit. a DSGVO
					</li>
					<li>
						ausdrücklich eingewilligt haben, verwenden wir Ihre EMail- Adresse dafür, Ihnen
						regelmäßig unseren Newsletter zu übersenden. Für den Empfang des Newsletters ist die
						Angabe einer E-Mail-Adresse ausreichend.
					</li>
					<li>
						Die Abmeldung ist jederzeit möglich, zum Beispiel über einen Link am Ende eines jeden
						Newsletters. Alternativ können Sie Ihren Abmeldewunsch gerne auch jederzeit an
						info@allcom.de per E-Mail senden.
					</li>

					<li>
						c. Bei Nutzung unseres Kontaktformulars Bei Fragen jeglicher Art bieten wir Ihnen die
						Möglichkeit, mit uns über ein auf der Website bereitgestelltes Formular Kontakt
						aufzunehmen.
					</li>
					<li>
						Dabei ist die Angabe einer gültigen E-Mail-Adresse erforderlich, damit wir wissen, von
						wem die Anfrage stammt und um diese beantworten zu können. Weitere Angaben können
						freiwillig getätigt werden.
					</li>
					<li>
						Die Datenverarbeitung zum Zwecke der Kontaktaufnahme mit uns erfolgt nach Art. 6 Abs. 1
						S. 1 lit. a DSGVO auf Grundlage Ihrer freiwillig erteilten Einwilligung.
					</li>
					<li>
						Die für die Benutzung des Kontaktformulars von uns erhobenen personenbezogenen Daten
						werden nach Erledigung der von Ihnen gestellten Anfrage automatisch gelöscht.
					</li>
				</ul>
			),
		},
		{
			question: 'Weitergabe von Daten',
			answer: (
				<ul className=".ul-privacy-policy">
					<li>
						Eine Übermittlung Ihrer persönlichen Daten an Dritte zu anderen als den im Folgenden
						aufgeführten Zwecken findet nicht statt. Wir geben Ihre persönlichen Daten nur an Dritte
						weiter, wenn:
					</li>
					<li>
						• Sie Ihre nach Art. 6 Abs. 1 S. 1 lit. a DSGVO ausdrückliche Einwilligung dazu erteilt
						haben,
					</li>
					<li>
						• die Weitergabe nach Art. 6 Abs. 1 S. 1 lit. f DSGVO zur Geltendmachung und Ausübung
						Ihrer Ansprüche und Rechte im Rahmen der Auktion notwendig ist und kein Grund zur
						Annahme besteht, dass Sie ein überwiegendes schutzwürdiges Interesse an der
						Nichtweitergabe Ihrer Daten haben,
					</li>
					<li>
						• für den Fall, dass für die Weitergabe nach Art. 6 Abs. 1 S. 1 lit. c DSGVO eine
						gesetzliche Verpflichtung besteht, sowie
					</li>
					<li>
						• dies gesetzlich zulässig und nach Art. 6 Abs. 1 S. 1 lit. b DSGVO für die Abwicklung
						von Vertragsverhältnissen mit Ihnen erforderlich ist.
					</li>
				</ul>
			),
		},
		{
			question: 'Cookies',
			answer: (
				<ul className=".ul-privacy-policy">
					<li>
						Wir setzen auf unserer Seite Cookies ein. Hierbei handelt es sich um kleine Dateien, die
						Ihr Browser automatisch erstellt und die auf Ihrem Endgerät (Laptop, Tablet, Smartphone
						o.ä.) gespeichert werden, wenn Sie unsere Seite besuchen.
					</li>
					<li>
						Cookies richten auf Ihrem Endgerät keinen Schaden an, enthalten keine Viren, Trojaner
						oder sonstige Schadsoftware. In dem Cookie werden Informationen abgelegt, die sich
						jeweils im Zusammenhang mit dem spezifisch eingesetzten Endgerät ergeben.
					</li>
					<li>
						Dies bedeutet jedoch nicht, dass wir dadurch unmittelbar Kenntnis von Ihrer Identität
						erhalten. Der Einsatz von Cookies dient einerseits dazu, die Nutzung unseres Angebots
						für Sie angenehmer zu gestalten. So setzen wir sogenannte Session-Cookies ein, um zu
						erkennen, dass Sie einzelne Seiten unserer Website bereits besucht haben.
					</li>
					<li>Diese werden nach Verlassen unserer Seite automatisch gelöscht.</li>
					<li>
						Darüber hinaus setzen wir ebenfalls zur Optimierung der Benutzerfreundlichkeit temporäre
						Cookies ein, die für einen bestimmten festgelegten Zeitraum auf Ihrem Endgerät
						gespeichert werden.
					</li>
					<li>
						Besuchen Sie unsere Seite erneut, um unsere Dienste in Anspruch zu nehmen, wird
						automatisch erkannt, dass Sie bereits bei uns waren und welche Eingaben und
						Einstellungen sie getätigt haben, um diese nicht noch einmal eingeben zu müssen.
					</li>
					<li>
						Zum anderen setzten wir Cookies ein, um die Nutzung unserer Website statistisch zu
						erfassen und zum Zwecke der Optimierung unseres Angebotes für Sie auszuwerten (siehe
						Ziff. 5).
					</li>
					<li>
						Diese Cookies ermöglichen es uns, bei einem erneuten Besuch unserer Seite automatisch zu
						erkennen, dass Sie bereits bei uns waren.
					</li>
					<li>
						Diese Cookies werden nach einer jeweils definierten Zeit automatisch gelöscht. Die durch
						Cookies verarbeiteten Daten sind für die genannten Zwecke zur Wahrung unserer
						berechtigten Interessen sowie der Dritter nach Art.
					</li>
					<li>
						6 Abs. 1 S. 1 lit. f DSGVO erforderlich. Die meisten Browser akzeptieren Cookies
						automatisch.
					</li>
					<li>
						Sie können Ihren Browser jedoch so konfigurieren, dass keine Cookies auf Ihrem Computer
						gespeichert werden oder stets ein Hinweis erscheint, bevor ein neuer Cookie angelegt
						wird.
					</li>
					<li>
						Die vollständige Deaktivierung von Cookies kann jedoch dazu führen, dass Sie nicht alle
						Funktionen unserer Website nutzen können.
					</li>
				</ul>
			),
		},
		{
			question: 'Analyse-Tools',
			answer: (
				<ul className=".ul-privacy-policy">
					<li>
						a. Tracking-Tools Die im Folgenden aufgeführten und von uns eingesetzten
						Tracking-Maßnahmen werden auf Grundlage des Art. 6 Abs. 1 S. 1 lit. f DSGVO
						durchgeführt.
					</li>
					<li>
						Mit den zum Einsatz kommenden Tracking-Maßnahmen wollen wir eine bedarfsgerechte
						Gestaltung und die fortlaufende Optimierung unserer Webseite sicherstellen.
					</li>
					<li>
						Zum anderen setzen wir die Tracking-Maßnahmen ein, um die Nutzung unserer Webseite
						statistisch zu erfassen und zum Zwecke der Optimierung unseres Angebotes für Sie
						auszuwerten.
					</li>
					<li>
						Diese Interessen sind als berechtigt im Sinne der vorgenannten Vorschrift anzusehen.
					</li>
					<li>
						Die jeweiligen Datenverarbeitungszwecke und Datenkategorien sind aus den entsprechenden
						Tracking-Tools zu entnehmen.
					</li>
					<li>
						b. Google Analytics: Zum Zwecke der bedarfsgerechten Gestaltung und fortlaufenden
						Optimierung unserer Seiten nutzen wir Google Analytics, ein Webanalysedienst der Google
						Inc.
					</li>
					<li>
						<a
							href="https://policies.google.com/privacy?hl=de-DE&fg=1"
							className="policy-link-color"
						>
							https://www.google.de/
						</a>
					</li>
					<li>
						(1600 Amphitheatre Parkway, Mountain View, CA 94043, USA; im Folgenden „Google“). In
						diesem Zusammenhang werden pseudonymisierte Nutzungsprofile erstellt und Cookies (siehe
						unter Ziff. 4) verwendet. Die durch den Cookie erzeugten Informationen über Ihre
						Benutzung dieser Website wie
					</li>
					<li>• Browser-Typ/-Version,</li>
					<li>• verwendetes Betriebssystem,</li>
					<li>• Referrer-URL (die zuvor besuchte Seite),</li>
					<li>• Hostname des zugreifenden Rechners (IP-Adresse),</li>
					<li>
						• Uhrzeit der Serveranfrage, werden an einen Server von Google in den USA übertragen und
						dort gespeichert.
					</li>
					<li>
						Die Informationen werden verwendet, um die Nutzung der Website auszuwerten, um Reports
						über die Websiteaktivitäten zusammenzustellen und um weitere mit der Websitenutzung und
						der Internetnutzung verbundene Dienstleistungen zu Zwecken der Marktforschung und
						bedarfsgerechten Gestaltung dieser Internetseiten zu erbringen.
					</li>
					<li>
						Auch werden diese Informationen gegebenenfalls an Dritte übertragen, sofern dies
						gesetzlich vorgeschrieben ist oder soweit Dritte diese Daten im Auftrag verarbeiten.
					</li>
					<li>
						Es wird in keinem Fall Ihre IP-Adresse mit anderen Daten von Google zusammengeführt.
					</li>
					<li>
						Die IP-Adressen werden anonymisiert, so dass eine Zuordnung nicht möglich ist
						(IP-Masking).
					</li>
					<li>
						Sie können die Installation der Cookies durch eine entsprechende Einstellung der
						Browser-Software verhindern; wir weisen jedoch darauf hin, dass in diesem Fall
						gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich genutzt werden
						können.
					</li>
					<li>
						Sie können darüber hinaus die Erfassung der durch das Cookie erzeugten und auf Ihre
						Nutzung der Website bezogenen Daten (inkl. Ihrer IP-Adresse) sowie die Verarbeitung
						dieser Daten durch Google verhindern, indem Sie ein Browser-Add-on herunterladen und
						installieren
					</li>
					<li>
						<a href="https://tools.google.com/dlpage/gaoptout" className="policy-link-color">
							https://www.google.de/gaoptout
						</a>
					</li>
					<li>
						Alternativ zum Browser-Add-on, insbesondere bei Browsern auf mobilen Endgeräten, können
						Sie die Erfassung durch Google Analytics zudem verhindern, indem Sie auf diesen Link
						klicken.
					</li>
					<li>
						Es wird ein Optout- Cookie gesetzt, das die zukünftige Erfassung Ihrer Daten beim Besuch
						dieser Website verhindert. Der Opt-out-Cookie gilt nur in diesem Browser und nur für
						unsere Website und wird auf Ihrem Gerät abgelegt.
					</li>
					<li>
						Löschen Sie die Cookies in diesem Browser, müssen Sie das Opt-out-Cookie erneut setzen.
						Weitere Informationen zum Datenschutz im Zusammenhang mit Google Analytics finden Sie
						etwa in der Google Analytics-Hilfe
					</li>
					<li>
						<a
							href="https://www.google.com/intl/de_ALL/analytics/support/index.html"
							className="policy-link-color"
						>
							https://www.google.de/analytics
						</a>
					</li>
					<li>
						IP Anonymisierung Wir haben auf dieser Website die Funktion IP-Anonymisierung aktiviert.
						Dadurch wird Ihre IP-Adresse von Google innerhalb von Mitgliedstaaten der Europäischen
						Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen
						Wirtschaftsraum vor der Übermittlung in die USA gekürzt.
					</li>
					<li>
						Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA
						übertragen und dort gekürzt. Im Auftrag des Betreibers dieser Website wird Google diese
						Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um Reports über die
						Websiteaktivitäten zusammenzustellen und um weitere mit der Websitenutzung und der
						Internetnutzung verbundene Dienstleistungen gegenüber dem Websitebetreiber zu erbringen.
					</li>
					<li>
						Die im Rahmen von Google Analytics von Ihrem Browser übermittelte IP-Adresse wird nicht
						mit anderen Daten von Google zusammengeführt. Widerspruch gegen Datenerfassung Sie
						können die Erfassung Ihrer Daten durch Google Analytics verhindern, indem Sie auf
						folgenden Link klicken.
					</li>
					<li>
						Es wird ein Opt-Out-Cookie gesetzt, der die Erfassung Ihrer Daten bei zukünftigen
						Besuchen dieser Website verhindert: Erfassung von Daten von Google Analytics für diese
						Webseite deaktivieren. Mehr Informationen zum Umgang mit Nutzerdaten bei Google
						Analytics finden Sie in der Datenschutzerklärung von Google:
					</li>
					<li>
						<a
							href="https://support.google.com/analytics/answer/6004245?hl=de"
							className="policy-link-color"
						>
							https://www.google.de/analytics/support
						</a>
					</li>
					<li>
						Auftragsdatenverarbeitung Wir haben mit Google einen Vertrag zur
						Auftragsdatenverarbeitung abgeschlossen und setzen die strengen Vorgaben der deutschen
						Datenschutzbehörden bei der Nutzung von Google Analytics vollständig um.
					</li>
					<li>
						Demografische Merkmale bei Google Analytics Diese Website nutzt die Funktion
						“demografische Merkmale” von Google Analytics. Dadurch können Berichte erstellt werden,
						die Aussagen zu Alter, Geschlecht und Interessen der Seitenbesucher enthalten.
					</li>
					<li>
						Diese Daten stammen aus interessenbezogener Werbung von Google sowie aus Besucherdaten
						von Drittanbietern. Diese Daten können keiner bestimmten Person zugeordnet werden.
					</li>
					<li>
						Sie können diese Funktion jederzeit über die Anzeigeneinstellungen in Ihrem Google-Konto
						deaktivieren oder die Erfassung Ihrer Daten durch Google Analytics wie im Punkt
						“Widerspruch gegen Datenerfassung” dargestellt generell untersagen.
					</li>
				</ul>
			),
		},
		{
			question: 'Betroffenenrechte',
			answer: (
				<ul className=".ul-privacy-policy">
					<h3>Sie haben das Recht:</h3>
					<li>
						• gemäß Art. 15 DSGVO Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten
						zu verlangen. Insbesondere können Sie Auskunft über die Verarbeitungszwecke, die
						Kategorie der personenbezogenen Daten, die Kategorien von Empfängern, gegenüber denen
						Ihre Daten offengelegt wurden oder werden, die geplante Speicherdauer, das Bestehen
						eines Rechts auf Berichtigung, Löschung, Einschränkung der Verarbeitung oder
						Widerspruch, das Bestehen eines Beschwerderechts, die Herkunft ihrer Daten, sofern diese
						nicht bei uns erhoben wurden, sowie über das Bestehen einer automatisierten
						Entscheidungsfindung einschließlich Profiling und ggf. aussagekräftigen Informationen zu
						deren Einzelheiten verlangen;
					</li>
					<li>
						• gemäß Art. 16 DSGVO unverzüglich die Berichtigung unrichtiger oder Vervollständigung
						Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen; • gemäß Art. 17 DSGVO
						die Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen, soweit
						nicht die Verarbeitung zur Ausübung des Rechts auf freie Meinungsäußerung und
						Information, zur Erfüllung einer rechtlichen Verpflichtung, aus Gründen des öffentlichen
						Interesses oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen
						erforderlich ist;
					</li>
					<li>
						• gemäß Art. 18 DSGVO die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten
						zu verlangen, soweit die Richtigkeit der Daten von Ihnen bestritten wird, die
						Verarbeitung unrechtmäßig ist, Sie aber deren Löschung ablehnen und wir die Daten nicht
						mehr benötigen, Sie jedoch diese zur Geltendmachung, Ausübung oder Verteidigung von
						Rechtsansprüchen benötigen oder Sie gemäß Art. 21 DSGVO Widerspruch gegen die
						Verarbeitung eingelegt haben;
					</li>
					<li>
						• gemäß Art. 20 DSGVO Ihre personenbezogenen Daten, die Sie uns bereitgestellt haben, in
						einem strukturierten, gängigen und maschinenlesebaren Format zu erhalten oder die
						Übermittlung an einen anderen Verantwortlichen zu verlangen;
					</li>
					<li>
						• gemäß Art. 7 Abs. 3 DSGVO Ihre einmal erteilte Einwilligung jederzeit gegenüber uns zu
						widerrufen. Dies hat zur Folge, dass wir die Datenverarbeitung, die auf dieser
						Einwilligung beruhte, für die Zukunft nicht mehr fortführen dürfen und
					</li>
					<li>
						• gemäß Art. 77 DSGVO sich bei einer Aufsichtsbehörde zu beschweren. In der Regel können
						Sie sich hierfür an die Aufsichtsbehörde Ihres üblichen Aufenthaltsortes oder
						Arbeitsplatzes oder unseres Kanzleisitzes wenden.
					</li>
				</ul>
			),
		},
		{
			question: 'Widerspruchsrecht',
			answer: (
				<ul className=".ul-privacy-policy">
					<li>
						Sofern Ihre personenbezogenen Daten auf Grundlage von berechtigten Interessen gemäß Art.
						6 Abs. 1 S. 1 lit. f DSGVO verarbeitet werden, haben Sie das Recht, gemäß Art. 21 DSGVO
						Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten einzulegen, soweit
						dafür Gründe vorliegen, die sich aus Ihrer besonderen Situation ergeben oder sich der
						Widerspruch gegen Direktwerbung richtet.
					</li>
					<li>
						Im letzteren Fall haben Sie ein generelles Widerspruchsrecht, das ohne Angabe einer
						besonderen Situation von uns umgesetzt wird. Möchten Sie von Ihrem Widerrufs- oder
						Widerspruchsrecht Gebrauch machen, genügt eine
					</li>
					<li>
						<a href="http://allcom.itvm.com.ua:5173/" className="policy-link-color">
							E-Mail an info@allcom.de.
						</a>
					</li>
				</ul>
			),
		},
		{
			question: 'Datensicherheit',
			answer: (
				<ul className=".ul-privacy-policy">
					<li>
						Wir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren (Secure Socket
						Layer) in Verbindung mit der jeweils höchsten Verschlüsselungsstufe, die von Ihrem
						Browser unterstützt wird.
					</li>
					<li>
						In der Regel handelt es sich dabei um eine 256 Bit Verschlüsselung. Falls Ihr Browser
						keine 256-Bit Verschlüsselung unterstützt, greifen wir stattdessen auf 128-Bit v3
						Technologie zurück.
					</li>
					<li>
						Ob eine einzelne Seite unseres Internetauftrittes verschlüsselt übertragen wird,
						erkennen Sie an der geschlossenen Darstellung des Schüssel- beziehungsweise
						Schloss-Symbols in der unteren Statusleiste Ihres Browsers.
					</li>
					<li>
						Wir bedienen uns im Übrigen geeigneter technischer und organisatorischer
						Sicherheitsmaßnahmen, um Ihre Daten gegen zufällige oder vorsätzliche Manipulationen,
						teilweisen oder vollständigen Verlust, Zerstörung oder gegen den unbefugten Zugriff
						Dritter zu schützen.
					</li>
					<li>
						Unsere Sicherheitsmaßnahmen werden entsprechend der technologischen Entwicklung
						fortlaufend verbessert.
					</li>
				</ul>
			),
		},
		{
			question: 'Plugins und Tools',
			answer: (
				<ul className=".ul-privacy-policy">
					<li>a. Weitere Plugins und Tools</li>
					<li>
						b. Google Web Fonts Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so
						genannte Web Fonts, die von Google bereitgestellt werden.
					</li>
					<li>
						Beim Aufruf einer Seite lädt Ihr Browser die benötigten Web Fonts in ihren Browsercache,
						um Texte und Schriftarten korrekt anzuzeigen. Zu diesem Zweck muss der von Ihnen
						verwendete Browser Verbindung zu den Servern von Google aufnehmen.
					</li>
					<li>
						Hierdurch erlangt Google Kenntnis darüber, dass über Ihre IP-Adresse unsere Website
						aufgerufen wurde. Die Nutzung von Google Web Fonts erfolgt im Interesse einer
						einheitlichen und ansprechenden Darstellung unserer Online-Angebote.
					</li>
					<li>
						Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar. Wenn
						Ihr Browser Web Fonts nicht unterstützt, wird eine Standardschrift von Ihrem Computer
						genutzt.
					</li>
					<li>Weitere Informationen zu Google Web Fonts finden Sie unter:</li>
					<li>
						<a href="https://developers.google.com/fonts/faq" className="policy-link-color">
							https://developers.google.com/fonts/faq
						</a>
					</li>
					<li>und in der Datenschutzerklärung von Google:</li>
					<li>
						<a href="https://www.google.com/policies/privacy/" className="policy-link-color">
							https://www.google.com/policies/privacy/
						</a>
					</li>
				</ul>
			),
		},
		{
			question: 'Newsletter',
			answer: (
				<ul className=".ul-privacy-policy">
					<h3>Newsletterdaten</h3>
					<li>
						Wenn Sie den auf der Website angebotenen Newsletter beziehen möchten, benötigen wir von
						Ihnen eine E-Mail-Adresse sowie Informationen, welche uns die Überprüfung gestatten,
						dass Sie der Inhaber der angegebenen E-Mail-Adresse sind und mit dem Empfang des
						Newsletters einverstanden sind.
					</li>
					<li>
						Weitere Daten werden nicht bzw. nur auf freiwilliger Basis erhoben. Diese Daten
						verwenden wir ausschließlich für den Versand der angeforderten Informationen und geben
						diese nicht an Dritte weiter.
					</li>
					<li>
						Die Verarbeitung der in das Newsletteranmeldeformular eingegebenen Daten erfolgt
						ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
					</li>
					<li>
						Die erteilte Einwilligung zur Speicherung der Daten, der E-Mail-Adresse sowie deren
						Nutzung zum Versand des Newsletters können Sie jederzeit widerrufen, etwa über den
						(Austragen)-Link im Newsletter.
					</li>
					<li>
						Die Rechtmäßigkeit der bereits erfolgten Datenverarbeitungsvorgänge bleibt vom Widerruf
						unberührt. Die von Ihnen zum Zwecke des Newsletter-Bezugs bei uns hinterlegten Daten
						werden von uns bis zu Ihrer Austragung aus dem Newsletter gespeichert und nach der
						Abbestellung des Newsletters gelöscht.
					</li>
					<li>
						Daten, die zu anderen Zwecken bei uns gespeichert wurden (z.B. E-Mail-Adressen für den
						Mitgliederbereich) bleiben hiervon unberührt.
					</li>
				</ul>
			),
		},
		{
			question: 'Aktualität und Änderung dieser Datenschutzerklärung',
			answer: (
				<ul className=".ul-privacy-policy">
					<li>Diese Datenschutzerklärung ist aktuell gültig und hat den Stand August 2023.</li>
					<li>
						Durch die Weiterentwicklung unserer Website und Angebote darüber oder aufgrund
						geänderter gesetzlicher beziehungsweise behördlicher Vorgaben kann es notwendig werden,
						diese Datenschutzerklärung zu ändern.
					</li>
					<li>Die jeweils aktuelle Datenschutzerklärung kann jederzeit auf der Website unter:</li>
					<li>
						<a href="http://allcom.itvm.com.ua:5173/" className="policy-link-color">
							https://www.allcom.de/datenschutz
						</a>
					</li>
					<li> von Ihnen abgerufen und ausgedruckt werden.</li>
				</ul>
			),
		},
	];

	return (
		<div className="privacy-policy-container">
			<h1>Datenschutzerklärung</h1>
			{privacyPolicyData.map((item, index) => (
				<div key={index}>
					<div
						className={`privacy-policy-question ${visibleSection === index ? 'expanded' : ''}`}
						onClick={() => handleSectionClick(index)}
					>
						{item.question}
					</div>
					{visibleSection === index && <div className="privacy-policy-answer">{item.answer}</div>}
				</div>
			))}
		</div>
	);
};

export default PrivacyPolicy;
