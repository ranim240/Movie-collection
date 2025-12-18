# Film project

A comprehensive Angular-based movie collection management application with dashboard analytics, search/filter capabilities, and personalized recommendations.

## Overview

This application allows users to manage their personal movie collection with features including:
- Dashboard with collection statistics and genre charts
- Movie list with search, filter, and sort functionality
- Add/Edit movie forms with poster preview
- Movie detail pages with watched status toggle
- Personalized recommendations based on viewing history
- Delete confirmation dialogs
- Responsive design for mobile, tablet, and desktop

## Recent Changes

- **December 15, 2025**: Initial project setup with Angular 17, Angular Material, and Chart.js

## Project Architecture

```
movie-collection/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── dashboard/         # Main dashboard with stats and charts
│   │   │   ├── movie-list/        # Movie list with search/filter
│   │   │   ├── movie-detail/      # Individual movie details
│   │   │   ├── movie-form/        # Add/Edit movie form
│   │   │   ├── header/            # Navigation header
│   │   │   └── delete-dialog/     # Delete confirmation dialog
│   │   ├── services/
│   │   │   └── movie.service.ts   # Movie CRUD and data management
│   │   ├── models/
│   │   │   └── movie.model.ts     # TypeScript interfaces
│   │   ├── app.component.ts       # Root component
│   │   ├── app.config.ts          # Angular configuration
│   │   └── app.routes.ts          # Route definitions
│   ├── styles.css                # Global styles
│   └── index.html                 # Main HTML file
├── angular.json                   # Angular CLI configuration
└── package.json                   # NPM dependencies
```

## Technology Stack

- **Frontend**: Angular 17
- **UI Components**: Angular Material
- **Charts**: Chart.js with ng2-charts
- **Styling**: CSS
- **State Management**: RxJS with BehaviorSubject
- **Data Storage**: LocalStorage (browser-based persistence)

## Running the Application

```bash
cd FilmProject
ng serve -o
```

The app runs on port 4200 .

## Key Features

1. **Dashboard**: Overview with total movies, watched count, genre breakdown chart, and recommendations
2. **Movie List**: Search by title, filter by genre, sort by various criteria
3. **Quick Add**: Form to add movies with title, genre, year, rating, poster URL, and description
4. **Movie Details**: Full movie information with watched status toggle
5. **Responsive Design**: Works on mobile, tablet, and desktop
