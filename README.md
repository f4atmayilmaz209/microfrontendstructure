# 🧩 Microfrontend Yapısı – Host, Products, Basket

Bu proje, **Next.js** ve **React** kullanarak oluşturulmuş bir **microfrontend mimarisini** temel alır.  
Uygulamalar birbirinden bağımsız olarak çalışır ve **Module Federation** aracılığıyla `host` uygulamasında birleşir.

## 📁 Uygulamalar

| Uygulama   | Port  | Açıklama               |
|------------|-------|------------------------|
| `host`     | 3000  | Ana uygulama (Next.js) |
| `products` | 3001  | Ürün listesi (Next.js) |
| `basket`   | 3002  | Sepet (React)          |

---

## 🧪 Local Geliştirme

### 1. Ortam Değişkeni

Her uygulama dizinine `.env.local` dosyası ekleyin:

```env
NEXT_PRIVATE_LOCAL_WEBPACK=true
```

Bu ayar sayesinde Module Federation yerel geliştirmeye uygun hale gelir.

### 2. Kurulum

Her proje için bağımlılıkları yükleyin:

```bash
cd host && npm install
cd products && npm install
cd basket && npm install
```

### 3. Uygulamaları Başlat

Farklı terminallerde aşağıdaki komutlarla başlatın:

#### 🟩 Products (3001)
```bash
cd products
npm run dev
```

#### 🟦 Basket (3002)
```bash
cd basket
npm run dev
```

#### 🟨 Host (3000)
```bash
cd host
npm run dev
```

---

## 🐳 Docker ile Çalıştırma

Her microfrontend uygulaması için özel bir Docker imajı oluşturup container olarak ayağa kaldırabilirsiniz.

### 🔧 Ortam Değişkeni (Gerekli)

Her container için aşağıdaki ortam değişkeni gereklidir:

```env
NEXT_PRIVATE_LOCAL_WEBPACK=true
```

Ek olarak **host** uygulaması için, remote uygulamaların adreslerini environment üzerinden geçirmeniz gerekir.

---

### 🧱 Docker Image Oluşturma

Her uygulamanın kök dizininde aşağıdaki komutları çalıştırarak imajları oluşturun:

#### ✅ Products
```bash
cd products
docker build -t microfrontend/products .
```

#### ✅ Basket
```bash
cd basket
docker build -t microfrontend/basket .
```

#### ✅ Host
```bash
cd host
docker build -t microfrontend/host .
```

---

### 🚀 Uygulamaları Çalıştırma

#### 🟩 Products (3001)
```bash
docker run -e NEXT_PRIVATE_LOCAL_WEBPACK=true -p 3001:3000 microfrontend/products
```

#### 🟦 Basket (3002)
```bash
docker run -e NEXT_PRIVATE_LOCAL_WEBPACK=true -p 3002:3000 microfrontend/basket
```

#### 🟨 Host (3000)

Host uygulaması remote uygulamaların URL'lerini environment variable olarak alır. Örnek:

```bash
docker run \
  -e NEXT_PRIVATE_LOCAL_WEBPACK=true \
  -e REMOTE_PRODUCTS_URL=http://host.docker.internal:3001 \
  -e REMOTE_BASKET_URL=http://host.docker.internal:3002 \
  -p 3000:3000 microfrontend/host
```

> 🧠 `host.docker.internal`, Docker container içinden host makineye erişmek için kullanılır.  
> Eğer farklı bir ortamdaysanız IP adreslerini doğrudan verebilirsiniz.

---

### 📌 Notlar

- Her uygulama kendi içinde bağımsızdır.
- Host uygulaması remote uygulamaları URL üzerinden dinamik olarak çeker.
- `NEXT_PRIVATE_LOCAL_WEBPACK=true` olmadan Module Federation düzgün çalışmaz.
