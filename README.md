# Journal App - Student Assignment Starter

A minimalist journaling application built with Next.js 14, TypeScript, Tailwind CSS, and Supabase. This project serves as a starting point for students to practice debugging, adding features, and improving existing code.


## Tech Stack

- **Frontend Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Backend/Database:** Supabase (Authentication + PostgreSQL)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd dagboks-appen
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Skapa nytt projekt på supabase
2. Kör allt som finns i `supabase/schema.sql` i SQL-editorn
3. Hitta API-nycklar på Supabase och ersätt i .env.example

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Design Philosophy

This app follows a minimalist, editorial design approach:

- **Typography:** Serif fonts for headings, sans-serif for body text
- **Color Palette:** Cream backgrounds with dark brown text and warm gray accents
- **Spacing:** Generous whitespace for readability
- **Layout:** Clean, centered layouts with maximum content width
- **Interaction:** Subtle hover states and transitions


## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## Fyll på med era reflektioner nedan!

## Projektmetoder

### Branching strategi
Vi har använt oss av feature branching och hade då en main branch och en development. Main var branchen som sjösattes för produktion och development var den vi mergade feature branches med innan development mergades med main. Vi jobbade på feature branches och commitade där. Sedan squashade vi commitsen när vi mergade med development. Om en annan branch mergades med development efter att man hade branchat ut från development så rebasade vi branchen på development för att lösa eventuella mergekonflikter innan PR och för att säkerställa att koden fungerar tillsammans med det senaste på development.
Main och development hade båda branch protection och minst en annan gruppmedlem var tvungen att göra review och godkänna PR innan merge.

### Verktyg för projektplanering
Vi använde Github Projects med en kanban board där vi la upp issues. Vi hade Issue Templates och och även PR Templates för konsekventa strukturer (se ISSUE_TEMPLATE och PULL_REQUEST_TEMPLATE i .github-foldern).

### CI/CD
För varje push till en branch så körs jobbet "lint-and-test" i github actions. Då körs lint och våra egna Jest-tester. 
För varje skapad PR och varje push till en aktiv PR på development så körs "lint-and-test" och "lighthouseci". Dessa körs parallellt. (se lighthouse.yml och main.yml i .github/workflows). "lighthouseci" kör google lighthouse för desktop och mobile och genererar rapporter för båda. Pga tidsbrist så hann vi inte fixa alla lighthouse problem så därför stoppar vi inte pipelinen vid lighthouse fel, vi får bara två rapporter. Lighthouse körs på en previewdeploy på Vercel.
Samma pipeline körs vid PR till main. Vercel lyssnar på main och gör en ny deploy när ändringar sker där.

Vi valde att lägga till lighthouseci på varje PR för att det är viktigt att den kod som mergas in håller hög standard. T.ex. när vi ligger till en ny feature så märker vi om det är några allvarliga problem med tillgänglighet, prestanda eller SEO innan vi mergar med development och i slutändan main.
Genom att köra för både desktop och mobile så kan vi också se om det är någon diskrepans dem emellan.

### AI genererat
Jest-testerna är genererade av Chat GPT och Co-pilot. Vi kopierade sidan vi ville testa och la in den i Chat GPT och bad den att generera Jest tester. Co-pilot bistod med auto-complete.

### Bug Fixes
- "Titeln är" buggen är fixad
- Responsiviteten för mobil på inläggslistan är fixad
- Felaktigt datum format är fixad
- Allt görs i Frontend: Frontend & Backend har separerats med NextJS API-routes

### Supported Features

**Basic Features**
- Issue Templates för nya buggar/dokument/features/hotfixar
- Pull Request Templates för nya buggar/dokument/features/hotfixar
- Redigering av inlägg
- Borttagning av inlägg
- Markdownsupport för inläggen
- Optimerad Docker Image (1.33GB)
- Unit tester med Jest

**Advanced Features**
- CI Security Scanning (npm audit)
- Lighthouse CI
- Bygga och pusha Docker images automatiskt i CI till GitHub Package Registry
