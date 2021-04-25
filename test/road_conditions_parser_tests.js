const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-as-promised'))

describe('RoadConditionsParser', () => {
	describe('Testing RoadConditionsParser parser when parsing data string provided by RoadConditionsGuy', () => {
		const RoadConditionsParser = require("../lib/content/road-conditions/RoadConditionsParser");
		it('should provide parsed road conditions report, when string is in the predicted format', async () => {
			const data = '<?xml version="1.0" encoding="utf-8"?><feed xmlns="http://www.w3.org/2005/Atom">  <title>Stanje na cestah - Prometno poročilo, 25. 04. 2021 13:35:48</title>  <subtitle>Prometno poročilo</subtitle>  <updated>2021-04-25T11:34:50.247Z</updated>  <link href="http://www.promet.si" />  <author>    <name>DARS d.d.</name>    <email>info@promet.si</email>  </author>  <id>urn:uuid:84730ef2-1d26-409a-a846-2183d7f03fc0</id>  <entry>    <title>Prometno poročilo, nedelja 25.april 2021 ob 13:34</title>    <id>tag:promet.si,2000:/_archives/porocila/1223774</id>    <content type="html">&lt;div&gt;&lt;p&gt;&lt;strong&gt;PrometnI nesrečI:&lt;/strong&gt;&lt;br&gt;- Regionalna cesta Divača - Senožeče je zaprta. Obvoz je možen preko Sežane in Štorij ali po avtocesti, potrebna je vinjeta.&lt;br&gt;- Regionalna cesta Novo mesto - Mirna Peč je zaprta pri kraju Dolenje Karteljevo.&lt;strong&gt;&lt;/strong&gt;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Zastoj je na cesti Izola - Portorož.&lt;/strong&gt;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Čakalna doba &lt;/strong&gt;je na mejnih prehodih Obrežje in Gruškovje.&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Na primorski avtocesti &lt;/strong&gt;&lt;strong&gt;A1&lt;/strong&gt;&lt;strong&gt; Koper - Ljubljana je zaradi del zaprt vozni pas med Uncem in Logatcem proti Ljubljani. &lt;/strong&gt;Dela naj bi bila zaključena predvidoma do 17. ure. Ker danes pričakujemo povečan promet iz smeri Kopra proti Ljubljani, bodo na tem odseku nastajali zastoji, zato predlagamo potovanje pozno popoldne. Pred potjo naj se vozniki pozanimajo o stanju na cestah.&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Dela so tudi:&lt;/strong&gt;&lt;br&gt;- Na štajerski avtocesti je zaprt vozni pas med Domžalami in Krtino proti Mariboru. &lt;strong&gt;Zaprt je tudi uvoz Krtina proti Mariboru.&lt;/strong&gt;&lt;br&gt;- Na vzhodni ljubljanski obvoznici je zaprt izvoz Ljubljana vzhod, Zaloška, iz smeri Golovca proti Zadobrovi. Obvoz preko priključka Bizovik.&lt;/p&gt;&lt;p&gt;Danes do 21. ure velja omejitev prometa tovornih vozil z največjo dovoljeno maso nad 7,5 t.&lt;/p&gt;&lt;/div&gt;&lt;div&gt;&lt;p&gt;&lt;strong&gt;Dela na ljubljanski&lt;/strong&gt;&lt;strong&gt; vzhodni obvoznici:&lt;/strong&gt;&lt;br&gt;- Obnova priključka &lt;a href="https://www.promet.si/portal/sl/rekonstrukcija-priklju%c4%8dka-industrijska-cona-moste-na-ljubljanski-vzhodni-obvoznici.aspx" target="_blank"&gt;Industrijska cona Moste&lt;/a&gt;, Letališka cesta. Do 2. maja bo promet med razcepom Zadobrova in Bizovikom potekal po dveh zoženih pasovih v vsako smer. Zaprt je tudi uvoz Ljubljana vzhod, z Zaloške ceste proti Zadobrovi. &lt;br&gt;- Zaradi &lt;a href="https://www.promet.si/portal/sl/obnova-predora-golovec-na-ljubljanski-obvoznici-2021.aspx" target="_blank"&gt;obnove predora Golovec &lt;/a&gt;promet poteka skozi eno predorsko cev dvosmerno. V obe smeri je prepovedan promet za vsa vozila, z največjo dovoljeno maso nad 3,5 t. &lt;strong&gt;Od ponedeljka do srede bo vsako noč med 22. in 5. uro zjutraj &lt;/strong&gt;&lt;strong&gt;zaprt&lt;/strong&gt;&lt;strong&gt; predor Golovec iz smeri Bizovika proti Malencam zaradi testiranja elektrostrojne opreme. Obvoz bo po severni ljubljanski obvoznici.&lt;/strong&gt;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;Dela na glavnih in regionalnih cestah:&lt;/strong&gt;&lt;br&gt;- Danes do 20. ure bo zaprta glavna cesta Maribor - Dravograd, med Bresternico in Kamnico. Obvoz je preko Ruš in Selnice ob Dravi.&lt;br&gt;- Do 26. 4. bo zaprta glavna cesta Novo mesto - Metlika, med Hrastom pri Jugorju in Dolnjim Suhorjem. Obvoz je po cesti Jugorje - Semič - Črnomelj - Metlika v obe smeri.&lt;/p&gt;&lt;/div&gt;&lt;div&gt; &lt;p&gt;Vir: &lt;a href="https://www.promet.si" target="_blank"&gt;www.promet.si&lt;/a&gt;&lt;/p&gt;&lt;/div&gt;</content>    <updated>2021-04-25T11:34:49.247Z</updated>  </entry></feed>'
			const expectedResult = {
				title: "Stanje na cestah - Prometno poročilo, 25. 04. 2021 13:35:48",
				dateUpdated: "2021-04-25T11:34:50.247Z",
				link: "http://www.promet.si",
				items: [
					{
						title: "Prometno poročilo, nedelja 25.april 2021 ob 13:34",
						description: "<div><p><strong>PrometnI nesrečI:</strong><br>- Regionalna cesta Divača - Senožeče je zaprta. Obvoz je možen preko Sežane in Štorij ali po avtocesti, potrebna je vinjeta.<br>- Regionalna cesta Novo mesto - Mirna Peč je zaprta pri kraju Dolenje Karteljevo.<strong></strong></p><p><strong>Zastoj je na cesti Izola - Portorož.</strong></p><p><strong>Čakalna doba </strong>je na mejnih prehodih Obrežje in Gruškovje.</p><p><strong>Na primorski avtocesti </strong><strong>A1</strong><strong> Koper - Ljubljana je zaradi del zaprt vozni pas med Uncem in Logatcem proti Ljubljani. </strong>Dela naj bi bila zaključena predvidoma do 17. ure. Ker danes pričakujemo povečan promet iz smeri Kopra proti Ljubljani, bodo na tem odseku nastajali zastoji, zato predlagamo potovanje pozno popoldne. Pred potjo naj se vozniki pozanimajo o stanju na cestah.</p><p><strong>Dela so tudi:</strong><br>- Na štajerski avtocesti je zaprt vozni pas med Domžalami in Krtino proti Mariboru. <strong>Zaprt je tudi uvoz Krtina proti Mariboru.</strong><br>- Na vzhodni ljubljanski obvoznici je zaprt izvoz Ljubljana vzhod, Zaloška, iz smeri Golovca proti Zadobrovi. Obvoz preko priključka Bizovik.</p><p>Danes do 21. ure velja omejitev prometa tovornih vozil z največjo dovoljeno maso nad 7,5 t.</p></div><div><p><strong>Dela na ljubljanski</strong><strong> vzhodni obvoznici:</strong><br>- Obnova priključka <a href=\"https://www.promet.si/portal/sl/rekonstrukcija-priklju%c4%8dka-industrijska-cona-moste-na-ljubljanski-vzhodni-obvoznici.aspx\" target=\"_blank\">Industrijska cona Moste</a>, Letališka cesta. Do 2. maja bo promet med razcepom Zadobrova in Bizovikom potekal po dveh zoženih pasovih v vsako smer. Zaprt je tudi uvoz Ljubljana vzhod, z Zaloške ceste proti Zadobrovi. <br>- Zaradi <a href=\"https://www.promet.si/portal/sl/obnova-predora-golovec-na-ljubljanski-obvoznici-2021.aspx\" target=\"_blank\">obnove predora Golovec </a>promet poteka skozi eno predorsko cev dvosmerno. V obe smeri je prepovedan promet za vsa vozila, z največjo dovoljeno maso nad 3,5 t. <strong>Od ponedeljka do srede bo vsako noč med 22. in 5. uro zjutraj </strong><strong>zaprt</strong><strong> predor Golovec iz smeri Bizovika proti Malencam zaradi testiranja elektrostrojne opreme. Obvoz bo po severni ljubljanski obvoznici.</strong></p><p><strong>Dela na glavnih in regionalnih cestah:</strong><br>- Danes do 20. ure bo zaprta glavna cesta Maribor - Dravograd, med Bresternico in Kamnico. Obvoz je preko Ruš in Selnice ob Dravi.<br>- Do 26. 4. bo zaprta glavna cesta Novo mesto - Metlika, med Hrastom pri Jugorju in Dolnjim Suhorjem. Obvoz je po cesti Jugorje - Semič - Črnomelj - Metlika v obe smeri.</p></div><div> <p>Vir: <a href=\"https://www.promet.si\" target=\"_blank\">www.promet.si</a></p></div>",
						datePublished: "2021-04-25T11:34:49.247Z",
					},
				],
			}

			const actualResult = await new RoadConditionsParser().parseFeed(data)

			expect(actualResult).to.deep.equal(expectedResult);

		});


		it('should provide parsed road conditions report with only main attributes, when string is in the predicted format, but no entries are contained', async () => {
			const data = '<?xml version="1.0" encoding="UTF-8"?><feed xmlns="http://www.w3.org/2005/Atom">   <title>Stanje na cestah - Prometno poročilo, 25. 04. 2021 13:35:48</title>   <subtitle>Prometno poročilo</subtitle>   <updated>2021-04-25T11:34:50.247Z</updated>   <link href="http://www.promet.si" />   <author>      <name>DARS d.d.</name>      <email>info@promet.si</email>   </author>   <id>urn:uuid:84730ef2-1d26-409a-a846-2183d7f03fc0</id></feed>'
			const expectedResult = {
				title: "Stanje na cestah - Prometno poročilo, 25. 04. 2021 13:35:48",
				dateUpdated: "2021-04-25T11:34:50.247Z",
				link: "http://www.promet.si",
				items: [],
			}

			const actualResult = await new RoadConditionsParser().parseFeed(data)

			expect(actualResult).to.deep.equal(expectedResult);

		});



		it('should throw error on recieving an empty string.', async () => {
			const data = '';
			const expectedResult = "Cannot read property 'feed' of null";


			await expect(new RoadConditionsParser().parseFeed(data)).to.be.rejectedWith(expectedResult);
			await expect(new RoadConditionsParser().parseFeed(data)).to.be.rejectedWith(TypeError);
		})
	});
});