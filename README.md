# Plokka App 🚮🌍

![Plokka Logo](https://via.placeholder.com/300x150.png?text=Plokka+Logo) **Gerum umhverfishreinsun að skemmtilegum leik. Eitt rusl í einu.**

Plokka er smáforrit sem breytir ruslatínslu í gefandi og félagslegan viðburð. Með því að nota leikjafræði (gamification) hvetur appið notendur til að taka virkan þátt í að hreinsa sitt nágrenni, keppa við vini og vinna sér inn verðlaun.

---

### **Efnisyfirlit**
1. [Um Verkefnið](#um-verkefnið-)
2. [Helstu Eiginleikar](#helstu-eiginleikar-)
3. [Þróunaráætlun (Roadmap)](#þróunaráætlun--roadmap-)
4. [Tæknistafla](#tæknistafla-)
5. [Uppsetning fyrir Þróun](#uppsetning-fyrir-þróun-)
6. [Hvernig er hægt að leggja af mörkum?](#hvernig-er-hægt-að-leggja-af-mörkum--)
7. [Leyfi](#leyfi-)
8. [Hafa Samband](#hafa-samband-)

---

## **Um Verkefnið** 🗺️

Kjarninn í Plokka er gagnvirkt kort sem sýnir nágrenni notandans skipt í litakóðuð svæði. Litur hvers svæðis gefur til kynna hvenær það var síðast hreinsað.

* 🟢 **Grænt:** Nýlega hreinsað.
* 🟡 **Gult:** Hreinsun er að komast á tíma.
* 🔴 **Rautt:** Svæðið þarfnast tafarlausrar hreinsunar.

Notendur velja svæði, fara á staðinn, týna rusl og staðfesta verkið með GPS-staðsetningu og mynd af ruslapokanum. Fyrir vikið fá þeir stig, klifra upp stigatöflur og stuðla að hreinna umhverfi.

---

## **Helstu Eiginleikar** ✨

* **Gagnvirkt Kort:** Sjáðu stöðu hreinsunar í rauntíma í þínu hverfi.
* **Staðfestingaraðgerðir:** GPS-hnit og myndasönnun tryggja áreiðanleika.
* **Stigakerfi:** Fáðu stig fyrir hvert fermetra sem þú hreinsar.
* **Liðakeppni:** Stofnaðu lið með vinum og kepptu á staðbundnum og landsvísu stigatöflum.
* **Áskoranir og Viðburðir:** Taktu þátt í tímabundnum verkefnum fyrir auka stig og verðlaun.
* **Raunveruleg Verðlaun:** Notaðu stigin þín til að fá afslætti og tilboð hjá samstarfsfyrirtækjum.

---

## **Þróunaráætlun (Roadmap)** 🚀

Verkefninu er skipt niður í fimm skýra fasa.

* **✅ Fasi 1: Kjarnavirkni (MVP)**
    * Kort með litakóðuðum svæðum.
    * Hreinsunarferli með GPS- og myndastaðfestingu.
    * Einföld stigagjöf og persónulegt yfirlit.

* **◻️ Fasi 2: Samfélagið**
    * Liðavirkni (stofna, bjóða, ganga í lið).
    * Stigatöflur fyrir einstaklinga og lið.

* **◻️ Fasi 3: Áskoranir og Viðburðir**
    * Tímabundnir viðburðir (t.d. „Strandhreinsunarhelgi“).
    * „Boss-svæði“ sem gefa bónusstig.

* **◻️ Fasi 4: Verðlaun og Samstarf**
    * Kerfi til að nota stig fyrir raunveruleg verðlaun.
    * Samstarf við staðbundin fyrirtæki.

* **◻️ Fasi 5: Gögn og Áhrif**
    * Valkvæm skráning á tegundum rusls.
    * „Plokk-veggur“ með myndum frá notendum.
    * Ítarlegri tölfræði fyrir notendur.

---

## **Tæknistafla** 💻

Hér er yfirlit yfir fyrirhugaðan tæknistafla. *Þetta gæti tekið breytingum.*

* **Smáforrit (Frontend):** React Native eða Flutter
* **Bakendi (Backend):** Node.js (Express) eða Python (Django/FastAPI)
* **Gagnagrunnur:** PostgreSQL með PostGIS fyrir landfræðileg gögn
* **Kortaþjónusta:** Mapbox eða Google Maps API
* **Myndageymsla:** AWS S3 eða sambærilegt
* **Hýsing:** Heroku, Vercel, eða AWS

---

## **Uppsetning fyrir Þróun** ⚙️

Til að setja upp verkefnið á þinni vél fyrir þróun, fylgdu þessum skrefum:

1. **Klónaðu verkefnið:**
    ```sh
    git clone https://github.com/ditt-notendanafn/plokka.git
    cd plokka
    ```

2. **Bakendi (Node.js + Express):**
    ```sh
    cd backend
    npm install
    npm run dev
    ```

    Sjálfgefið keyrir þjónustan á `http://localhost:4000`. Breytu `PORT` og `HOST` ef þarf með umhverfisbreytum.

3. **Framendi (Vite + React):**
    ```sh
    cd frontend
    npm install
    npm run dev
    ```

    Vite þjónustan proxar beiðnir á `/api` yfir á bakendann. Ef þú keyrir bakendann á annarri slóð geturðu skilgreint `VITE_API_BASE_URL` í `.env.local`.

4. **Keyra próf:**

    - Bakendi: `cd backend && npm test`
    - Framendi: `cd frontend && npm test`

5. **Byggja fyrir afhendingu:**

    - Bakendi: `cd backend && npm run build`
    - Framendi: `cd frontend && npm run build`

---

## **Hvernig er hægt að leggja af mörkum?** 🙌

Við fögnum öllum sem vilja leggja sitt af mörkum! Hvort sem það eru hugmyndir, kóðabætur eða villuleit.

1.  **Fork-aðu** verkefnið.
2.  Búðu til nýja grein (branch) fyrir þína viðbót (`git checkout -b feature/AmazingFeature`).
3.  Vistaðu þínar breytingar (`git commit -m 'Add some AmazingFeature'`).
4.  Ýttu breytingunum á þína grein (`git push origin feature/AmazingFeature`).
5.  Opnaðu **Pull Request**.

---

## **Leyfi** 📜

Þetta verkefni er gefið út undir **MIT leyfinu**. Sjá `LICENSE.txt` fyrir frekari upplýsingar.

---

## **Hafa Samband** ✉️

Nafn Verkefnastjóra - [@notendanafn_a_twitter](https://twitter.com/notendanafn) - netfang@doman.is

Verkefnaslóð: [https://github.com/ditt-notendanafn/plokka](https://github.com/ditt-notendanafn/plokka)