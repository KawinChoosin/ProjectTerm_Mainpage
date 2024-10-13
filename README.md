# Fullstack Project

**Made by :**

- กวิน ชูสิน 650610745
- กิตปกรณ์ ทองโคตร 650610749
- รวิภา สามห้วย 650610801
- สุรางค์รัตน์ เตมีศักดิ์ 650610816
- ธัญชนก กวีกุล 650615021
<br/>

# SETUP

## 1) Change all .env.example to .env

There are .env.example in 
- **ProjectTerm_G1_Shop** repository
- **TBackend** repository
- **TProject** repository

*** ***Don't forget to change all .env.example into .env*** ***
<br/>
<br/>

## 2) Config .env in TBackend repository

There are **GOOGLE_CID** and **GOOGLE_CS** you need to config.
- **GOOGLE_CID** is for Google OAuth 2.0 **Client ID**
- **GOOGLE_CS** is for Google OAuth 2.0 **Client Secret**
<br/>

## 3) Spinning up database instance using [docker](https://hub.docker.com/).

```bash
docker compose up -d --build
```
<br/>

## 4) Go to TBackend repository

**User Management**

```bash
docker exec -it g1-db bash
```

```bash
psql -U usertest -d g1db
```
*** ***Don't forget to change the password*** ***

```bash
REVOKE CONNECT ON DATABASE g1db FROM public;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
CREATE USER tuser WITH PASSWORD '1234';
GRANT CONNECT ON DATABASE g1db TO tuser;
GRANT USAGE ON SCHEMA public TO tuser;
GRANT CREATE ON SCHEMA public TO tuser;
GRANT ALL ON DATABASE g1db TO tuser;
GRANT ALL ON SCHEMA public TO tuser;
ALTER USER tuser CREATEDB;
```
<br/>

## 5) Open TBackend in intergrated terminal

**If you are deploying, the next code is required**

```bash
docker exec -it g1-backend bash
```

**then (require for both deployment and development)**

```bash
npx prisma migrate dev --name init
```

```bash
npx prisma generate
```

**If you are in development section, the code below is required**

```bash
node index.js
```

<br/>

**Start Dev (for development section)**

```bash
npm run dev
```
<br/>
