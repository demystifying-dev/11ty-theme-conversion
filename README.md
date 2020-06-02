# 11ty Theme Conversion

- [11ty Theme Conversion](#11ty-theme-conversion)
  - [The plan](#the-plan)
    - [Original](#original)
    - [Revisited](#revisited)
  - [Configuration](#configuration)

A step-by-step, pedagogically documented journey building upon Bryan Robinson's excellent May, 2019 Video Tutorial [Create an Eleventy (11ty) theme based on a free HTML template](https://bryanlrobinson.com/blog/create-11ty-theme-from-static-html-template/) as a starting point.

However, we will be adding an essential missing ingredient to the mix, one that Bryan Robinson mentions himself in [Three JAMstack movements to watch in 2020](https://bryanlrobinson.com/blog/three-jamstack-concepts-to-watch-in-2020/):

> ### A DIY movement reinvigorated
> 
> The JAMstack is a great place to be a DIYer. Building things yourself is a path to great satisfaction. With little-to-no cost to build and host small applications, the JAMstack is really a no-brainer for a DIY or Indie movement.

## The plan

### Original

In the introductory [Eleventy (11ty) Static HTML Theme Conversion Introduction](https://youtu.be/z-o1W9ijUhI) video kicking off the series, four stages are planned for:

- Stage 1: Configuration
  - Set up and configure eleventy
  - Set up and configure the base templates for our site content
- Stage 2: Data conversion
  - From HTML to collections and global data objects
- Stage 3: Deployment
  - Netlify deployment
  - Use of Netlify forms for user interaction
- Stage 4: CMS
  - Hook into Netlify CMS (a GitHub based CMS)
  - Create editorial workflow for content managers

### Revisited

- Stage 1: Configuration
  - We'll add Git repositories
    - Local for development
    - Then, in later stages (see Deploy)
      - Staging repo
        For ease of use we always push to master
        Then, staging is updated via automation (automatic pull)
      - Production repo
        For ease of use we always push to master of this repo to publish
        Then, production is updated via automation (automatic pull)
- Stage 2: Data conversion
  - Initially no changes
  - Either immediately afterwards, or in a later iteration
    we use a backend to centralize and expose our structured content
    for this and multiple apps
- Stage 3: Deployment
  - Self-hosting, avoiding paywalls and owning our stuff
  - Single-click Node.js server on DigitalOcean
  - Use of bare repos for staging and production
    automated via git hooks
- Stage 4: CMS
  - Hook into an open source (not just free) markdown editor
  - Organize content source files
  - Set up editorial workflow for content managers
  - Editing comes with instant preview
    plus buttons for staging and for publishing

## Configuration

- The theme
  - [Flat Theme Lite - Free Responsive Multipurpose Site Template](https://themehunt.com/item/1524965-flat-theme-lite-free-responsive-multipurpose-site-template)
    - [Live preview](http://themehunt.com/item/1524965-flat-theme-lite-free-responsive-multipurpose-site-template/preview)
  - copy over `./assets`
    - TODO sass and a watcher to modify base theme assets
  - copy over additional files as per planned structure
    - homepage: `index2.html`
    - services section: `service.html`
    - about page: `about.html`
    - testimonials page: `testimonial.html`
    - contact page: `contact.html`

  