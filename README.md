# Bokningssystem 

En enkelsidesapplikation (SPA) som är byggd med Next.js, React, TypeSctipt, Tailwind CSS och MySQL.

Bokningssystemet är ett system för att skapa bokningar (boka spelaktiviteter) som sparas i en MySQL-databas. Man kan se en översiktslista med alla bokade spelaktiviteter f.o.m. idag och 6 månader framåt, sortera bokningar efter datum och/ eller spelkategori.

Om man är inloggad så kan man göra en bokning, gå in på "Min sida" och se alla bokningar som man har skapat, hantera sina bokningar (t.ex. ta bort en bokning). 

Bokningsystemet har grundläggande funktioner och bra utvecklingsmöjligheter. 


## För att köra min application lokalt


#### (Det krävs MAMP, databaskopia som importeras med hjälp av phpMyAdmin och databaskonfiguration.)


1. Klona repo

```

git clone git@github.com:OlgaGustafsson/bokningssystem.git

```

2. Gå in i repokatalogen

```

cd bokningssystem

```

3. Installera dev dependencies

```

npm install

```

4. Starta servern 

```

npm run dev

```

5. Öppna http://localhost:3000/ i din webbläsare.



#




This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
