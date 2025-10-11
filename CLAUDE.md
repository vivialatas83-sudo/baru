# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains an AI consultancy website project for a business specializing in helping SMBs integrate AI solutions. The consultancy offers three core services:
1. Video Prompt Engineering (Runway, Pika Labs)
2. Image Prompt Engineering (Midjourney, DALL-E, Stable Diffusion)
3. AI-Powered Application Development using "Vibe Coding" methodologies

## Technology Stack

- **Framework**: Next.js 14 with App Router, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP for scroll-triggered effects
- **CMS**: Headless CMS (Strapi or Sanity) with MDX for blog content
- **Hosting**: Vercel with edge functions
- **Analytics**: Vercel Analytics, Google Tag Manager

## Project Structure

The project is organized into phases:

### Current Status
- **Phase**: Planning completed, implementation not yet started
- **Location**: `Project 1 Landing Page/AI_Consultancy_Website_Plan.md` contains comprehensive specifications

### Planned Pages
1. Hero Landing Page - Primary conversion touchpoint
2. Services Deep Dive - Detailed service offerings
3. Case Studies & Portfolio - Success stories with metrics
4. Process & Methodology - Client workflow explanation
5. About & Team - Humanizing expertise
6. Contact & Consultation - Multiple conversion paths
7. **Business Audit Form** - Critical lead capture component with specific requirements

## Business Audit Form Requirements

This is a key conversion component with strict specifications:

**Required Fields:**
- First Name, Last Name (text inputs)
- Company Name (text input)
- What the Company Does (large text area)
- Email (validated email input)
- Phone Number (formatted phone input)

**CTA Button:**
- Text: "AUDIT MY BUSINESS" (all uppercase)
- Style: Shiny green button with hover effects
- Design priority: Attention-grabbing, conversion-focused

**Implementation Notes:**
- Form should be visually complete and professional in mockup phase
- Real-time field validation with user-friendly error messages
- Mobile-optimized, WCAG compliant
- Prepare for future CRM/email marketing integration

## Design System

### Color Palette: "Neural Nexus"
- **Primary**: #0F172A (Slate 900) - Deep navy
- **Secondary**: #1E293B (Slate 800) - Charcoal
- **Accent**: #3B82F6 (Blue 500) - Tech-forward blue
- **Highlight**: #06B6D4 (Cyan 500) - AI-inspired cyan
- **Success**: #10B981 (Emerald 500) - Used for CTA buttons

### Typography
- **Font Family**: Inter (primary)
- **Display**: Extra Bold (48-72px) for headlines
- **Heading**: Bold (24-36px) for sections
- **Body**: Medium (16-18px) for readability
- **Caption**: Regular (14px) for supporting text

### Spacing System
- 8px base grid system
- Small: 8px, 16px
- Medium: 24px, 32px
- Large: 48px, 64px
- XL: 96px, 128px for hero sections

### Component Styling
- **Cards**: 12px border-radius, subtle shadows
- **Buttons**: 8px border-radius, gradient backgrounds
- **Forms**: Floating labels with smooth transitions
- **Navigation**: Sticky header with backdrop blur

## Design Principles

1. **Mobile-First Design** - Perfect mobile experience is critical
2. **Accessibility First** - WCAG 2.1 AA compliance required
3. **Conversion Focused** - Every element serves business purpose
4. **Human-Centered Design** - Warm and approachable despite tech focus
5. **Progressive Enhancement** - Core functionality without JavaScript
6. **Unique Visual Language** - Neural network patterns, gradient meshes, floating animated elements

## Competitive Differentiation

- Emphasize human expertise, not just AI automation
- Use concrete examples with business metrics over abstract promises
- Provide educational content that delivers immediate value
- Maintain transparent process and realistic expectations
- Feature real faces and genuine client relationships

## Performance Requirements

- Core Web Vitals optimization mandatory
- SEO optimized with structured data and semantic HTML
- A/B testing setup for conversion optimization
- Comprehensive analytics and tracking implementation

## Success Metrics

- Lead Generation: 50+ qualified leads/month target
- Business Audit Form Conversion: 15-20% completion rate target
- Overall Conversion: 3-5% visitor to lead
- Brand Authority: 10,000+ monthly blog readers target
