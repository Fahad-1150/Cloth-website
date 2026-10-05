/**
 * ============================================================================
 * LUXORA ATELIER - HOMEPAGE COMPONENT
 * ============================================================================
 * Primary landing page presenting seasonal promotions, brand features,
 * hero visual carousels, category taxonomies, and featured pieces.
 */

import React from 'react';
import { HeroCarousel } from '../components/HeroCarousel';
import { CategorySection } from '../components/CategorySection';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { Home_Banner } from '../components/Home_Banner';

import './HomePage.css';

export const HomePage = () => {
    return (
        <div className="home-page">
            {/* ====================================================================
          1. TOP SUMMER PROMOTIONAL SECTION
          ==================================================================== */}
            <Home_Banner />

            {/* ====================================================================
          2. LUXURY VALUE PROPOSITIONS & GUARANTEES
          ==================================================================== */}
            {/*<FeatureBar />*/}

            {/* ====================================================================
          3. EDITORIAL HERO CAROUSEL
          ==================================================================== */}
            {/*<HeroCarousel />*/}



            {/* ====================================================================
          4. DEPARTMENT & CATEGORY DIRECTORY
          ==================================================================== */}
            <CategorySection />

            {/* ====================================================================
          5. CURATED BESTSELLERS & FEATURED APPAREL
          ==================================================================== */}
            <FeaturedProducts />

            {/* ====================================================================
          6. TRUST BADGES & VERIFIED REPUTATION
          ==================================================================== */}

        </div>
    );
};

export default HomePage;
