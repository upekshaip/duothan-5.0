## Setup Steps

### Install Dependencies

Run the following command to install all required packages:

```bash
npm install
```

### Generate Prisma Client

Generate the Prisma client for database access:

```bash
npx prisma generate
```

### Start Development Server

Launch the development server:

```bash
npm run dev
```

## Migrations

### Run Database Migrations

Apply database migrations in development by running the following command. Replace `migration_commit_name` with a descriptive name for your migration:

```bash
npx prisma migrate dev --name migration_commit_name
```

### Deploy Migrations to Production

If there is existing data in the affected tables, Prisma may display an error message. In such cases, remove the data from the relevant tables using phpMyAdmin before running the migration.

```bash
npx prisma generate
```
